'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from 'test/helpers/shallowRenderHelper'
import { Login, LoginComponentDidMount, mapStateToProps } from 'components/Auth/Login'
import GetMockStore from 'test/helpers/mockReduxStore'
import * as authActions from 'actions/authActions'

function setup ({isLoggedIn, loginInProgress, signInAutomatically, dispatch}) {
  let props = {
    isLoggedIn,
    loginInProgress,
    signInAutomatically,
    dispatch
  }

  return createComponent(Login, props)
}

const baseCase = (mockStore) => ({
  dispatch: mockStore.dispatch
})

const loggedIn = (mockStore) => ({
  isLoggedIn: true,
  loginInProgress: false,
  signInAutomatically: true,
  ...baseCase(mockStore)
})

const loginInProgress = (mockStore) => ({
  isLoggedIn: false,
  loginInProgress: true,
  signInAutomatically: true,
  ...baseCase(mockStore)
})

const loggedOutWithSignIn = (mockStore) => ({
  isLoggedIn: false,
  loginInProgress: false,
  signInAutomatically: true,
  ...baseCase(mockStore)
})

const loggedOutNoSignIn = (mockStore) => ({
  isLoggedIn: false,
  loginInProgress: false,
  signInAutomatically: false,
  ...baseCase(mockStore)
})

describe('Login', function () {
  describe('Render', function () {
    describe('When user is logged in', function () {
      const loggedInMock = GetMockStore()
      const loggedInCase = loggedIn(loggedInMock)
      const loggedInComponent = setup(loggedInCase)

      it('Should always render a signin button', () => {
        expect(loggedInComponent.type).to.equal('button')
      })

      it('Should always attempt to log in when signin button is clicked', () => {
        loggedInComponent.props.onClick()
        expect(loggedInMock.getActions()[0].type).to.equal('LOGIN_IN_PROGRESS')
        expect(loggedInMock.getActions()[1].type).to.equal('TEST_LOGIN')
        expect(loggedInMock.getActions()[2]).to.not.exist
      })
    })

    describe('When signin is in progress', function () {
      const loginInProgressMock = GetMockStore()
      const loginInProgressCase = loginInProgress(loginInProgressMock)
      const loginInProgressComponent = setup(loginInProgressCase)

      it('Should always render a signin button', () => {
        expect(loginInProgressComponent.type).to.equal('button')
      })

      it('Should always attempt to log in when signin button is clicked', () => {
        loginInProgressComponent.props.onClick()
        expect(loginInProgressMock.getActions()[0].type).to.equal('LOGIN_IN_PROGRESS')
        expect(loginInProgressMock.getActions()[1].type).to.equal('TEST_LOGIN')
        expect(loginInProgressMock.getActions()[2]).to.not.exist
      })
    })

    describe('When signed out and automatic signin is enabled', function () {
      const loggedOutWithSignInMock = GetMockStore()
      const loggedOutWithSignInCase = loggedOutWithSignIn(loggedOutWithSignInMock)
      const loggedOutWithSignInComponent = setup(loggedOutWithSignInCase)

      it('Should always render a signin button', () => {
        expect(loggedOutWithSignInComponent.type).to.equal('button')
      })

      it('Should always attempt to log in when signin button is clicked', () => {
        loggedOutWithSignInComponent.props.onClick()
        expect(loggedOutWithSignInMock.getActions()[0].type).to.equal('LOGIN_IN_PROGRESS')
        expect(loggedOutWithSignInMock.getActions()[1].type).to.equal('TEST_LOGIN')
        expect(loggedOutWithSignInMock.getActions()[2]).to.not.exist
      })
    })

    describe('When signed out and automatic signin is disabled', function () {
      const loggedOutNoSignInMock = GetMockStore()
      const loggedOutNoSignInCase = loggedOutNoSignIn(loggedOutNoSignInMock)
      const loggedOutNoSignInComponent = setup(loggedOutNoSignInCase)

      it('Should always render a signin button', () => {
        expect(loggedOutNoSignInComponent.type).to.equal('button')
      })

      it('Should always attempt to log in when signin button is clicked', () => {
        loggedOutNoSignInComponent.props.onClick()
        expect(loggedOutNoSignInMock.getActions()[0].type).to.equal('LOGIN_IN_PROGRESS')
        expect(loggedOutNoSignInMock.getActions()[1].type).to.equal('TEST_LOGIN')
        expect(loggedOutNoSignInMock.getActions()[2]).to.not.exist
      })
    })
  })

  describe('LoginComponentDidMount', function () {
    beforeEach(() => {
      this.loggedInMock = GetMockStore()
      this.loginInProgressMock = GetMockStore()
      this.loggedOutWithSignInMock = GetMockStore()
      this.loggedOutNoSignInMock = GetMockStore()

      this.loggedInCase = loggedIn(this.loggedInMock)
      this.loginInProgressCase = loginInProgress(this.loginInProgressMock)
      this.loggedOutWithSignInCase = loggedOutWithSignIn(this.loggedOutWithSignInMock)
      this.loggedOutNoSignInCase = loggedOutNoSignIn(this.loggedOutNoSignInMock)

      LoginComponentDidMount(this.loggedInCase)
      LoginComponentDidMount(this.loginInProgressCase)
      LoginComponentDidMount(this.loggedOutWithSignInCase)
      LoginComponentDidMount(this.loggedOutNoSignInCase)
    })

    it('Should attempt to log in when user is signed out and has signInAutomatically as true', () => {
      expect(this.loggedOutWithSignInMock.getActions()[0].type).to.equal('LOGIN_IN_PROGRESS')
      expect(this.loggedOutWithSignInMock.getActions()[1].type).to.equal('TEST_LOGIN')
      expect(this.loggedOutWithSignInMock.getActions()[2]).to.not.exist
    })

    it('Should not attempt to log in when user is signed in, a login is already in progress, or signInAutomatically is false', () => {
      expect(this.loggedInMock.getActions()[0]).to.not.exist

      expect(this.loginInProgressMock.getActions()[0]).to.not.exist

      expect(this.loggedOutNoSignInMock.getActions()[0]).to.not.exist
    })
  })
  describe('MapStateToProps', function test () {
    it('Should correctly generate an args object from state', () => {
      const inputStateDefault = {
        auth: {
          isLoggedIn: true,
          loginInProgress: true,
          signInAutomatically: true
        }
      }
      const expectedResultFromDefault = {
        isLoggedIn: true,
        loginInProgress: true,
        signInAutomatically: true
      }

      const result = mapStateToProps(inputStateDefault)

      expect(result.isLoggedIn).to.equal(expectedResultFromDefault.isLoggedIn)
      expect(result.loginInProgress).to.equal(expectedResultFromDefault.loginInProgress)
      expect(result.signInAutomatically).to.equal(expectedResultFromDefault.signInAutomatically)
    })
  })
})
