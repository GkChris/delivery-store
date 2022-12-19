const express = require('express');
var router = express.Router();
const models = require('../models')
var validator = require('../validators').orders;
const c = require('chalk');
const app_vars = require('../config').app_variables;
const {handleItems} = require('../helpers/handleItems');

// Module routes
const routes = {
    getActiveOrders: '/getActiveOrders$',
    createOrder: '/createOrder$',
    updateOrderStatus: '/updateOrderStatus$'
}

router.route(routes.getActiveOrders)
.get(async(req, res) => {

    let orders = await models.Order.find({isActive: true}).sort({"createdAt": 1}).catch(err=>console.log('err',err));
    
    if (!orders?.length) {
        console.log(c.yellowBright('[getActiveOrders] > WARNING | No active orders were found'));
        res.status(200).send();
        return;
    }

    console.log(c.greenBright(`[getActiveOrders] > SUCCESS | Active orders were fetched successfully`));
    res.status(200).send(orders);
});


router.route(routes.createOrder)
.post(async(req, res) => {


    let currecny = req.body?.currecny ? req.body?.currecny : app_vars.default_currency;
    let items = req.body?.items ? req.body?.items : false;      


    if (!validator.createOrder(items)) {
        console.log(c.redBright('[createOrder] > FAILED | Validation failure'));
        res.status(400).send('Something went wrong');
        return;
    }

 
    handler = await handleItems(items, currecny);
    if (currecny != app_vars.default_currency) 
    
    items = handler.newItems;
    let totalPrice = handler.totalPrice;

    if (!items) {
        console.log(c.redBright('[createOrder] > FAILED | Error on items handler'));
        res.status(400).send('Something went wrong');
        return;
    }

    
    let order = await models.Order.create({
        items: items,
        totalPrice: totalPrice,
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

    let id = req.body?._id ? req.body._id : false;
    let status = req.body?.status ? req.body.status : false;


    if (!id) {
        console.log(c.redBright('[updateOrderStatus] > FAILED |  Missing order id'));
        res.status(400).send('Something went wrong');
        return;
    }


    let order = await models.Order.findOneAndUpdate({_id: id}, {isActive: status}, {returnOriginal: false}).catch(err=>console.log('err',err));
    
    if (!order) {
        console.log(c.redBright('[updateOrderStatus] > FAILED | Failed to update the order'));
        res.status(400).send('Something went wrong');
        return;
    }


    console.log(c.greenBright(`[updateOrderStatus] > SUCCESS | Status for order ${order._id} was successfully updated`));
    res.status(200).send();
});

module.exports = router;