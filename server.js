const express = require('express');
const apiRouter = require('./api/router');

const port = process.env.PORT || 8080;
const app = express();
app.use(express.static('dist'));

app.use('/api', apiRouter);
app.listen(port, () => console.log(`access server on http://localhost:${port}`));
