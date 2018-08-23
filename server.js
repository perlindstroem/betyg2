const express = require('express');
const apiRouter = require('./api/router');

const port = process.env.PORT || 8080;
const app = express();
app.use(express.static('dist'));
/*
app.use('*', (req, res, next) => {
  if (req.secure) {
      console.log('secure')
    // request was via https, so do no special handling
    next();
  } else {
      console.log('not secure', `https://${req.headers.host}${req.url}`)
    // request was via http, so redirect to https
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});
*/
app.use('/api', apiRouter);
app.listen(port, () => console.log(`access server on http://localhost:${port}`));
