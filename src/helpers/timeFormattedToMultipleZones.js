import { DateTime } from 'luxon'
import _ from 'underscore'

// PST https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
// India's IANA zone https://en.wikipedia.org/wiki/Time_in_India
const zones = [
  { shortname: 'PT', ianaZone: 'America/Los_Angeles' },
  { shortname: 'IST', ianaZone: 'Asia/Kolkata' },
  { shortname: 'GMT', ianaZone: 'Etc/GMT' }
]

const dateFormat = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
}

const timeAndDateformat = Object.assign(dateFormat, DateTime.TIME_24_WITH_SECONDS)

export const timeFormattedToMultipleZones = (time, timezones = zones) => {
  if (!time) { return '' }

  let convertTimeToZone = (timepoint) => {
    timepoint.timeInZone = time.setZone(timepoint.ianaZone)
    return timepoint
  }

  let timeAndDate = (timepoint, index) => {
    let format = index === 0 ? timeAndDateformat : DateTime.TIME_24_WITH_SECONDS

    return timepoint.timeInZone.toLocaleString(format) + ' ' + timepoint.shortname
  }

  let transformToTimeAndDateString = (dateGroup) => _.map(dateGroup, timeAndDate).join(', ')
  let dateForTimepoint = (timepoint) => timepoint.timeInZone.toLocaleString(DateTime.DATE_SHORT)

  let timeInMultipleZones = _.chain(timezones)
      .map(convertTimeToZone)
      .groupBy(dateForTimepoint)
      .map(transformToTimeAndDateString)
      .compact()
      .value()
      .join('; ')

  return timeInMultipleZones
}

export default timeFormattedToMultipleZones
