module.exports = (sequelize, Sequelize) =>
  sequelize.define(
    'bills',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      billStateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      diningPositionId: {
        type: Sequelize.INTEGER,
      },
      payMoney: {
        type: Sequelize.SMALLINT,
      },
      totalPrice: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      orderTime: {
        type: 'TIMESTAMP',
        defaultValue: '0000-00-00 00:00:00',
      },
      payTime: {
        type: 'TIMESTAMP',
        defaultValue: '0000-00-00 00:00:00',
      },
      deleteTime: {
        type: 'TIMESTAMP',
        defaultValue: '0000-00-00 00:00:00',
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

