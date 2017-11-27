'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from '../../helpers/shallowRenderHelper'
import { Login, LoginComponentDidMount, mapStateToProps } from '../../../src/components/Auth/Login'
import GetMockStore from '../../helpers/mockReduxStore'
import * as authActions from '../../../src/actions/authActions'



function setup({isLoggedIn, loginInProgress, signInAutomatically, dispatch, loginComponentDidMount}) {
    let props = {
        isLoggedIn,
        loginInProgress,
        signInAutomatically,
        loginComponentDidMount,
        StartLogin: {type:'START_LOGIN'},
        dispatch
    }

    return createComponent(Login, props)
}



const baseCase = (mockStore) => ({
    dispatch: mockStore.dispatch,
    StartLogin: {type:'START_LOGIN'},
    loginComponentDidMount: LoginComponentDidMount({type:'START_LOGIN'})
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
        beforeEach( () => {
            this.loggedInMock = GetMockStore()
            this.loginInProgressMock = GetMockStore()
            this.loggedOutWithSignInMock = GetMockStore()
            this.loggedOutNoSignInMock = GetMockStore()

            this.loggedInCase = loggedIn(this.loggedInMock)
            this.loginInProgressCase = loginInProgress(this.loginInProgressMock)
            this.loggedOutWithSignInCase = loggedOutWithSignIn(this.loggedOutWithSignInMock)
            this.loggedOutNoSignInCase = loggedOutNoSignIn(this.loggedOutNoSignInMock)

            this.loggedInComponent = setup(this.loggedInCase)
            this.loginInProgressComponent = setup(this.loginInProgressCase)
            this.loggedOutWithSignInComponent = setup(this.loggedOutWithSignInCase)
            this.loggedOutNoSignInComponent = setup(this.loggedOutNoSignInCase)
        })

        it('Should always render a signin button', () => {
            expect(this.loggedInComponent.type).to.equal('button')
            expect(this.loginInProgressComponent.type).to.equal('button')
            expect(this.loggedOutWithSignInComponent.type).to.equal('button')
            expect(this.loggedOutNoSignInComponent.type).to.equal('button')
        })
    
        it('Should always attempt to log in when signin button is clicked', () => {
            this.loggedInComponent.props.onClick()
            expect(this.loggedInMock.getActions()[0].type).to.equal('START_LOGIN')
            expect(this.loggedInMock.getActions()[1]).to.not.exist

            this.loginInProgressComponent.props.onClick()
            expect(this.loginInProgressMock.getActions()[0].type).to.equal('START_LOGIN')
            expect(this.loginInProgressMock.getActions()[1]).to.not.exist

            this.loggedOutWithSignInComponent.props.onClick()
            expect(this.loggedOutWithSignInMock.getActions()[0].type).to.equal('START_LOGIN')
            expect(this.loggedOutWithSignInMock.getActions()[1]).to.not.exist

            this.loggedOutNoSignInComponent.props.onClick()
            expect(this.loggedOutNoSignInMock.getActions()[0].type).to.equal('START_LOGIN')
            expect(this.loggedOutNoSignInMock.getActions()[1]).to.not.exist
        })
    })

    describe('LoginComponentDidMount', function () {
        beforeEach( () => {
            this.loggedInMock = GetMockStore()
            this.loginInProgressMock = GetMockStore()
            this.loggedOutWithSignInMock = GetMockStore()
            this.loggedOutNoSignInMock = GetMockStore()

            this.loggedInCase = loggedIn(this.loggedInMock)
            this.loginInProgressCase = loginInProgress(this.loginInProgressMock)
            this.loggedOutWithSignInCase = loggedOutWithSignIn(this.loggedOutWithSignInMock)
            this.loggedOutNoSignInCase = loggedOutNoSignIn(this.loggedOutNoSignInMock)
    
            this.loggedInCase.loginComponentDidMount(this.loggedInCase)
            this.loginInProgressCase.loginComponentDidMount(this.loginInProgressCase)
            this.loggedOutWithSignInCase.loginComponentDidMount(this.loggedOutWithSignInCase)
            this.loggedOutNoSignInCase.loginComponentDidMount(this.loggedOutNoSignInCase)
        })

        it('Should attempt to log in when user is signed out and has signInAutomatically as true', () => {
            expect(this.loggedOutWithSignInMock.getActions()[0].type).to.equal('START_LOGIN')
            expect(this.loggedOutWithSignInMock.getActions()[1]).to.not.exist
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



