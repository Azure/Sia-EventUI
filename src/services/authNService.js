import * as msalService from './msalService'
import * as adalService from './adalService'
import * as authActions from '../actions/authActions'
// eslint-disable-next-line no-undef
const authVersion = AUTH_VERSION




export const login = (dispatch) => {
    dispatch(authActions.loginInProgress())
    switch(authVersion)
    {
        case msalService.authVersion:
            dispatch(msalService.login)
        default:
            dispatch(adalService.login)
    }
}

export const logOut = (dispatch) => {
    switch(authVersion)
    {
        case msalService.authVersion:
            dispatch(msalService.logOut)
        default:
            dispatch(adalService.logOut)
    }
}

export const clearCache = () => {
    switch(authVersion)
    {
        case msalService.authVersion:
            msalService.clearCache()
        default:
            adalService.clearCache()
    }
}

export const isLoggedIn = () => {
    switch(authVersion)
    {
        case msalService.authVersion:
            return msalService.isLoggedIn()
        default:
            return adalService.isLoggedIn()
    }
}

export const getUserAlias = (user) => {
    switch(authVersion)
    {
        case msalService.authVersion:
            return msalService.getUserAlias(user)
        default:
            return adalService.getUserAlias(user)
    }
}

export const getToken = () => {
    switch(authVersion)
    {
        case msalService.authVersion:
            return msalService.getToken()
        default:
            return adalService.getToken()
    }
}