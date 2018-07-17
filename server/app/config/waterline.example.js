var mysqlAdapter = require('sails-mysql');

var wlconfig = {
    adapters: {
        'default':mysqlAdapter,
        mysql: mysqlAdapter,
    },

    datastores: {
        myLocalMysql: {
            adapter : 'mysql',
            host : 'localhost',
            port : 3306,
            user : '',
            password : '',
            database : ''
        }
    },
};

exports.config = wlconfig;