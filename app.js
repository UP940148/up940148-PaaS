const express = require('express');

const app = express();

app.use('/api', require('./api'));

const port = 80;

app.listen(port, (err) => {
  if (err) console.log('error', err);
  else console.log(`app listening on port ${port}`);
});
