const express = require('express');
const jwt = require('jwt-simple');
const bodyParser = require('body-parser');
const { Users, Categorys, Products, States } = require('./sequelize');
const config = require('./config.json');

const router = express.Router();
const app = express();
app.use(bodyParser.json());
app.set('jwtTokenSecret', config.jwt.token);

// account
router.route('/account/login').post((req, res) => {
  Users
    .findOne({ where: req.body, attributes: ['id'] })
    .then((user) => {
      if (user) {
        const accessToken = jwt.encode({ iss: user.id }, app.get('jwtTokenSecret'));
        res.status(200).json({ token: accessToken });
      } else {
        res.status(404).json({ result: 'account not exist' });
      }
    });
});

router.route('/account/isLogin').post((req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = jwt.decode(token, app.get('jwtTokenSecret'));
    Users
      .findOne({ where: { id: decoded.iss }, attributes: ['id'] })
      .then((user) => {
        if (user) {
          res.status(200).json({ id: user.id });
        } else {
          res.status(404).json({ result: 'token error' });
        }
      });
  } catch (err) {
    res.status(404).json({ result: 'token error' });
  }
});

// menu
router.route('/menu').get((req, res) => {
  Products
    .findAll({ include: [Categorys, States] })
    .then(menus => res.json(menus));
});

app.use('/api', router);

// API ENDPOINTS

const port = 3000;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
