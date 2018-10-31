const express = require('express');
const apiRouter = require('./api/router');

const port = process.env.PORT || 8080;
const app = express();
app.use(express.static('dist'));

app.get('*', (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect(`https://${req.hostname}${req.url}`);
  } else {
    next();
  }
});

app.use('/api', apiRouter);
app.listen(port, () => console.log(`access server on http://localhost:${port}`));
