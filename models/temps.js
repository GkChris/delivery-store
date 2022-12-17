const Schema = require('mongoose').Schema;

const TempSchema = new Schema({
    temp: String,
    createdAt: Date,
    updatedAt: Date
}, { strict: false, timestamps: true });

module.exports = TempSchema;