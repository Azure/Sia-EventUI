import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native

import * as timePreferencesActions from 'actions/timePreferencesActions'

// export const defaultAvailableTimezones = [
//   { displayName: 'Pacific Time', ianaZoneName: 'America/Los_Angeles' },
//   { displayName: 'India Standard Time', ianaZoneName: 'Asia/Kolkata' },
//   { displayName: 'UTC', ianaZoneName: 'UTC' }
// ]

const defaultDisplayTimezones = ['UTC']

export const timePreferencesReducer = (state = defaultDisplayTimezones, action) => {
  switch (action.type) {
    case timePreferencesActions.SET_DISPLAY_TIMEZONES:
      return action.timezoneIanaNames
    default:
      return state
  }
}

export default timePreferencesReducer
