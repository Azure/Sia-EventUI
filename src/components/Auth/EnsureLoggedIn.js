import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Login from './Login'
import LoginError from './LoginError'

export const EnsureLoggedInContainer = ({error, isLoggedIn, children}) => {
  if (error) {
    return <LoginError/>
  }
  if (isLoggedIn) {
    return children
  }
  return <Login/>
}

EnsureLoggedInContainer.propTypes = {
  error: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired
}

export const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error
  }
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)