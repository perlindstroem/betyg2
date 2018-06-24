const express = require('express');
const { getCourse } = require('./getCourse');

const router = express.Router();

router.get('/course/:courseCode', getCourse);

module.exports = router;
