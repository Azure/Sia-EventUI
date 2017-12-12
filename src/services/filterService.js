import queryString from 'query-string'
import { mockEventTypes }  from '../components/elements/mockEventTypes'

const referenceData = mockEventTypes

const getUrlFilterDataFromReferenceData = (filters, referenceData) => {
    if(filters.eventTypes) {
        if (Array.isArray(filters.eventTypes) && filters.eventTypes.length > 0) {
            filters.eventTypes = filters.eventTypes.map(eventType => findEventTypeInRef(eventType, referenceData))
        }
        else {
            filters.eventTypes = [findEventTypeInRef(filters.eventTypes, referenceData)]
        }
    }
    return filters
}
const findEventTypeInRef = (id, referenceData) => {
    const eventType = referenceData.find(refEventType => refEventType.id === parseInt(id))
    return eventType ? eventType : {id: id, name: 'unknown'}
}

export const getFilter = (urlFilterInfo, referenceData) => {
    const filterInput = queryString.parse(urlFilterInfo)
    const filtersWithNames = getUrlFilterDataFromReferenceData(filterInput, referenceData)
    return filtersWithNames
}