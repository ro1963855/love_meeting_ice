const Sequelize = require('sequelize');
const UsersModel = require('./models/users');
const StatesModel = require('./models/states');
const ProductsModel = require('./models/products');
const CategorysModel = require('./models/categorys');
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
});

const Users = UsersModel(sequelize, Sequelize);
const States = StatesModel(sequelize, Sequelize);
const Products = ProductsModel(sequelize, Sequelize);
const Categorys = CategorysModel(sequelize, Sequelize);

Products.belongsTo(Categorys);
Products.belongsTo(States);

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

module.exports = {
  Users,
  States,
  Products,
  Categorys,
};
