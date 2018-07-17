// server.js

var express = require('express');
const wt = require('waterline-table');
var app = express();
var bodyParser = require('body-parser');

var Waterline = require('waterline');

var User = require('./app/models/User');
var WConfig = require('./app/config/waterline');

var orm = new Waterline();
orm.registerModel(User);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'hello! welcome to our api!' });
});

// user route
router.route('/user').post(function(req, res) {
  app.models.user.create(req.body, function(err, model) {
    if (err) return res.json({ err, err }, 500);
    res.json(model);
  });
});

router.route('/account/login').post(function(req, res) {
  app.models.user
      .findOne({ 
        select: ['id'],
        where: req.body,
      })
      .exec(function(err, model) {
    if (err) return res.json({ err, err }, 500);
    res.json(model);
  });
});

app.use('/api', router);

orm.initialize(WConfig.config, function(err, models) {
  if (err) throw err;
  app.models = models.collections;
  //app.set('models',models.collections);
  app.datastores = models.datastores;

  let options = models;
  options.table = 'user';
  wt.create(options);

  app.listen(port);

  console.log('Magic happens on port ' + port);
});
