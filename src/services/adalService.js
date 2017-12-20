
import AuthenticationContext from 'adal-angular'
import * as authActions from '../actions/authActions'
import config from 'config'

export const clientId = config.clientId

export const authVersion = 'adal'


let context

export const getAuthContext = (dispatch) => {
  if(!context)
  {
    context = new AuthenticationContext({
      instance: config.aadInstance,
      tenant: config.aadTenant,
      redirectUri: config.redirectUri,
     // redirectUri: (chrome && chrome.identity) ? chrome.identity.getRedirectURL('/extension.html') : config.redirectUri, // eslint-disable-line no-undef
      clientId: clientId
    })
    console.log(chrome)
    //if in chrome extension configure auth accordingly
    // if(0) // eslint-disable-line no-undef
    // {
    //   context.config.displayCall = (url) => {
    //     chrome.identity.launchWebAuthFlow({url: url, interactive: true}, (resp) => { // eslint-disable-line no-undef
    //         context.handleWindowCallback(resp.split('#')[1])
    //     })
    //   }
    // }
  }
  
  if(dispatch)
  {
    context.callback = (err) => {
      err
        ? dispatch(authActions.userLoginError(err))
        : dispatch(authActions.userLoggedIn(context.getCachedUser()))
    }
  }

  return context
}

export const login = (dispatch) => {
  if(typeof window !== 'undefined' && !!window)
  {
      getAuthContext(dispatch).login()
  }
  else
  {
      dispatch(authActions.userLoginError('Window is undefined, so ADAL cannot function!'))
  }
}

export const logOut = (dispatch) => {
  getAuthContext(dispatch).logOut()
  dispatch(authActions.userLoggedOut())
}

export const clearCache = () => {
  getAuthContext().clearCache()
}

export const isLoggedIn = () => {
  const token = getAuthContext().getCachedToken(clientId)
  return !!token
}

export const getUserAlias = () => {
  const user = getAuthContext().getCachedUser()
  return (user && user.userName)
    ? extractAliasFromUserName(user.userName)
    : null
}

const extractAliasFromUserName = (userName) => {
  return userName.slice(0, userName.indexOf('@'))
}

export const getToken = () => tokenPromise()

export const loginInProgress = () => {
  const authContext = getAuthContext()
  return authContext._loginInProgress || authContext._acquireTokenInProgress
}

const tokenPromise = () => new Promise(
  (resolve, reject) => {
    getAuthContext().acquireToken(clientId, callbackBridge(resolve, reject))
  }
)

const callbackBridge = (resolve, reject) => (errDesc, token) => errDesc
  ? reject(errDesc)
  : resolve(token)