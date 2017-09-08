import React from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import LoginError from './LoginError'

export const EnsureLoggedInContainer = ({error, isLoggedIn, ADAL, children}) => {
  if (error) {
    return <LoginError/>
  }
  if (isLoggedIn) {
    return children
  }
  return <Login ADAL={ADAL}/>
}

export const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error,
    ADAL: ownProps.ADAL
  }
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)