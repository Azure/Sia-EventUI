import AuthenticationContext from 'adal-angular'
import * as authActions from '../actions/authActions'

// eslint-disable-next-line no-undef
export const clientId = CLIENT_ID //From config

export const authContext = new AuthenticationContext({
      instance: 'https://login.microsoftonline.com/',
      // eslint-disable-next-line no-undef
      tenant: AAD_TENANT, //From config
      // eslint-disable-next-line no-undef
      redirectUri: AUTH_REDIRECT_URI, //From config
      clientId: clientId,

      popUp: true
  })

export const ADAL = dispatch => {
  const context = authContext
  context.callback = userSignedIn(dispatch)
  return context
}

export const userSignedIn = function(dispatch){
  return function(err) {
    if (err) {
      dispatch(authActions.userLoginError(err))
      return
    }
    setTimeout(dispatch, null, authActions.onLoginActions())
  }
}

const callbackBridge = (resolve, reject) => (errDesc, token) => {
  if(errDesc){
    reject(errDesc)
    return
  }
  resolve(token)
}

const dispatchOnResolve = (resolve, dispatch, action) => (reason) => {
  dispatch(action)
  resolve(reason)
}

export const tokenPromise = (dispatch) => new Promise((resolve, reject) => {
  authContext.acquireToken(clientId, callbackBridge(resolve, reject))
}).catch((reason)=> {
  if(reason && reason === 'User login is required'){
    return new Promise((innerResolve, innerReject) => {
      dispatch(authActions.loginInProgress())
      authContext.callback = callbackBridge(dispatchOnResolve(innerResolve, dispatch, authActions.userLoggedIn()), innerReject)
      authContext.login()
    })
  }
})