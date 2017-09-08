/*
These actions have no associated reducer, but they provide additional context for debugging
without changing state directly. They're intended to be used with Redux dev tools.
*/

const RAW_HTTP_RESPONSE = 'DEBUG_RAW_HTTP_RESPONSE'
const JSON_RESULT = 'DEBUG_JSON_RESULT'

//response is not serializable
export const rawHttpResponse = (response) => ({
    type: RAW_HTTP_RESPONSE,
    response:{
                bodyUsed: response.bodyUsed,
                ok: response.ok,
                redirected: response.redirected,
                status: response.status,
                statusText: response.statusText,
                type: response.type,
                url: response.url
            }
})

export const jsonResult = (json) => ({
    type:JSON_RESULT,
    json
})