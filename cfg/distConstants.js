let baseConstants = require('./defaultConstants')
const argv = require('minimist')(process.argv.slice(2))

let distConstants = Object.assign({}, baseConstants, {
  appEnv: 'dist',
  aadInstance: argv.aadInstance,
  aadTenant: argv.aadTenant,
  clientId: argv.clientId,
  baseUrl: argv.baseUrl,
  authRedirectUri: argv.authRedirectUri,
  authVersion: argv.authVersion
})

module.exports = distConstants