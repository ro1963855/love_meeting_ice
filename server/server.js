// server.js

var express = require('express');
const wt = require('waterline-table');
var jwt = require('jwt-simple');
var app = express();
var bodyParser = require('body-parser');

var Waterline = require('waterline');

var User = require('./app/models/User');
var WConfig = require('./app/config/waterline');
var config = require('./app/config/config.json');

app.set('jwtTokenSecret', config.jwt.token);
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
    if (err) {
      return res.status(500).json({ err, err });
    }

    res.status(200).json(model);
  });
});

router.route('/account/login').post(function(req, res) {
  app.models.user
      .findOne({ 
        select: ['id'],
        where: req.body,
      })
      .exec(function(err, model) {
        if (err) {
          return res.status(500).json({ err, err });
        }

        if (model) {
          const access_token = jwt.encode({ iss: model.id }, app.get('jwtTokenSecret'));
          res.status(200).json({ token : access_token });
        } else {
          res.status(404).json({ result: 'account not exist' });
        }
      });
});

router.route('/account/isLogin').post(function(req, res) {
  let result = false;
  try {
    const token = req.headers['x-access-token'];
    const decoded = jwt.decode(token, app.get('jwtTokenSecret'));
    app.models.user
    .findOne({ 
      select: ['id'],
      where: {id: decoded.iss},
    })
    .exec(function(err, model) {
      if (err) {
        res.status(500).json({ err, err });
        return;
      }

      if (model) {
        res.status(200).json({ id: model.id });
      } else {
        res.status(404).json({ result: 'token error' });
      }
    });
  } catch (err) {
    res.status(404).json({ result: 'token error' });
  }

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
