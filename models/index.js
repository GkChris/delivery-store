const mongoose = require('mongoose');

const app_config = require('../config').app_configurations;
const OrderSchema = require('./order');


// Db connection and setup
mongoose.connect(app_config.db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

module.exports.Order = mongoose.model('Order', OrderSchema);
