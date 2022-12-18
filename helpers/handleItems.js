/* 
    EXPLANATION OF THE items FIELD.

    Input Example.
    {
        items = [
            {
                _id: someItemId,
                quantity: 1
            },
            {
                _id: someItemId,
                quantity: 2
            }
        ]
    }

    After we extract the price and multiply it with quantity items look like this.
    
    items = [
        {
            name: Fries,
            quantity: 1,
            price: 3.5
        },
        {
            name: Country fries,
            quantity: 2,
            price: 10
        }
    ]

    In that way price is calculated in the backend to improve security
*/

const models = require('../models');

function handleItems(items){
    return new Promise(async(resolve, reject) => {

        var dbItem;
        var newItem;
        var newItems = [];
        var totalPrice = 0;

        for await (let item of items){

            dbItem = await models.Item.findOne({_id: item._id}).catch(err=>{
                console.log('err',err)
                resolve(false);
                return;
            });
            
            newItem = {
                name: dbItem.name,
                quantity: item.quantity,
                price: item.quantity * dbItem.price
            }
            
            newItems.push(newItem);
            totalPrice += item.quantity * dbItem.price;
        }

        
        resolve({newItems, totalPrice})

    })
}

module.exports = {handleItems}
