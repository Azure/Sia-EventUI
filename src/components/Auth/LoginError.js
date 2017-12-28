import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const LoginError = ({error}) => {
    return (
        <div>
            There was a problem logging you in! {error}
        </div>
    )
}

export function mapStateToProps(state) {
    return{
        error: state.auth.error
    }
}

LoginError.propTypes = {
    error: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(LoginError)