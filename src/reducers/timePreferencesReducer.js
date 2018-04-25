import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native

import * as timePreferencesActions from 'actions/timePreferencesActions'

const defaultDisplayTimezones = ['UTC']

export const displayTimezonesReducer = (state = defaultDisplayTimezones, action) => {
  switch (action.type) {
    case timePreferencesActions.SET_DISPLAY_TIMEZONES:
      // Require that one timezone is always configured. Force the default
      // timezone if the user deselects all timezones.
      if (action.timezoneIanaNames.length <= 0) {
        return defaultDisplayTimezones
      }
      return action.timezoneIanaNames
    default:
      return state
  }
}

const persistConfigs = {
  key: 'timePreferences',
  storage
}
export default persistReducer(
  persistConfigs,
  combineReducers({displayTimezones: displayTimezonesReducer})
)
