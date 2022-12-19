const orders = require('./orders');
const items = require('./items');

module.exports = {
    orders: {
        createOrder: orders.createOrder
    },
    items: {
        createItem: items.createItem,
        updateItem: items.updateItem
    }
}