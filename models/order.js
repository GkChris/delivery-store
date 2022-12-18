const Schema = require('mongoose').Schema;

const OrderSchema = new Schema({
    items: [String],
    currency: String,
    isActive: Boolean,
    createdAt: Date,
    updatedAt: Date
}, { strict: false, timestamps: true });

module.exports = OrderSchema;