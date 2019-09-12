const express = require('express');

const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`
    Use Postman to send a JSON payload
  `);
});

app.post('/', (req, res) => {
  console.log(`body: ${JSON.stringify(req.body)}`);
  res.json(req.body);
});

app.server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
