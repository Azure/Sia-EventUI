import { UserAgentApplication } from 'msal'
import * as authActions from '../actions/authActions'
import config from 'config'

export const clientId = config.clientId
export const authVersion = 'msal'

const defaultScopes = [clientId]
const authority = config.aadInstance + config.aadTenant

export const getAuthContext = () =>
{
    if(typeof window !== 'undefined' && !!window)
    {
        return window.msal
        ? window.msal
        : new UserAgentApplication(
            clientId,
            authority,
            tokenRetrieved,
            {
                redirectUri: config.authRedirectUri,
                validateAuthority: true
            }
        )
    }
    return msalServiceHeadlessBrowserMode
}

export const login = (dispatch) => {
    if(typeof window !== 'undefined' && !!window)
    {
        getAuthContext().loginRedirect()
        .then(
            () => dispatch(authActions.userLoggedIn(getAuthContext().getUser())),
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
    dispatch(authActions.userLoggedOut())
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

export const getToken = (scopes) => getAuthContext()
    .acquireTokenSilent(scopes)

export const loginInProgress = () => getAuthContext()._loginInProgress


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