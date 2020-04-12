/* eslint-disable linebreak-style */
const express = require('express');
const bodyParser = require('body-parser');
const estimator = require('./src/estimator');

const PORT = process.env.PORT || 5000;


const app = express();
app.use(bodyParser.json());

app.post('/api/v1/on-covid-19/', (req, res) => {
  const estimates = estimator(req);
  res.json(estimates);
});

app.listen(PORT, () => {
});
