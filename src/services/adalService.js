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

export const siaContext = (authContext, dispatch) => {
  const context = ({
    authContext,
    dispatch
  })

  context.authContext.callback = userSignedIn(context)
  return context
} 

export const userSignedIn = 
  (siaContext) =>
  (err) => {
    if (err) {
      siaContext.dispatch(authActions.userLoginError(err))
      return
    }
    setTimeout(siaContext.dispatch, null, authActions.onLoginActions(siaContext.authContext))
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
