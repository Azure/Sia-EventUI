# Powershell script for VSTS build that accesses build environment variables to create config file.

$s = "let baseConstants = require('./defaultConstants')

module.exports = Object.assign({}, baseConstants, {
  appEnv: 'dist',
  aadInstance: '${env:aadInstance}',
  aadTenant: '$env:aadTenant',
  clientId: '$env:clientId',
  baseUrl: '$env:baseUrl',
  authRedirectUri: '$env:authRedirectUri',
  authVersion: 'ADAL', // TODO: Add env var
  ticketSystems: {
    1: {
      id: 1,
      name: 'Default Ticket System',
      ticketUriPrefix: '$env:ticketUriPrefix:',
      ticketUriSuffix: '$env:ticketUriSuffix:'
    }
  }
})"

$s | out-file ".\dist.const.js" -Encoding utf8
