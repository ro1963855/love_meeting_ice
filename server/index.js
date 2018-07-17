const accountApi = require('./api/accountApi');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// api router
app.use('/api/account', accountApi);

// listen
app.listen(3000);
console.log('success listen at port:3000......');
