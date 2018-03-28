require('dotenv').config()

let baseConstants = require('./defaultConstants')

let distConstants = Object.assign({}, baseConstants, {
  appEnv: process.env.appEnv,
  aadInstance: process.env.aadInstance,
  aadTenant: process.env.aadTenant,
  clientId: process.env.clientId,
  baseUrl: process.env.baseUrl,
  authRedirectUri: process.env.authRedirectUri,
  authVersion: process.env.authVersion, // TODO: Add env var
  ticketSystems: {
    1: {
      id: 1,
      name: 'Default Ticket System',
      ticketUriPrefix: process.env.ticketUriPrefix,
      ticketUriSuffix: process.env.ticketUriSuffix,
    }
  }
})

module.exports = distConstants