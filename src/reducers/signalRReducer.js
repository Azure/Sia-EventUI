import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native

import * as signalRActions from 'actions/signalRActions'

export const connectionStatuses = {
  notEstablished: 'notEstablished',
  connecting: 'connecting',
  disconnected: 'disconnected',
  connected: 'connected',
  error: 'error'
}

const connectionStatusDefault = {
  connectionStatus: connectionStatuses.notEstablished
}

export const connectionStatusReducer = (state = connectionStatusDefault, action) => {
  switch (action.type) {
    case signalRActions.ESTABLISH_CONNECTION_TRY:
      return {
        ...state,
        connectionStatus: connectionStatuses.connecting
      }
    case signalRActions.ESTABLISH_CONNECTION_FAIL:
      return {
        ...state,
        connectionStatus: connectionStatuses.error,
        connectionError: action.error
      }
    case signalRActions.ESTABLISH_CONNECTION_SUCCEED:
      return {
        ...state,
        connectionStatus: connectionStatuses.connected,
        connectionError: null,
        disconnectReason: null
      }
    case signalRActions.CONNECTION_CLOSED:
      return {
        ...state,
        connectionStatus: connectionStatuses.disconnected,
        disconnectReason: action.error
      }
    default:
      return state
  }
}

const messageStatusDefault = {
  pendingMessages: 0
}

export const messageStatusReducer = (state = messageStatusDefault, action) => {
  switch (action.type) {
    case signalRActions.RECEIVE_MESSAGE:
      return {
        ...state,
        pendingMessages: state.pendingMessages ? state.pendingMessages + 1 : 1
      }
    case signalRActions.ACKNOWLEDGE_MESSAGES:
      return {
        ...state,
        pendingMessages: 0
      }
    default:
      return state
  }
}

export const filterPreferencesReducer = (defaultEventFilterPreference) => (state = { eventFilterType: defaultEventFilterPreference }, action) => {
  switch (action.type) {
    case signalRActions.UPDATE_FILTER_PREFERENCE_EVENTS:
      if (action.filterType === state.eventFilterType ||
        !Object.values(signalRActions.filterTypes).map(ft => ft.value).includes(action.filterType)) {
        // if no change or invalid filter type
        return state
      }
      return {
        ...state,
        eventFilterType: action.filterType
      }
    default:
      return state
  }
}

export default (defaultEventFilterPreference) => combineReducers({
  connectionStatus: connectionStatusReducer,
  messageStatus: messageStatusReducer,
  filterPreferences: persistReducer({
    key: 'signalR/filterPreferences',
    storage
  },
    filterPreferencesReducer(defaultEventFilterPreference)
  )
})
