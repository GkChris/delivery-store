const mongoose = require('mongoose');

const app_config = require('../config').app_configurations;
const TempSchema = require('./temp');


// Db connection and setup
mongoose.connect(app_config.db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

module.exports.Temp = mongoose.model('Temp', TempSchema);
