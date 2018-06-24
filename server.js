const express = require('express');

const port = process.env.port || 8080;
const app = express();
app.use(express.static('dist'));
app.listen(port, () => console.log(`access server on http://localhost:${port}`));
