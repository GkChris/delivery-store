const vals = require('../config').validations;

function createOrder(items){

    if(!items || items?.length > vals.max_length) return false;

    return true;
}

module.exports = {createOrder}