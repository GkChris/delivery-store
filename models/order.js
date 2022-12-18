const Schema = require('mongoose').Schema;

const OrderItemSchema = new Schema({
    _id: false,
    name: String,
    quantity: Number,
    price: Number
})

const OrderSchema = new Schema({
    items: [OrderItemSchema],
    totalPrice: Number,
    currency: String,
    isActive: Boolean,
    createdAt: Date,
    updatedAt: Date
}, { strict: false, timestamps: true });

module.exports = OrderSchema;