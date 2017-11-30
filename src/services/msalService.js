import { UserAgentApplication } from 'msal'
import * as authActions from '../actions/authActions'

// eslint-disable-next-line no-undef
export const clientId = CLIENT_ID //From config

export const authVersion = 'msal'

const defaultScopes = [clientId]
const authority = 'https://login.microsoftonline.com/' + AAD_TENANT
export const getAuthContext = () =>
{
    if(typeof window !== 'undefined' && !!window)
    {
        return window.msal
        ? window.msal
        : new UserAgentApplication(
            clientId,
            // eslint-disable-next-line no-undef
            authority,
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

export const login = (dispatch) => {
    if(typeof window !== 'undefined' && !!window)
    {
        GetAuthContext().loginRedirect()
        .then(
            () => dispatch(authActions.userLoggedIn(GetAuthContext().getUser())),
            err => dispatch(authActions.userLoginError(err))
        )
    }
    else
    {
        dispatch(authActions.userLoginError(windowDoesntExistRejection))
    }
}

export const logOut = (dispatch) => {
    getAuthContext().logOut()
    dispatch(userLoggedOut())
}

export const clearCache = () => {
    getAuthContext().clearCache()
}

export const isLoggedIn = () => {
    const context = getAuthContext()
    const user = context.getUser()
    return user
        ? !!(context.getCachedToken({scopes: defaultScopes, authority}, user))
        : false
}

export const getUserAlias = (passedInUser) => {
    const user = passedInUser
        ? passedInUser
        : getAuthContext().getUser()
    return (user && user.displayableId)
        ? extractAliasFromUserName(user.displayableId)
        : null
}

const extractAliasFromUserName = (userName) => {
    return userName.slice(0, userName.indexOf('@'))
}

export const getToken = () => getAuthContext()
    .acquireTokenSilent(defaultScopes)

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