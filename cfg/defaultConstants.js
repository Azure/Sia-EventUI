module.exports = {

    baseUrl: JSON.stringify("http://localhost:50000/"),

    authRedirectUri: JSON.stringify("http://localhost:3000/"),

    retries: 2,

    retryExponentialBackoffFactor: 2,

    retryMinTimeoutInMiliseconds: 50,

    retryMaxTimeoutInMiliseconds: 1500,

    ticketRefreshIntervalInSeconds: 300,

    authVersion: "'ADAL'",

//   Leave this as is if your code is in a public repo (or delete it if you want).  You can override the defaults with the real information in your cfg/$env.const.js file.  

    aadTenant: "'Your Azure Active Directory tenant here'", //Yes, use both single and double quotes.

    clientId: "'Your EventUI Azure Active Directory app registration client ID here'"

}