import { UserAgentApplication } from 'msal'

// eslint-disable-next-line no-undef
export const clientId = CLIENT_ID //From config


export const getAuthContext = () =>
{
    if(typeof window !== 'undefined' && !!window)
    {
        return window.msal
        ? window.msal
        : new UserAgentApplication(
            clientId,
            // eslint-disable-next-line no-undef
            'https://login.microsoftonline.com/' + AAD_TENANT,
            tokenRetrieved,
            {
                // eslint-disable-next-line no-undef
                redirectUri: AUTH_REDIRECT_URI, //From config
                validateAuthority: true
            }
        )
    }
    return msalServiceHeadlessBrowserMode
}


const windowDoesntExistRejection = 'MSAL library cannot function in a headless broswer; the window object must exist'
const failOnNoWindow = () => Promise.reject(windowDoesntExistRejection)
const msalServiceHeadlessBrowserMode = ({
    loginRedirect: () => {},
    loginPopup: failOnNoWindow,
    logout: () => {},
    acquireTokenSilent: failOnNoWindow,
    acquireTokenPopup: failOnNoWindow,
    acquireTokenRedirect: () => {},
    getUser: () => null
})

const tokenRetrieved =
() =>
{
    //we don't store the token ourselves,
    //we retrieve it from the cache or remote STS on each request
}

export default getAuthContext