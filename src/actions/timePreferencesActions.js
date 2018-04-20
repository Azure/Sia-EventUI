export const SET_DISPLAY_TIMEZONES = 'SET_DISPLAY_TIMEZONES'

export const setDisplayTimezones = (timezoneIanaNames) => ({
  type: SET_DISPLAY_TIMEZONES,
  timezoneIanaNames
})