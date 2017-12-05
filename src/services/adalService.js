
import AuthenticationContext from 'adal-angular'
import * as authActions from '../actions/authActions'

// eslint-disable-next-line no-undef
export const clientId = CLIENT_ID //From config

export const authVersion = 'adal'


export const getAuthContext = () => new AuthenticationContext({
      instance: 'https://login.microsoftonline.com/',
      // eslint-disable-next-line no-undef
      tenant: AAD_TENANT, //From config
      // eslint-disable-next-line no-undef
      redirectUri: AUTH_REDIRECT_URI, //From config
      clientId: clientId,

      popUp: true
  })

export const login = (dispatch) => {
  if(typeof window !== 'undefined' && !!window)
  {
    const context = getAuthContext()
    context.callback = (err) => {
      err
        ? dispatch(authActions.userLoginError(err))
        : dispatch(authActions.userLoggedIn(getAuthContext().getCachedUser()))
    }
    context.login()
  }
  else
  {
      dispatch(authActions.userLoginError('Window is undefined, so ADAL cannot function!'))
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
  const token = getAuthContext().getCachedToken(clientId)
  return !!token
}

export const getUserAlias = (passedInUser) => {
  const user = passedInUser
      ? passedInUser
      : getAuthContext().getUser()
  return (user && user.userName)
      ? extractAliasFromUserName(user.userName)
      : null
}

const extractAliasFromUserName = (userName) => {
  return userName.slice(0, userName.indexOf('@'))
}

export const getToken = () => tokenPromise()


const tokenPromise = () => new Promise(
  (resolve, reject) => {
    getAuthContext().acquireToken(clientId, callbackBridge(resolve, reject))
  }
)

const callbackBridge = (resolve, reject) => (errDesc, token) => errDesc
  ? reject(errDesc)
  : resolve(token)

  