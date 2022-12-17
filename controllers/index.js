const express = require('express');
var router = express.Router();

router.use('/resource/temps', require('./resource/temps'));
router.use('/api/temps', require('./api/temps'));


module.exports = router;