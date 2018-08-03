const Sequelize = require('sequelize');
const UsersModel = require('./models/users');
const StatesModel = require('./models/states');
const ProductsModel = require('./models/products');
const CategorysModel = require('./models/categorys');
const BillsModel = require('./models/bills');
const BillStatesModel = require('./models/billStates');
const BillMealsModel = require('./models/billMeals');
const BillIngredientsModel = require('./models/billIngredients');
const config = require('./config.json');

const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
  host: config.mysql.host,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  timezone: 'Asia/Taipei',
});

const Users = UsersModel(sequelize, Sequelize);
const States = StatesModel(sequelize, Sequelize);
const Products = ProductsModel(sequelize, Sequelize);
const Categorys = CategorysModel(sequelize, Sequelize);
const Bills = BillsModel(sequelize, Sequelize);
const BillStates = BillStatesModel(sequelize, Sequelize);
const BillMeals = BillMealsModel(sequelize, Sequelize);
const BillIngredients = BillIngredientsModel(sequelize, Sequelize);

Products.belongsTo(Categorys);
Products.belongsTo(States);
Categorys.hasMany(Products);
Bills.belongsTo(Users);
Bills.belongsTo(BillStates);
Bills.hasMany(BillMeals, { as: 'order' });
BillMeals.belongsTo(Bills);
BillMeals.belongsTo(Products);
BillMeals.hasMany(BillIngredients, { as: 'ingredients' });
BillIngredients.belongsTo(BillMeals);
BillIngredients.belongsTo(Products);

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  Users,
  States,
  Products,
  Categorys,
  Bills,
  BillStates,
  BillMeals,
  BillIngredients,
  sequelize,
};
