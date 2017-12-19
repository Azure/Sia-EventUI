
import AuthenticationContext from 'adal-angular'
import * as authActions from '../actions/authActions'
import config from 'config'

export const clientId = config.clientId

export const authVersion = 'adal'


let context

export const getAuthContext = (dispatch) => {
  console.dir(context)
  if(!context)
  {
    context = new AuthenticationContext({
      instance: config.aadInstance,
      tenant: config.aadTenant,
      redirectUri: chrome.identity.getRedirectURL('/extension.html'),
      clientId: clientId
    })
    context.config.displayCall = (url) => {
      chrome.identity.launchWebAuthFlow({url: url, interactive: true}, (resp) => {
        console.log(resp)
        
        context.handleWindowCallback(resp.split('#')[1])
      })
    }
  }
  
  if(dispatch)
  {
    context.callback = (err) => {
      console.log('context callback hit')
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
    // chrome.identity.launchWebAuthFlow(
    //   {
      //   //url: `${config.aadInstance}${config.aadTenant}/oauth2/v2.0/authorize?client_id=${config.clientId}&response_type=id_token+token&redirect_uri=${chrome.identity.getRedirectURL('/extension.html')}&nonce=123456789&scope=openid profile`,
      //   url:`${config.aadInstance}microsoft.onmicrosoft.com/oauth2/authorize?response_type=id_token&client_id=${config.clientId}&redirect_uri=${chrome.identity.getRedirectURL('/extension.html')}&client-request-id=11323aa6-e5a5-4920-9750-445abc26fd64&x-client-SKU=Js&x-client-Ver=1.0.15&nonce=ed9ddeeb-165e-41a1-9ad3-62f566d0f32b`, 
      //   interactive:true}, 
      // (resp)=>{console.log(resp)})
      getAuthContext(dispatch).login()
     //`${config.aadInstance}${config.aadTenant}/oauth2/v2.0/authorize?client_id=${config.clientId}&response_type=id_token+token&redirect_uri=${chrome.identity.getRedirectURL('/extension.html')}&nonce=123456789&scope=openid`}, 
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