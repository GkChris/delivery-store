const Schema = require('mongoose').Schema;

const ItemSchema = new Schema({
    name: String, 
    category: String,
    price: Number,
    createdAt: Date,
    updatedAt: Date
}, { strict: false, timestamps: true });

module.exports = ItemSchema;