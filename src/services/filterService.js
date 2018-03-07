import queryString from 'query-string'

export const serializeFiltersForUrl = (filters) => {
  if (!filters) {
    return ''
  }
  const eventTypes = serializeEventTypesForQuery(filters.eventTypes)
  const filterTokens = Object.entries(filters)
      .filter(filter => filter[0] !== 'incidentId' &&
        filter[0] !== 'eventTypes' &&
        filter[0] !== 'fromUrl' &&
        filter[0] !== 'ticketId')
      .map(filter => `${filter[0]}=${filter[1]}`)
  const finalFilterTokens = eventTypes
      ? filterTokens.concat(eventTypes)
      : filterTokens
  return finalFilterTokens && finalFilterTokens.length > 0 ? '?' + finalFilterTokens.join('&')
      : ''
}

export const serializeEventTypesForQuery = (eventTypes) => {
  if (!eventTypes || eventTypes.length === 0) {
    return ''
  }
  return eventTypes.map(eventType => `eventTypes=${eventType}`).join('&')
}

export const getFilterFromUrl = (urlFilterInfo) => {
  let filter = queryString.parse(urlFilterInfo)
  if (typeof (filter) !== 'object' || !filter.eventTypes) {
    return null
  }
  if (!Array.isArray(filter.eventTypes)) {
    filter.eventTypes = [filter.eventTypes]
  }
  filter.eventTypes = filter.eventTypes.map(e => parseInt(e))
  return filter
}

export const getUrlFromFilter = (history, filter) => {
  if (filter && filter.eventTypes) {
    history.push(generateUrl(history, filter))
  }
}

export const getUrlFromUncorrelatedFilter = (history, filter) => {
  let filterValue
  if (filter) {
    if (filter.eventTypes) {
      filterValue += serializeEventTypesForQuery(filter.eventTypes)
    }
    const timeFilters = `startTime=${filter.startTime}&endTime=${filter.endTime}`
    filterValue = filter.eventTypes ? filterValue + '&' + timeFilters : timeFilters
    history.push('/events/' + '?' + filterValue)
  }
}

export const generateUrl = (history, filter) => {
  return /tickets/ + filter.ticketId + '?' + serializeEventTypesForQuery(filter.eventTypes)
}

export const findEventTypeInRef = (referenceData) => (eventType) => {
  return referenceData.hasOwnProperty(eventType)
      ? referenceData[eventType]
      : { id: eventType, name: 'unknown' }
}
