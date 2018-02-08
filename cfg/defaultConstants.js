module.exports = {

  appEnv: 'test',

  baseUrl: 'http://localhost:50000/',

  authRedirectUri: 'http://localhost:3000/',

  retries: 2,

  retryExponentialBackoffFactor: 2,

  retryMinTimeoutInMiliseconds: 50,

  retryMaxTimeoutInMiliseconds: 1500,

  ticketRefreshIntervalInSeconds: 300,

  authVersion: 'TEST',

  //   Leave this as is if your code is in a public repo (or delete it if you want).
  // You can override the defaults with the real information in your cfg/$env.const.js file.
  aadInstance: 'https://login.microsoftonline.com/', // Replace only if using AAD non-public instances.

  aadTenant: 'Your Azure Active Directory tenant here',

  clientId: 'Your EventUI Azure Active Directory app registration client ID here',

  ticketSystems: {
    1: {
      id: 1,
      name: 'Example1',
      ticketUriPrefix: 'http://example1/ticket/',
      ticketUriSuffix: ''
    },
    2: {
      id: 2,
      name: 'Example2',
      ticketUriPrefix: 'http://example2/ticketId=',
      ticketUriSuffix: '&edit=false'
    }
  },

  instrumentationKey: 'APP INSIGHT GOES HERE',
  
  useAppInsights: true
}
