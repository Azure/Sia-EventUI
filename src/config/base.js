'use strict'

/*eslint-disable no-undef */
// These constants are being defined by Webpack in /cfg/
let config = {
  baseUrl: BASE_URL,
  authRedirectUri: AUTH_REDIRECT_URI,
  retries: RETRIES,
  retryExponentialBackoffFactor: RETRY_EXPONENTIAL_BACKOFF_FACTOR,
  retryMinTimeoutInMiliseconds: RETRY_MIN_TIMEOUT,
  retryMaxTimeoutInMiliseconds: RETRY_MAX_TIMEOUT,
  ticketRefreshIntervalInSeconds: TICKET_REFRESH_INTERVAL,
  aadInstance: AAD_INSTANCE,
  aadTenant: AAD_TENANT,
  clientId: CLIENT_ID
}
/*eslint-enable no-undef */


export default config
