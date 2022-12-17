const express = require('express');
var router = express.Router();
const models = require('../models')
var validators = require('../validators');


// Module routes
const routes = {
    getTemp: '/getTemp$'
}

router.route(routes.getTemp)
.get(async(req, res) => {

    res.status(200).send();
});


module.exports = router;