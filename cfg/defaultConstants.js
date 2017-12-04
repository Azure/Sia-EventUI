require('dotenv').config()

module.exports = {

    baseUrl: JSON.stringify("http://localhost:50000/"),

    authRedirectUri: JSON.stringify("http://localhost:3000/"),

    retries: 2,

    retryExponentialBackoffFactor: 2,

    retryMinTimeoutInMiliseconds: 50,

    retryMaxTimeoutInMiliseconds: 1500,

    ticketRefreshIntervalInSeconds: 300,

    aadTenant: process.env.AAD_TENANT,

    clientId: process.env.CLIENT_ID
}
