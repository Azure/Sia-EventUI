'use strict'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]

const GetMockStore = (initialState = {}) => configureStore(middlewares)(initialState)

export default GetMockStore