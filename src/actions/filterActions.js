import queryString from 'query-string'

const getFilterEventTypes = (filters) => {
    if (filters.eventTypes) {
        if (Array.isArray(filters.eventTypes) && filters.eventTypes.length > 0) {
            filters.eventTypes = filters.eventTypes.map(eventType => generateFilterObject(eventType))
        }
        else {
            filters.eventTypes = [generateFilterObject(filters.eventTypes)]
        }
    }
    return filters
}

const generateFilterObject = (eventTypeId) => {
    return {id: parseInt(eventTypeId), name: 'unknown'}
}

export const getFilterFromUrl = (urlFilterInfo) => {
    const filterInput = queryString.parse(urlFilterInfo)
    const filter = getFilterEventTypes(filterInput)
    filter.fromUrl = Object.keys(filterInput).length > 0 ? true : false
    filter.validated = filter.fromUrl ? false : true
    return filter
}