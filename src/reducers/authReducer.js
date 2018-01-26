import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_LOGIN_ERROR, LOGIN_IN_PROGRESS } from 'actions/authActions.js'
import * as authNService from 'services/authNService'

const getDefaultState = () => {
  const defaultState = {
    isLoggedIn: authNService.isLoggedIn(),
    loginInProgress: authNService.loginInProgress(),
    signInAutomatically: true,
    userTeam: 'none',
    userRole: 'Crisis Manager',
    userAlias: authNService.getUserAlias()
  }
  return defaultState
}

const authReducer = (state = getDefaultState(), action) => {
  switch (action.type) {
    case LOGIN_IN_PROGRESS:
      return {
        ...state,
        loginInProgress: true,
        error: null
      }
    case USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
        error: null,
        loginInProgress: false,
        signInAutomatically: true,
        userAlias: authNService.getUserAlias(action.user)
      }
    case USER_LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false,
        error: null,
        loginInProgress: false,
        signInAutomatically: false,
        userAlias: null
      }
    case USER_LOGIN_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        error: action.error,
        loginInProgress: false,
        userAlias: null
      }
    default:
      return state
  }
}

export default authReducer
