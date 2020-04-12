/* eslint-disable linebreak-style */
const express = require('express');
const bodyParser = require('body-parser');
const estimator = require('./src/estimator');

const app = express();
app.use(bodyParser.json());

app.post('/api/v1/on-covid-19', (req, res) => {
  estimator.default(req);
  // useless Stuff
  res.json(['sssss']);
});

app.listen(process.env.PORT, () => {
});
