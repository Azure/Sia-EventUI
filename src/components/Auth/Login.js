import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../../actions/authActions'

export class Login extends React.Component {
    constructor() {
        super()
    }
    
    componentDidMount() {
        //exported separately for testing
        this.props.LoginComponentDidMount(this.props)
    }

    render() {
        const { dispatch, StartLogin } = this.props
        return (
                <button id="SignIn" onClick={() => dispatch(StartLogin)}>Sign In</button>
        )
    }
}

export const LoginComponentDidMount = StartLogin => ({isLoggedIn, loginInProgress, signInAutomatically, dispatch}) => {
    if(!isLoggedIn && !loginInProgress && signInAutomatically) {
        dispatch(StartLogin)
    }
}

export const mapStateToProps = (state) => {
    return {
        ...state.auth,
        LoginComponentDidMount: LoginComponentDidMount(startLogin),
        StartLogin: startLogin
    }
}

export default connect(mapStateToProps)(Login)