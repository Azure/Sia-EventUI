module.exports = {

    baseUrl: JSON.stringify("http://localhost:50000"),

    authRedirectUri: JSON.stringify("http://localhost:3000"),

    retries: 2,

    retryExponentialBackoffFactor: 2,

    retryMinTimeoutInMiliseconds: 50,

    retryMaxTimeoutInMiliseconds: 1500,

    ticketRefreshIntervalInSeconds: 300,

    aadTenant: "'Your Azure Active Directory tenant here'", //Yes, use both single and double quotes.

    clientId: "'Your EventUI Azure Active Directory app registration client ID here'"

}