const fetch = require('node-fetch');
const default_currency = require('../../config').app_variables.default_currency

function convertCurrency(currecny, amount){

    return new Promise((resolve, reject) => {

        fetch(`https://api.apilayer.com/fixer/convert?to=${currecny}&from=${default_currency}&amount=${amount}`, {
            method: 'get',
            headers: {
                "apikey": "mpyymkyL4dMK6wZp1GnJOuWj5m30Zn31"
            }
        })
        .then(response => response.text())
        .then(result => {
            console.log(result)
            resolve(JSON.parse(result).result.toFixed(2))
        })
        .catch(err => {
            console.log('err',err);
            resolve(false)
        })

    })

}

module.exports = {convertCurrency}