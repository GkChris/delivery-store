const express = require('express');
var router = express.Router();

router.use('/database', require('./database'));
router.use('/orders', require('./orders'));
router.use('/items', require('./items'));


module.exports = router;