import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import establishSignalRConnection from './services/signalRService'
import { ListenForScreenSize } from './actions/styleActions'
import incidentApp from './reducers'
import { persistStore } from 'redux-persist'

const reducer = combineReducers(incidentApp)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
export const persistor = persistStore(store)

establishSignalRConnection(store.dispatch)

ListenForScreenSize(window, store)

