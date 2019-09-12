const express = require('express');

const port = process.env.PORT || 3000;

const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');

const bodyParser = require('body-parser');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`
    Use Postman to send a JSON payload
  `);
});

app.post('/', (req, res) => {
  debug(`body: ${JSON.stringify(req.body)}`);
  res.json(req.body);
});

app.server = app.listen(port, () => {
  debug(`Listening on port ${chalk.yellow(port)}`);
});
