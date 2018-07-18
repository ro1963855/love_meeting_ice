var mysqlAdapter = require('sails-mysql');
var config = require('./config.json');

var wlconfig = {
    adapters: {
        'default':mysqlAdapter,
        mysql: mysqlAdapter,
    },

    datastores: {
        myLocalMysql: {
            adapter : 'mysql',
            host : config.mysql.host,
            port : config.mysql.port,
            user : config.mysql.user,
            password : config.mysql.password,
            database : config.mysql.database
        }
    },
};

exports.config = wlconfig;