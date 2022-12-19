require('dotenv').config()

module.exports = {

  app_configurations: {

    ip: process.env.BACKEND_HOST || '127.0.0.1',
    port: parseInt(process.env.BACKEND_PORT.substring(1) || '9000'),
    db: process.env.DB || 'mongodb://localhost:27017/delivery_store'

  },

  validations: {

    max_length: process.env.MAX_LENGTH || 100     

  },

  app_variables: {

    default_currency: process.env.DEFAULT_CURRENCY || 'EUR'

  }

};


