const vals = require('../config').validations;

function createItem(name, category, price){

  
    if (
        !name || name?.length > vals.max_length || 
        !category || category?.length > vals.max_length || 
        !price || price.toString().length > vals.max_length
    ) {
        return false;
    }

    return true;
}


function updateItem(id, name, category, price){

    if (
        !id || id?.length > vals.max_length ||
        (name && name?.length > vals.max_length) || 
        (category && category?.length > vals.max_length) || 
        (price && price.toString().length > vals.max_length)
    ) {
        return false;
    }


    return true;
}


module.exports = {createItem, updateItem}