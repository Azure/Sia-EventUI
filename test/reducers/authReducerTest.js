'use strict'
import { expect } from 'chai';
import * as authActions from '../../src/actions/authActions.js'
import authReducer from '../../src/reducers/authReducer.js'

const testUser = {
    userName: 'testUser@contoso.com'
}

const defaultState = {
    isLoggedIn: false,
    loginInProgress: false,
    signInAutomatically: true,
}

const loggedInState = {
    isLoggedIn: true,
    loginInProgress: false,
    signInAutomatically: true,
    error: null,
    userAlias: 'testUser'
}

const loggedOutState = {
    isLoggedIn: false,
    loginInProgress: false,
    signInAutomatically: false,
    error: null,
    userAlias: null
}

const loginErrorState = {
    isLoggedIn: false,
    loginInProgress: false,
    signInAutomatically: true,
    error: 'Error',
    userAlias: null
}

const loginInProgressState = {
    isLoggedIn: false,
    loginInProgress: true,
    signInAutomatically: true,
    error: null
}

describe('authReducer', function test () {

    beforeEach( () => {
        this.testToken = 'Test Token'
        this.testError = 'Test Error'

        this.onLoginFromDefault = authReducer(defaultState, authActions.userLoggedIn(testUser))
        this.onLoginFromLoggedOut = authReducer(loggedOutState, authActions.userLoggedIn(testUser))
        this.onLoginFromError = authReducer(loginErrorState, authActions.userLoggedIn(testUser))
        this.onLoginFromInProgress = authReducer(loginInProgressState, authActions.userLoggedIn(testUser))
        
        this.onErrorFromDefault = authReducer(defaultState, authActions.userLoginError(this.testError))
        this.onErrorFromLoggedIn = authReducer(loggedInState, authActions.userLoginError(this.testError))
        this.onErrorFromInProgress = authReducer(loginInProgressState, authActions.userLoginError(this.testError))
        
        this.onLogoutFromError = authReducer(loginErrorState, authActions.userLoggedOut())
        this.onLogoutFromLoggedIn = authReducer(loggedInState, authActions.userLoggedOut())

        this.onInProgressFromDefault = authReducer(defaultState, authActions.loginInProgress())
        this.onInProgressFromError = authReducer(loginErrorState, authActions.loginInProgress())
    })

    it('Should set isLoggedIn to true on login', () => {
        expect(this.onLoginFromDefault.isLoggedIn).to.be.true
        expect(this.onLoginFromLoggedOut.isLoggedIn).to.be.true
        expect(this.onLoginFromError.isLoggedIn).to.be.true
        expect(this.onLoginFromInProgress.isLoggedIn).to.be.true
    })

    it('Should set isLoggedIn to false on error or logout', () => {
        expect(this.onErrorFromDefault.isLoggedIn).to.be.false
        expect(this.onErrorFromLoggedIn.isLoggedIn).to.be.false
        expect(this.onErrorFromInProgress.isLoggedIn).to.be.false
        expect(this.onLogoutFromError.isLoggedIn).to.be.false
        expect(this.onLogoutFromLoggedIn.isLoggedIn).to.be.false
    })

    it('Should set signInAutomatically to true on login', () => {
        expect(this.onLoginFromDefault.signInAutomatically).to.be.true
        expect(this.onLoginFromLoggedOut.signInAutomatically).to.be.true
        expect(this.onLoginFromError.signInAutomatically).to.be.true
        expect(this.onLoginFromInProgress.signInAutomatically).to.be.true
    })

    it('Should set signInAutomatically to false on logout', () => {
        expect(this.onLogoutFromError.signInAutomatically).to.be.false
        expect(this.onLogoutFromLoggedIn.signInAutomatically).to.be.false
    })

    it('Should set loginInProgress to false on login, logout, or error', () => {
        expect(this.onLoginFromDefault.loginInProgress).to.be.false
        expect(this.onLoginFromLoggedOut.loginInProgress).to.be.false
        expect(this.onLoginFromError.loginInProgress).to.be.false
        expect(this.onLoginFromInProgress.loginInProgress).to.be.false
        expect(this.onErrorFromDefault.loginInProgress).to.be.false
        expect(this.onErrorFromLoggedIn.loginInProgress).to.be.false
        expect(this.onErrorFromInProgress.loginInProgress).to.be.false
        expect(this.onLogoutFromError.loginInProgress).to.be.false
        expect(this.onLogoutFromLoggedIn.loginInProgress).to.be.false
    })

    it('Should set loginInProgress to true on inProgress', () => {
        expect(this.onInProgressFromDefault.loginInProgress).to.be.true
        expect(this.onInProgressFromError.loginInProgress).to.be.true
    })

    it('Should clear error on login, logout, or in progress (retry)', () => {
        expect(this.onLoginFromError.error).to.be.null
        expect(this.onLogoutFromError.error).to.be.null
        expect(this.onInProgressFromError.error).to.be.null
    })

    it('Should populate error from action on error', () => {
        expect(this.onErrorFromDefault.error).to.equal(this.testError)
        expect(this.onErrorFromLoggedIn.error).to.equal(this.testError)
        expect(this.onErrorFromInProgress.error).to.equal(this.testError)
    })
})