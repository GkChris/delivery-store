const express = require('express');
var router = express.Router();
const models = require('../models')
var validator = require('../validators').orders;
const c = require('chalk');


// Module routes
const routes = {
    getOrder: '/getOrder$',
    createOrder: '/createOrder$',
    updateOrderStatus: '/updateOrderStatus$'
}

router.route(routes.getOrder)
.get(async(req, res) => {

    res.status(200).send();
});

router.route(routes.createOrder)
.post(async(req, res) => {

    let currecny = req.body?.currecny ? req.body?.currecny : 'Euro';
    let items = req.body?.items ? req.body?.items : false;


    if (!validator.createOrder(items)) {
        console.log(c.redBright('[createOrder] > FAILED | Missing required parameters'));
        res.status(400).send('Something went wrong');
        return;
    }

    
    let order = await models.Order.create({
        items: items,
        currecny: currecny,
        isActive: true
    }).catch(err=>console.log('err',err))
    
    if (!order) {
        console.log(c.redBright('[createOrder] > FAILED | Failed to create an order'));
        res.status(400).send('Something went wrong');
        return;
    }

    
    console.log(c.greenBright(`[createOrder] > SUCCESS | Order ${order._id} was successfully stored to database`));
    res.status(200).send();
});

router.route(routes.updateOrderStatus)
.post(async(req, res) => {

    res.status(200).send();
});

module.exports = router;