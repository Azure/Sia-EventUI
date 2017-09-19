import { tokenPromise } from './adalService'
import { rawHttpResponse, jsonResult } from '../actions/debugActions'
import PromiseRetry from 'promise-retry'

const defaultBasePath = BASE_URL
const defaultOptions = {
    retries: RETRIES,
    factor: RETRY_EXPONENTIAL_BACKOFF_FACTOR,
    minTimeout: RETRY_MIN_TIMEOUT,
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

const tryGetToken = (dispatch) => (retry, number) => {
    return tokenPromise(dispatch)
        .catch(err => retry(`Error during fetch: ${err} (retry ${number})`))
}

export const authenticatedFetch = (dispatch, relativeUrl, init, returnJson = true, baseUrl = defaultBasePath) => {
    return PromiseRetry(
        tryGetToken(dispatch),
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

const httpResponseNeedsRetry = (response) => response.status >= 400

export default authenticatedFetch