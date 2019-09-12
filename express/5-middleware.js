const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

app.use('/', (req, res, next) => {
  req.today = new Date();
  next();
});

app.get('/', (req, res) => {
  res.send(`
    Hello World! ${req.today}
  `);
});

app.server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
