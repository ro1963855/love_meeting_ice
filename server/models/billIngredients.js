module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    'bill_ingredients',
    {
      code: {
        type: Sequelize.STRING(191),
        primaryKey: true,
        allowNull: false,
      },
      billMealCode: {
        type: Sequelize.STRING(191),
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      productPrice: {
        type: Sequelize.MEDIUMINT,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    },
    {
      engine: 'InnoDB',
      charset: 'utf8mb4',
    },
  );
