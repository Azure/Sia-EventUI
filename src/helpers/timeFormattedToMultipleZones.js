import { DateTime } from 'luxon'
import _ from 'underscore'

const zones = [
  { shortname: 'PT', ianaZone: 'America/Los_Angeles'},  // PST https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  { shortname: 'IST', ianaZone: 'Asia/Kolkata'},         // India's IANA zone https://en.wikipedia.org/wiki/Time_in_India
  { shortname: 'GMT', ianaZone: 'Etc/GMT'}
]

const format = Object.assign(DateTime.DATE_SHORT, DateTime.TIME_24_WITH_SECONDS)

export const timeFormattedToMultipleZones = (time, timezones = zones) => {
  let dateFormat = { year: "numeric", month: "numeric", day: "numeric" }
  let convertTimeToZone = (timepoint) => {
    timepoint.timeInZone = time.setZone(timepoint.ianaZone)
    return timepoint
  }

  let timeInMultipleZones = _.chain(timezones)
      .map(convertTimeToZone)
      .groupBy((timepoint) => timepoint.timeInZone.toLocaleString(dateFormat))
      .map((dateGroup) => {
        return _.map(dateGroup, (timepoint, index) => {
          debugger
          return index === 0 ?
                  timepoint.timeInZone.toLocaleString(format) + ' ' + timepoint.shortname :
                  timepoint.timeInZone.toLocaleString(DateTime.TIME_24_WITH_SECONDS) + ' ' + timepoint.shortname
        }).join(', ')
      })
      .compact()
      .value()
      .join('; ')
  // let timeInMultipleZones = _.chain(timezones).map(convertTimeToZone).value().join('; ')
debugger
  return timeInMultipleZones
}

export default timeFormattedToMultipleZones

// () => {
//   timeInZone.toLocaleString(format)
//
// return formatted_time + ' ' + timezone.shortname
// }

// dateGroup) => {
//   return _.map(dateGroup, (datetime, date) => {
//     debugger
//     return _.first(dateGroup[date]) === datetime ?
//               datetime.toLocaleString(format) :
//               datetime.toLocaleString(DateTime.TIME_24_WITH_SECONDS)
//   }).join(' lejoiner ')
// }
