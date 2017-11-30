import { rawHttpResponse, jsonResult } from '../actions/debugActions'
import PromiseRetry from 'promise-retry'
import { getToken } from './authNService'

// eslint-disable-next-line no-undef
export const clientId = CLIENT_ID //From config

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
const defaultScopes = [clientId]

const tryFetch = (dispatch, relativeUrl, init, returnJson = true, baseUrl = defaultBasePath) => (retry, number) => {
    return fetch(baseUrl + relativeUrl, init)
        .then(response => {
            const localResponse = response
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
                            return Promise.resolve({json, response:localResponse})
                        }, err => Promise.reject(`Error parsing json: ${err}`))
                }
                return Promise.resolve(response)
            }
        }, err => retry(`Error during fetch: ${err} (retry ${number})`))
}

const tryGetToken = (retry, number) => getToken()
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
