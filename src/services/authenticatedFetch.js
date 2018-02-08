import { rawHttpResponse, jsonResult } from 'actions/debugActions'
import PromiseRetry from 'promise-retry'
import { getToken } from 'services/authNService'
import config from 'config'
import appInsights from 'src/appInsights'

export const clientId = config.clientId

const defaultBasePath = config.baseUrl
const defaultOptions = {
  retries: config.retries,
  factor: config.retryExponentialBackoffFactor,
  minTimeout: config.retryMinTimeoutInMiliseconds,
  maxTimeout: config.retryMaxTimeoutInMiliseconds
}
const defaultScopes = [clientId]

const tryFetch = (dispatch, relativeUrl, init, returnJson = true, baseUrl = defaultBasePath) => (retry, number) => {
  var startTime = new Date().getTime()
  return fetch(baseUrl + relativeUrl, init)
        .then(response => {
          var timeUsed = new Date() - startTime
          appInsights.trackDependency("myAjaxCall", init.method? init.method: "GET",  [baseUrl + relativeUrl], relativeUrl, timeUsed, response.ok, response.status)
          const localResponse = response
          dispatch(rawHttpResponse(response)) 
          if (httpResponseNeedsRetry(response)) {
            retry(`HTTP Response Needs Retry (retry ${number})`)
          } else {
            if (returnJson) {
              return response
                        .json()
                        .then(json => {
                          dispatch(jsonResult(json))
                          return Promise.resolve({json, response: localResponse})
                        }, err => Promise.reject(new Error(`Error parsing json: ${err}`)))
            }
            return Promise.resolve(response)
          }
        }, err => retry(`Error during fetch: ${err} (retry ${number})`))
}

const tryGetToken = (retry, number) => getToken(defaultScopes)
    .then(token => token)
    .catch(err => retry(`Error when attempting to retrieve token: ${err} (retry ${number})`))

export const authenticatedFetch = (dispatch, relativeUrl, init, returnJson = true, baseUrl = defaultBasePath) => {
  return PromiseRetry(
        tryGetToken,
        defaultOptions
    ).then(token => {
      const authenticatedInit = initWithAuth(init, token)
      return PromiseRetry(
            tryFetch(dispatch, relativeUrl, authenticatedInit, returnJson, baseUrl),
            defaultOptions
        )
    })
}

export const authenticatedPost = (dispatch, relativeUrl, body, init, returnJson = true, baseUrl = defaultBasePath) => {
  return authenticatedFetch(dispatch, relativeUrl, initWithContent(init, body), returnJson, baseUrl)
}

export const authenticatedPut = (dispatch, relativeUrl, body, init, returnJson = true, baseUrl = defaultBasePath) => {
  return authenticatedFetch(dispatch, relativeUrl, initWithContent(init, body, 'PUT'), returnJson, baseUrl)
}

const initWithAuth = (init, token) => {
  var headers = (init && init.headers) ? init.headers : new Headers()
  headers.append('Authorization', `Bearer ${token}`)
  return {
    ...init,
    headers,
    mode: 'cors',
    credentials: 'include'
  }
}

const initWithContent = (init, unserializedBody, method = 'POST') => {
  const body = JSON.stringify(unserializedBody)
  var headers = (init && init.headers) ? init.headers : new Headers()
  headers.append('Content-Type', 'application/json')
  return {
    ...init,
    method,
    body,
    headers
  }
}

const httpResponseNeedsRetry = (response) => response.status >= 400

export default authenticatedFetch
