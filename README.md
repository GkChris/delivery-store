# Delivery Store | Backend

A demo backend server that handles orders for an online delivery store.

# Backend structure

An explaiantion of the key elements for the backend structure

### Config 
``config/index.js`` file exports key values to be used globaly within the server. 

### Controllers
Controllers contains the logic for the backend's endpoints. ``controllers/index.js`` contains the routes for the REST API.

### Helpers
Helpers contains one file, the ``helpers/index.js``. The file export the ``handleItems`` function that is responsible both for converting the item's data for creating a order (``orders/createOrder`` endpoint) to the actual form that is set on the model's mongoose schema as well as handling the price convertion based on the input's currency (if given) 

### Models
Models contains all the collection schemas that are used in the mongo database

### Services
Service contains the ``convertCurrency`` function. The function is called when a currency different to the one that is set as default is given on the ``orders/createOrder`` endpoint and is responsible for retreiving a valid price for the given currency. Uses the fixer api for currency convertion.

### Validators
Validatiors are responsible for securing that the body data during a POST request are valid. Validators includes checks for the required parameters as well as securing that the parameter's length is withing a legitimate limit. 

# API Endpoints
The server contains two endpoints, ``/database``, ``/items`` and ``orders``

## ``/database``

### ``/database/buildDatabase`` (POST)
Used to drop and re-create the items and orders collections in the mongo database. What it does is it takes into account the content from the json files, located in the ``content`` folder and turn them into a collection.

## ``/items``

### ``/items/getItem`` (GET)
Used to fetch a record from the item collection in the mongo database. It matches the record by the given id query parameter

### Parameters
**id**: ``String``

### ``/items/getCategory`` (GET)
Used to fetch all records of a specific category from the item collection in the mongo database. It matches the records by the given category query parameter

### Parameters
**category**: ``String``

### ``/items/createItem`` (POST)
Used to create an item record to the item collection in the mongo database. 

### Parameters
**name**: ``String``

**category**: ``String``

**price**: ``String``

### ``/items/updateItem`` (POST)
Used to update an item record from the item collection in the mongo database. 

### Parameters
**_id**: ``String``

**name**: ``String`` (Optional)

**category**: ``String`` (Optional)

**price**: ``String`` (Optional)

### ``/items/deleteItem`` (POST)
Used to delete an item record from the item collection in the mongo database. 

### Parameters
**_id**: ``String``

## ``/orders``

### ``/orders/getActiveOrders`` (GET)
Used to fetch all order records from the order collection in the mongo database. It matches all records that has the isActive field set to true 

### ``/orders/createOrder`` (POST)
Used to create an order record to the order collection in the mongo database. 

### Parameters
**items**: ``String``
>An array of objects. ``handleItems`` function located in ``helpers/handleItems.js`` file will handle the convertion of the items objects from the given form to the form required for storing them in the order collection in the mongo database.

**currency**: ``String`` (Optional)
>If **currency** is not given, the default currency will be retreived from the ``default_currency`` in the ``config/index.js`` file. Otherwise the ``handleItems`` function located in the ``helpers/handleItems.js`` file will handle the price convertion for the given currency.

***Body Data Example***

```JSON
{
    "currency": "GBP",
    "items": [
        {
            "_id": "639fdd658708888745745b48",
            "quantity": 1
        },
                {
            "_id": "639fdd658708888745745b49",
            "quantity": 2
        },
    ]
}
```

### ``/orders/updateOrderStatus`` (POST)
Used to update the isActive field of a record in the order collection in the mongo database. 

### Parameters
**id**: ``String``

**status**: ``String`` (Optional)
>If **status** is not given, the default status will be set to false.

# Installation & Executing

### Backend

Install the required dependencies:
```
npm i
```

Run it:
```
npm run dev
```

Build database:
```
GET request on 'http://localhost:9000/database/buildDatabase'
```

### Frontend
Install the required dependencies:
```
npm i
```

Run it:
```
npm start
```