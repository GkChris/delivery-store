const express = require('express');
var router = express.Router();
const models = require('../models')
const content = require('../content');

// Module routes
const routes = {
    buildDatabase: '/buildDatabase$'
}


router.route(routes.buildDatabase)
.post(async(req, res) => {

    await models.Order.deleteMany({}).catch(err=>console.log('err',err));

    await models.Order.insertMany(content.orders).catch(err=>console.log('err'));

    res.status(200).send();
});

module.exports = router;