const Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
  identity: 'user',
  tableName: 'user',
  datastore: 'myLocalMysql',
  primaryKey: 'id',
  attributes: {
    id: {
      type: 'number',
      autoMigrations: {
        autoIncrement: true,
        unique: true,
      },
    },
    account: {
      type: 'string',
      required: true,
      autoMigrations: {
        unique: true,
        columnType: 'VARCHAR(50)',
      },
    },
    password: {
      type: 'string',
      required: true,
      autoMigrations: {
        columnType: 'VARCHAR(50)',
      },
    },
    created_at: {
      type: 'string',
      autoCreatedAt: true,
      autoMigrations: { columnType: 'TIMESTAMP' },
    },
    updated_at: {
      type: 'string',
      autoUpdatedAt: true,
      autoMigrations: { columnType: 'TIMESTAMP' },
    },
  },
});
