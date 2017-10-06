import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_LOGIN_ERROR, LOGIN_IN_PROGRESS } from '../actions/authActions.js'

const extractAliasFromUserName = (userName) => {
    return userName.slice(0, userName.indexOf('@'))
}

const getDefaultState = (authContext, clientId) => {
    const token = authContext.getCachedToken(clientId)
    const user = authContext.getCachedUser()
    return {
        isLoggedIn: (!!token),
        loginInProgress: false,
        signInAutomatically: true,
        userTeam: 'none',
        userRole: 'Crisis Manager',
        userAlias: (user && user.userName) ? extractAliasFromUserName(user.userName) : null
    }
}

const authReducer = (authContext, clientId) => (state = getDefaultState(authContext, clientId), action) => {
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
                userAlias: extractAliasFromUserName(action.user.userName)
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