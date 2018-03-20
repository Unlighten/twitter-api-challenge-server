require('dotenv').config();

const port = process.env.PORT || 8080
const express = require('express');
const app = express();

var http = require('http').Server(app);
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use('/', require('./routes/tweets'));


http.listen(port, () => {
  console.log('server is up:', port);
});