import { DateTime } from 'luxon'
import _ from 'underscore'

const zones = [
  { shortname: 'PT', ianaZone: 'America/Los_Angeles'},  // PST https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  { shortname: 'IST', ianaZone: 'Asia/Kolkata'},         // India's IANA zone https://en.wikipedia.org/wiki/Time_in_India
  { shortname: 'GMT', ianaZone: 'Etc/GMT'}
]
const dateFormat = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}
const timeAndDateformat = Object.assign(dateFormat, DateTime.TIME_24_WITH_SECONDS)

export const timeFormattedToMultipleZones = (time, timezones = zones) => {
  if ( !time ) { return '' }
  let dateFormat = { year: "numeric", month: "numeric", day: "numeric" }
  let convertTimeToZone = (timepoint) => {
    timepoint.timeInZone = time.setZone(timepoint.ianaZone)
    return timepoint
  }

  let timeAndDate = (timepoint, index) => {
    let format = index === 0 ? timeAndDateformat : DateTime.TIME_24_WITH_SECONDS

    return timepoint.timeInZone.toLocaleString(format) + ' ' + timepoint.shortname
  }

  let functionName = (dateGroup) => _.map(dateGroup, timeAndDate).join(', ')

  let timeInMultipleZones = _.chain(timezones)
      .map(convertTimeToZone)
      .groupBy((timepoint) => timepoint.timeInZone.toLocaleString(dateFormat))
      .map(functionName)
      .compact()
      .value()
      .join('; ')

  return timeInMultipleZones
}

export default timeFormattedToMultipleZones
