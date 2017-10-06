import { rawHttpResponse, jsonResult } from '../actions/debugActions'
import PromiseRetry from 'promise-retry'

// eslint-disable-next-line no-undef
const defaultBasePath = BASE_URL
const defaultOptions = {
    // eslint-disable-next-line no-undef
    retries: RETRIES,
    // eslint-disable-next-line no-undef
    factor: RETRY_EXPONENTIAL_BACKOFF_FACTOR,
    // eslint-disable-next-line no-undef
    minTimeout: RETRY_MIN_TIMEOUT,
    // eslint-disable-next-line no-undef
    maxTimeout: RETRY_MAX_TIMEOUT
}

const tryFetch = (dispatch, relativeUrl, init, returnJson = true, baseUrl = defaultBasePath) => (retry, number) => {
    return fetch(baseUrl + relativeUrl, init)
        .then(response => {
            dispatch(rawHttpResponse(response))
            if(httpResponseNeedsRetry(response)) {
                retry(`HTTP Response Needs Retry (retry ${number})`)
            }
            else {
                if(returnJson) {
                    return response
                        .json()
                        .then(json => {
                            dispatch(jsonResult(json))
                            return Promise.resolve({json, response})
                        }, err => Promise.reject(`Error parsing json: ${err}`))
                }
                return Promise.resolve(response)
            }
        }, err => retry(`Error during fetch: ${err} (retry ${number})`))
}

const tryGetToken = (siaContext) => (retry, number) => {
    return tokenPromise(siaContext)
        .catch(err => retry(`Error during fetch: ${err} (retry ${number})`))
}

export const authenticatedFetch = (siaContext) => (relativeUrl, init, returnJson = true, baseUrl = defaultBasePath) => {
    return PromiseRetry(
        tryGetToken(siaContext),
        defaultOptions
    ).then(token => {
        const authenticatedInit = initWithAuth(init, token)
        return PromiseRetry(
            tryFetch(siaContext.dispatch, relativeUrl, authenticatedInit, returnJson, baseUrl),
            defaultOptions
        )
    })
}

export const authenticatedPost = (siaContext) => (relativeUrl, body, init, returnJson = true, baseUrl = defaultBasePath) => {
    return authenticatedFetch(siaContext)(relativeUrl, initWithContent(init, body), returnJson, baseUrl)
}

export const authenticatedPut = (siaContext) => (relativeUrl, body, init, returnJson = true, baseUrl = defaultBasePath) => {
    return authenticatedFetch(siaContext)(relativeUrl, initWithContent(init, body, 'PUT'), returnJson, baseUrl)
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

const initWithContent = (init, unserializedBody, method = 'POST')  => {
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

const tokenPromise = (siaContext) => new Promise((resolve, reject) => {
    siaContext.authContext.acquireToken(clientId, callbackBridge(resolve, reject))
  }).catch((reason)=> {
    if(reason && reason === 'User login is required'){
      return new Promise((innerResolve, innerReject) => {
        siaContext.dispatch(authActions.loginInProgress())
        siaContext.authContext.callback = callbackBridge(dispatchOnResolve(innerResolve, dispatch, authActions.userLoggedIn()), innerReject)
        siaContext.authContext.login()
      })
    }
  })

const httpResponseNeedsRetry = (response) => response.status >= 400

export default authenticatedFetch