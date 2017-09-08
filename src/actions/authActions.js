import * as incidentActions from './incidentActions.js'
import { ADAL, authContext } from '../services/adalService'
export const LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS'
export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR'

export const onLoginActions = () => (dispatch) => {
    dispatch(incidentActions.fetchIncidents())
    const user = ADAL(dispatch).getCachedUser()
    dispatch(userLoggedIn(user))
}

export const onLogoutActions = (dispatch) => {
    dispatch(userLoggedOut())
    authContext.logOut()
}

export const startLogin = (ADALInstance) => (dispatch) => {
    dispatch(loginInProgress())
    ADALInstance.login()
}

export const loginInProgress = () => ({
    type: LOGIN_IN_PROGRESS
})

export const userLoggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user
})

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
})

export const userLoginError = error => ({
    type: USER_LOGIN_ERROR,
    error
})

