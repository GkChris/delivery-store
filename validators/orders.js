const vals = require('../config').validations;

function createOrder(items){

    if (!items?.length) return false;

    items.map((item) => {

        if (
            !item.id || 
            !item.hasOwnProperty('id') || item.id?.length > vals.max_length ||
            !item.hasOwnProperty('quantity') || !item.quantity || item.quantity.toString().length > vals.max_length
        ) {
            return false;
        }

    })

    return true;
}



module.exports = {createOrder}