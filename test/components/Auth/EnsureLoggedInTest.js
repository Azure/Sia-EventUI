'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from 'test/helpers/shallowRenderHelper'
import GetMockStore from 'test/helpers/mockReduxStore'
import { EnsureLoggedInContainer, mapStateToProps } from 'components/Auth/EnsureLoggedIn'
import Login from 'components/Auth/Login'
import LoginError from 'components/Auth/LoginError'

const setup = (props, children) => createComponent(EnsureLoggedInContainer, props, children)

const children = <div />

const errorState = {
  error: 'Test Error',
  isLoggedIn: true,
  store: GetMockStore({auth: {error: 'Test Error'}})
}

const notLoggedInState = {
  isLoggedIn: false,
  store: GetMockStore({auth: {error: 'Test Error'}})
}

const loggedInState = {
  isLoggedIn: true,
  store: GetMockStore({auth: {error: 'Test Error'}})
}

describe('EnsureLoggedIn', function test () {
  beforeEach(() => {
    this.errorOutput = setup(errorState, children)
    this.notLoggedInOutput = setup(notLoggedInState, children)
    this.loggedInOutput = setup(loggedInState, children)
  })

  it('Should render LoginError when error is present', () => {
    expect(this.errorOutput.type).to.equal(LoginError)
  })

  it('Should render Login when no error is present and user is not logged in', () => {
    expect(this.notLoggedInOutput.type).to.equal(Login)
  })

  it('Should render children when no error is present and user is logged in', () => {
    expect(this.loggedInOutput.type).to.equal('div')
  })
})
