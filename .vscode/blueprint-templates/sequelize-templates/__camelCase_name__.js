module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    '{{snakeCase name}}',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // account: {
      //   type: Sequelize.STRING,
      //   allowNull: false,
      // },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    },
    {
      engine: 'InnoDB',
      charset: 'utf8mb4',
    },
  );

