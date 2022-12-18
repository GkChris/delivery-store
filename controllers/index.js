const express = require('express');
var router = express.Router();

router.use('/orders', require('./orders'));
router.use('/database', require('./database'));

module.exports = router;