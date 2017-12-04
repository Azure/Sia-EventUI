import AuthenticationContext from 'adal-angular'
import * as authActions from '../actions/authActions'
import config from 'config'

export const clientId = config.clientId

export const authContext = new AuthenticationContext({
      instance: config.aadInstance,
      tenant: config.aadTenant,
      redirectUri: config.authRedirectUri,
      clientId: config.clientId,
      popUp: true
  })

export const generateSiaContext = (authContext, dispatch) => {
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
    setTimeout(siaContext.dispatch, null, authActions.onLoginActions(siaContext))
  }
