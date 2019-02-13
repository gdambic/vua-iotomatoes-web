var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"https://localhost:5001/api/"',
  PROD_URL: '"http://193.198.208.164:13080/api/"'
})
