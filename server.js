/* eslint-disable linebreak-style */
const express = require('express');
// const bodyParser = require('body-parser');
const estimator = require('./src/estimator');

const app = express();
// app.use(bodyParser.json());

app.post('/api/v1/on-covid-19/', (req, res) => {
  const estimates = estimator(req);
  res.json(estimates);
});

let port = process.env.PORT;
if (port == null || port === '') {
  port = 8000;
}

app.listen(port);
