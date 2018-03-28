require('dotenv').config()

let baseConstants = require('./defaultConstants')

let distConstants = Object.assign({}, baseConstants, {
  appEnv: process.env.appEnv,
  aadInstance: process.env.aadInstance,
  aadTenant: process.env.aadTenant,
  clientId: process.env.clientId,
})

module.exports = distConstants