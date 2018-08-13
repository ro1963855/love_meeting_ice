const express = require('express');
const jwt = require('jwt-simple');
const bodyParser = require('body-parser');
const _ = require('lodash');
const config = require('./config.json');
const {
  Users,
  States,
  Products,
  Categorys,
  Bills,
  BillMeals,
  BillIngredients,
  sequelize,
} = require('./sequelize');

const router = express.Router();
const app = express();
app.use(bodyParser.json());
app.set('jwtTokenSecret', config.jwt.token);

// account
router.route('/account/login').post((req, res) => {
  Users.findOne(
    { where: req.body, attributes: ['id'] },
  ).then((user) => {
    if (user) {
      const accessToken = jwt.encode(
        { iss: user.id },
        app.get('jwtTokenSecret'),
      );
      res.status(200).json({ token: accessToken });
    } else {
      res.status(404).json({ result: 'account not exist' });
    }
  }).catch((err) => {
    res.status(500).json(err);
  });
});

router.route('/account/isLogin').post((req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = jwt.decode(token, app.get('jwtTokenSecret'));
    Users.findOne(
      { where: { id: decoded.iss }, attributes: ['id'] },
    ).then((user) => {
      if (user) {
        res.status(200).json({ id: user.id });
      } else {
        res.status(404).json({ result: 'token error' });
      }
    }).catch((err) => {
      res.status(500).json(err);
    });
  } catch (err) {
    res.status(404).json({ result: 'token error' });
  }
});

// menu
router.route('/menu').get((req, res) => {
  Categorys.findAll(
    {
      include: {
        model: Products,
        attributes: ['id', 'productName', 'price'],
        include: {
          model: States,
          attributes: ['id', 'stateName'],
        },
      },
      attributes: ['id', 'categoryName'],
    },
  ).then(menus =>
    res.status(200).json(menus),
  ).catch((err) => {
    res.status(500).json(err);
  });
});

// bill
router.route('/bill').get((req, res) => {
  Bills.findAll(
    {
      include: [{
        model: BillMeals,
        as: 'order',
        attributes: [['productId', 'id'], 'productName', ['productPrice', 'price'], 'quantity'],
        include: [{
          model: BillIngredients,
          as: 'ingredients',
          attributes: [['productId', 'id'], 'productName', ['productPrice', 'price'], 'quantity'],
        }],
      }],
      attributes: ['id', 'userId', 'billStateId', 'diningPositionId', 'payMoney', 'totalPrice', 'orderTime'],
      order: [
        ['orderTime', 'ASC'],
      ],
    },
  ).then((bills) => {
    res.status(200).json(bills);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

router.route('/bill').post((req, res) =>
  sequelize.transaction((t) => {
    const data = req.body;
    let billId = null;
    return Bills.create(
      {
        userId: data.userId,
        billStateId: data.billStatesId,
        totalPrice: data.totalPrice,
        orderTime: data.orderTime,
      },
      { transaction: t },
    ).then((bill) => {
      billId = bill.id;
      const meals = [];
      _.forEach(data.order, (product, index) => {
        meals.push({
          code: `${billId}_${index + 1}`,
          billId,
          productId: product.id,
          productName: product.productName,
          productPrice: product.price,
          quantity: product.quantity,
        });
      });

      return BillMeals.bulkCreate(meals, { transaction: t });
    }).then(() => {
      const ingredients = [];
      _.forEach(data.order, (product, productIndex) => {
        _.forEach(product.ingredients, (ingredient, ingredientsIndex) => {
          ingredients.push({
            code: `${billId}_${productIndex + 1}_${ingredientsIndex + 1}`,
            billMealCode: `${billId}_${productIndex + 1}`,
            productId: ingredient.id,
            productName: ingredient.productName,
            productPrice: ingredient.price,
            quantity: ingredient.quantity,
          });
        });
      });

      return BillIngredients.bulkCreate(ingredients, { transaction: t });
    }).then(() => {
      res.status(200).json({ id: billId });
    }).catch((err) => {
      t.rollback();
      res.status(500).json(err);
    });
  }),
);

router.route('/bill').patch((req, res) =>
  sequelize.transaction((t) => {
    const data = req.body;
    return Bills.update(
      {
        payTime: data.payTime,
        billStateId: data.billStateId,
        diningPositionId: data.diningPositionId,
        payMoney: data.payMoney,
      },
      {
        where: { id: data.id },
        transaction: t,
      },
    ).then((updateResult) => {
      const affectCount = updateResult[0];
      if (affectCount > 0) {
        res.status(204).json();
      } else {
        res.status(404).json();
      }
    }).catch((err) => {
      t.rollback();
      res.status(500).json(err);
    });
  }),
);

router.route('/bill').put((req, res) =>
  sequelize.transaction((t) => {
    const data = req.body;
    const billId = data.id;
    return BillMeals.destroy(
      {
        where: { billId },
        include: [{
          model: BillIngredients,
        }],
        transaction: t,
      },
    ).then(() => {
      return Bills.update(
        {
          userId: data.userId,
          billStateId: data.billStatesId,
          totalPrice: data.totalPrice,
          orderTime: data.orderTime,
        },
        {
          where: { id: billId },
          transaction: t,
        },
      );
    }).then(() => {
      const meals = [];
      _.forEach(data.order, (product, index) => {
        meals.push({
          code: `${billId}_${index + 1}`,
          billId,
          productId: product.id,
          productName: product.productName,
          productPrice: product.price,
          quantity: product.quantity,
        });
      });

      return BillMeals.bulkCreate(meals, { transaction: t });
    }).then(() => {
      const ingredients = [];
      _.forEach(data.order, (product, productIndex) => {
        _.forEach(product.ingredients, (ingredient, ingredientsIndex) => {
          ingredients.push({
            code: `${billId}_${productIndex + 1}_${ingredientsIndex + 1}`,
            billMealCode: `${billId}_${productIndex + 1}`,
            productId: ingredient.id,
            productName: ingredient.productName,
            productPrice: ingredient.price,
            quantity: ingredient.quantity,
          });
        });
      });

      return BillIngredients.bulkCreate(ingredients, { transaction: t });
    }).then(() => {
      res.status(204).json();
    }).catch((err) => {
      t.rollback();
      res.status(500).json(err);
    });
  }),
);

router.route('/bill').delete((req, res) =>
  sequelize.transaction((t) => {
    const data = req.body;
    return Bills.update(
      {
        deleteTime: data.deleteTime,
        billStateId: data.billStateId,
      },
      {
        where: { id: data.id },
        transaction: t,
      },
    ).then((updateResult) => {
      const affectCount = updateResult[0];
      if (affectCount > 0) {
        res.status(204).json();
      } else {
        res.status(404).json();
      }
    }).catch((err) => {
      t.rollback();
      res.status(500).json(err);
    });
  }),
);

// chart
router.route('/chart/day').get((req, res) => {
  let whereCondition = {};
  if (!_.isEmpty(req.query.startDate) && !_.isEmpty(req.query.endDate)) {
    const startDate = new Date(`${req.query.startDate} 00:00:00`);
    const endDate = new Date(`${req.query.endDate} 23:59:59`);
    whereCondition = {
      payTime: {
        $between: [startDate, endDate],
      },
    };
  }

  Bills.findAll(
    {
      include: [{
        model: BillMeals,
        as: 'order',
        attributes: ['productName', 'quantity'],
        include: [{
          model: BillIngredients,
          as: 'ingredients',
          attributes: ['productName', 'quantity'],
        }],
      }],
      where: whereCondition,
      attributes: ['id', 'totalPrice', 'orderTime'],
      order: [
        ['orderTime', 'ASC'],
      ],
    },
  ).then((bills) => {
    res.status(200).json(bills);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

app.use('/api', router);

// API ENDPOINTS

const port = 3000;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
