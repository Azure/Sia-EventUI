export const ADD_DISPLAY_TIMEZONE = 'ADD_DISPLAY_TIMEZONE'
export const REMOVE_DISPLAY_TIMEZONE = 'REMOVE_DISPLAY_TIMEZONE'

export const addDisplayTimezone = (timezoneIanaName) => ({
  type: ADD_DISPLAY_TIMEZONE,
  timezoneIanaName
})

export const removeDisplaytimezone = (timezoneIanaName) => ({
  type: REMOVE_DISPLAY_TIMEZONE,
  timezoneIanaName
})