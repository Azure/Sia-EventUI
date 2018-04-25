import { DateTime } from 'luxon'

// PST https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
// India's IANA zone https://en.wikipedia.org/wiki/Time_in_India
export const zones = [
  { shortname: 'PT', ianaZone: 'America/Los_Angeles' },
  { shortname: 'IST', ianaZone: 'Asia/Kolkata' },
  { shortname: 'UTC', ianaZone: 'UTC' }
]

const dateFormat = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}

export const timeAndDateFormat = Object.assign(dateFormat, DateTime.TIME_24_WITH_SECONDS)
