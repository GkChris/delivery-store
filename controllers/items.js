const express = require('express');
var router = express.Router();
const models = require('../models')
var validator = require('../validators').items;
const c = require('chalk');

// Module routes
const routes = {
    getItem: '/getItem$',
    getCategory: '/getCategory$',
    createItem: '/createItem$',
    updateItem: '/updateItem$',
    deleteItem: '/deleteItem$',
}

router.route(routes.getItem)
.get(async(req, res) => {

    let id = req.query?.id ? req.query?.id : false;

    if (!id) {
        console.log(c.redBright(`[getItem] > FAILED | Missing item id`));
        res.status(400).send('Something went wrong');
        return;
    }


    let item = await models.Item.findOne({_id: id}).catch(err=>console.log('err',err));

    if (!item) {
        console.log(c.redBright(`[getItem] > FAILED | Failed to fetch item ${id}`));
        res.status(400).send('Something went wrong');
        return;
    }


    console.log(c.greenBright(`[getItem] > SUCCESS | Fetched item with ${id} successfully`));
    res.status(200).send(item);
});


router.route(routes.getCategory)
.get(async(req, res) => {

    let category = req.query?.category ? req.query?.category : false;

    if (!category) {
        console.log(c.redBright(`[getCategory] > FAILED | Missing category parameter`));
        res.status(400).send('Something went wrong');
        return;
    }


    let items = await models.Item.find({category: category}).catch(err=>console.log('err',err));

    if (!items?.length) {
        console.log(c.redBright(`[getCategory] > FAILED | Failed to fetch items for category ${category}`));
        res.status(400).send('Something went wrong');
        return;
    }


    console.log(c.greenBright(`[getCategory] > SUCCESS | Fetched items for category ${category} successfully`));
    res.status(200).send(items);
});


router.route(routes.createItem)
.post(async(req, res) => {

    let name = req.body?.name ? req.body.name : false;
    let category = req.body?.category ? req.body.category : false;
    let price = req.body?.price ? req.body.price : false;

    if (!validator.createItem(name, category, price)) {
        console.log(c.redBright('[createItem] > FAILED | Validation failure'));
        res.status(400).send('Something went wrong');
        return;
    }

    
    let item = await models.Item.create({
        name: name,
        category: category,
        price: price
    }).catch(err=>console.log('err',err));

    if (!item) {
        console.log(c.redBright('[createItem] > FAILED | Failed to create item'));
        res.status(400).send('Something went wrong');
        return;
    }
    

    console.log(c.greenBright(`[createItem] > SUCCESS | Successfully created item ${item._id}`));
    res.status(200).send();
});


router.route(routes.updateItem)
.post(async(req, res) => {

    let id = req.body?._id ? req.body?._id : false;
    let name = req.body?.name ? req.body.name : false;
    let category = req.body?.category ? req.body.category : false;
    let price = req.body?.price ? req.body.price : false;

    if (!validator.updateItem(id, name, category, price)) {
        console.log(c.redBright('[updateItem] > FAILED | Validation failure'));
        res.status(400).send('Something went wrong');
        return;
    }

    
    let item = await models.Item.findOneAndUpdate({_id: id}, {
        name: name,
        category: category,
        price: price
    }, {returnOriginal: false}).catch(err=>console.log('err',err));

    if (!item) {
        console.log(c.redBright('[updateItem] > FAILED | Failed to create item'));
        res.status(400).send('Something went wrong');
        return;
    }
    

    console.log(c.greenBright(`[updateItem] > SUCCESS | Successfully updated item ${item._id}`));
    res.status(200).send(item);
});


router.route(routes.deleteItem)
.post(async(req, res) => {


    let id = req.body?._id ? req.body._id : false;

    if (!id) {
        console.log(c.redBright(`[deleteItem] > FAILED | Missing id parameter`));
        res.status(400).send('Something went wrong');
        return;
    }


    let item = await models.Item.findOneAndDelete({_id: id}).catch(err=>console.log('err',err));

    if (!item) {
        console.log(c.redBright(`[deleteItem] > FAILED | Failed to delete item ${id}`));
        res.status(400).send('Something went wrong');
        return;
    }

    console.log(c.greenBright(`[deleteItem] > SUCCESS | Item ${id} was successfully deleted`));
    res.status(200).send();
});

module.exports = router;