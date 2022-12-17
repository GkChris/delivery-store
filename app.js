const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app_config = require('./config').app_configurations;
const models = require('./models');
var app = express();


app.use(cors())
app.use(bodyParser.json())
app.use(require('./controllers'));

app.listen(app_config.port, app_config.ip, () => {
  console.log(`Server is running on port ${app_config.port}..`);
});



