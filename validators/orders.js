const vals = require('../config').validations;

function createOrder(items){

    if (!items?.length) return false;

    items.map((item) => {

        if (
            !item.id || item.id?.length > vals.max_length ||
            !item.quantity || item.quantity.toString().length > vals.max_length
        ) {
            return false;
        }

    })

    return true;
}



module.exports = {createOrder}