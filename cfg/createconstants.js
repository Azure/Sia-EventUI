require('dotenv').config()

let baseConstants = require('./defaultConstants')

let distConstants = Object.assign({}, baseConstants, {
  appEnv: 'dist',
  aadInstance: process.env.aadInstance,
  aadTenant: process.env.aadTenant,
  clientId: process.env.clientId,
  baseUrl: process.env.baseUrl,
  authRedirectUri: process.env.authRedirectUri,
  authVersion: process.env.authVersion
})

module.exports = distConstants