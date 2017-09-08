import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../../actions/authActions'

export class Login extends React.Component {
    constructor() {
        super()
    }
    
    componentDidMount() {
        //exported separately for testing
        LoginComponentDidMount(this.props)
    }

    render() {
        const { ADAL, dispatch } = this.props
        return (
                <button id="SignIn" onClick={() => dispatch(startLogin(ADAL))}>Sign In</button>
        )
    }
}

export const LoginComponentDidMount = ({isLoggedIn, loginInProgress, signInAutomatically, ADAL, dispatch}) => {
    if(!isLoggedIn && !loginInProgress && signInAutomatically) {
        dispatch(startLogin(ADAL))
    }
}

export const mapStateToProps = (state, ownProps) => {
    return {
        ...state.auth,
        ADAL: ownProps.ADAL
    }
}

export default connect(mapStateToProps)(Login)