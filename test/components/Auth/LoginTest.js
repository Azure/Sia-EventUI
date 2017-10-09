'use strict'
import { expect } from 'chai'
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import { Login, LoginComponentDidMount, mapStateToProps } from '../../../src/components/Auth/Login'
import GetMockStore from '../../helpers/mockReduxStore'
import GetMockADAL from '../../helpers/mockAdal'
import * as authActions from '../../../src/actions/authActions'



function setup({isLoggedIn, loginInProgress, signInAutomatically, dispatch, ADAL}) {
    let props = {
        isLoggedIn,
        loginInProgress,
        signInAutomatically,
        ADAL,
        dispatch
    }

    let renderer = TestUtils.createRenderer()
    renderer.render(<Login {...props}/>)
    let output = renderer.getRenderOutput()

    return {
        output,
        renderer
    }
}

const mocks = (ADALWatcher) => {
    const mockStore = GetMockStore()
    return {
        mockStore,
        mockADAL: GetMockADAL(ADALWatcher)(mockStore.dispatch)
    }
}

const loggedIn = ({mockStore, mockADAL}) => ({
    isLoggedIn: true,
    loginInProgress: false,
    signInAutomatically: true,
    dispatch: mockStore.dispatch,
    ADAL: mockADAL
})

const loginInProgress = ({mockStore, mockADAL}) => ({
    isLoggedIn: false,
    loginInProgress: true,
    signInAutomatically: true,
    dispatch: mockStore.dispatch,
    ADAL: mockADAL
})

const loggedOutWithSignIn = ({mockStore, mockADAL}) => ({
    isLoggedIn: false,
    loginInProgress: false,
    signInAutomatically: true,
    dispatch: mockStore.dispatch,
    ADAL: mockADAL
})

const loggedOutNoSignIn = ({mockStore, mockADAL}) => ({
    isLoggedIn: false,
    loginInProgress: false,
    signInAutomatically: false,
    dispatch: mockStore.dispatch,
    ADAL: mockADAL
})

describe('Login', function test () {
    beforeEach( () => {
        this.loggedInADAL = {}
        this.loginInProgressADAL = {}
        this.loggedOutWithSignInADAL = {}
        this.loggedOutNoSignInADAL = {}

        this.loggedInMocks = mocks(this.loggedInADAL)
        this.loginInProgressMocks = mocks(this.loginInProgressADAL)
        this.loggedOutWithSignInMocks = mocks(this.loggedOutWithSignInADAL)
        this.loggedOutNoSignInMocks = mocks(this.loggedOutNoSignInADAL)

        this.loggedInCase = loggedIn(this.loggedInMocks)
        this.loginInProgressCase = loginInProgress(this.loginInProgressMocks)
        this.loggedOutWithSignInCase = loggedOutWithSignIn(this.loggedOutWithSignInMocks)
        this.loggedOutNoSignInCase = loggedOutNoSignIn(this.loggedOutNoSignInMocks)

        LoginComponentDidMount(this.loggedInCase)
        LoginComponentDidMount(this.loginInProgressCase)
        LoginComponentDidMount(this.loggedOutWithSignInCase)
        LoginComponentDidMount(this.loggedOutNoSignInCase)

        this.loggedInComponent = setup(this.loggedInCase).output
        this.loginInProgressComponent = setup(this.loginInProgressCase).output
        this.loggedOutWithSignInComponent = setup(this.loggedOutWithSignInCase).output
        this.loggedOutNoSignInComponent = setup(this.loggedOutNoSignInCase).output
    })

    it('Should attempt to log in when user is signed out and has signInAutomatically as true', () => {
        expect(this.loggedOutWithSignInADAL.loginCalled).to.be.true
        expect(this.loggedOutWithSignInMocks.mockStore.getActions()[0].type).to.equal(authActions.loginInProgress().type)
    })

    it('Should not attempt to log in when user is signed in, a login is already in progress, or signInAutomatically is false', () => {
        expect(this.loggedInADAL.loginCalled).to.not.exist
        expect(this.loggedInMocks.mockStore.getActions()[0]).to.not.exist

        expect(this.loginInProgressADAL.loginCalled).to.not.exist
        expect(this.loginInProgressMocks.mockStore.getActions()[0]).to.not.exist

        expect(this.loggedOutNoSignInADAL.loginCalled).to.not.exist
        expect(this.loggedOutNoSignInMocks.mockStore.getActions()[0]).to.not.exist
    })

    it('Should always render a signin button', () => {
        expect(this.loggedInComponent.type).to.equal('button')
        expect(this.loginInProgressComponent.type).to.equal('button')
        expect(this.loggedOutWithSignInComponent.type).to.equal('button')
        expect(this.loggedOutNoSignInComponent.type).to.equal('button')
    })

    it('Should always attempt to log in when signin button is clicked', () => {
        this.loggedInComponent.props.onClick()
        expect(this.loggedInADAL.loginCalled).to.be.true
        expect(this.loggedInMocks.mockStore.getActions()[0].type).to.equal(authActions.loginInProgress().type)

        this.loginInProgressComponent.props.onClick()
        expect(this.loggedInADAL.loginCalled).to.be.true
        expect(this.loggedInMocks.mockStore.getActions()[0].type).to.equal(authActions.loginInProgress().type)

        this.loggedOutWithSignInComponent.props.onClick()
        expect(this.loggedInADAL.loginCalled).to.be.true
        expect(this.loggedInMocks.mockStore.getActions()[0].type).to.equal(authActions.loginInProgress().type)

        this.loggedOutNoSignInComponent.props.onClick()
        expect(this.loggedInADAL.loginCalled).to.be.true
        expect(this.loggedInMocks.mockStore.getActions()[0].type).to.equal(authActions.loginInProgress().type)
    })
})

const inputStateDefault = {
    auth: {
        isLoggedIn: true,
        loginInProgress: true,
        signInAutomatically: true
    }
}

const ownPropsDefault = {
    ADAL: GetMockADAL()
}

const expectedResultFromDefault = {
    isLoggedIn: true,
    loginInProgress: true,
    signInAutomatically: true
}

describe('LoginMapStateToProps', function test () {
    it('Should correctly generate an args object from state', () => {
        const result = mapStateToProps(inputStateDefault, ownPropsDefault)

        expect(result.isLoggedIn).to.equal(expectedResultFromDefault.isLoggedIn)
        expect(result.loginInProgress).to.equal(expectedResultFromDefault.loginInProgress)
        expect(result.signInAutomatically).to.equal(expectedResultFromDefault.signInAutomatically)
    })
})
