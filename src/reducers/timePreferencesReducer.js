
import * as timePreferencesActions from 'actions/timePreferencesActions'

export const defaultAvailableTimezones = [
  { displayName: 'Pacific Time', ianaZoneName: 'America/Los_Angeles' },
  { displayName: 'India Standard Time', ianaZoneName: 'Asia/Kolkata' },
  { displayName: 'UTC', ianaZoneName: 'UTC' }
]

const defaultDisplayTimezones = ['UTC']

export const timePreferencesReducer = (state = defaultDisplayTimezones, action) => {
  switch (action.type) {
    case timePreferencesActions.ADD_DISPLAY_TIMEZONE:
      return state.includes(action.timezoneIanaName)
        ? state
        : state.concat(action.timezoneIanaName)
    case timePreferencesActions.REMOVE_DISPLAY_TIMEZONE:
      return state.includes(action.timezoneIanaName)
        ? state.filter(timezoneIanaName => timezoneIanaName !== action.timezoneIanaName)
        : state
    default:
      return state
  }
}

export default timePreferencesReducer
