import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login } from '../../services/authNService'

export class Login extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        login: PropTypes.func,
        isLoggedIn: PropTypes.bool.isRequired,
        signInAutomatically: PropTypes.bool.isRequired
    }
    
    constructor() {
        super()
    }
    
    componentDidMount() {
        //exported separately for testing
        LoginComponentDidMount(this.props)
    }

    render() {
        const { dispatch } = this.props
        return (
                <button id="SignIn" onClick={() => dispatch(login)}>Sign In</button>
        )
    }
}

export const LoginComponentDidMount = ({
    isLoggedIn,
    loginInProgress,
    signInAutomatically,
    dispatch
}) => {
    if(!isLoggedIn && !loginInProgress && signInAutomatically) {
        dispatch(login)
    }
}

export const mapStateToProps = (state) => {
    return {
        ...state.auth
    }
}

export default connect(mapStateToProps)(Login)