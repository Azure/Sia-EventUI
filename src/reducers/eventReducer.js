import { combineReducers } from 'redux'
import paginated from 'paginated-redux'
import * as eventActions from '../actions/eventActions'
import { mergeWithOverwrite } from './reducerHelpers'

const defaultEventCollection = []

const defaultFilter = {
    incidentId: null,
    eventTypeId: null,
    occurred: null,
    eventFired: null,
    dataKey: null,
    dataValue: null
}


const makeSearchable = (event) => ({
    ...event,
    filterableIncidentId: event.incidentId.toString()
})

const pageArgs = {
    defaultPage: 1,
    defaultSortOrder: 'desc',
    defaultSortBy: 'occurred',
    defaultPer: 10,
    defaultFilter: '',
    defaultTotal: 0
}

const addEventsToState = (state, events) => mergeWithOverwrite(state, events.map(event => makeSearchable(event)))

export const list = (state = defaultEventCollection, action) => {
    switch(action.type){
        case eventActions.RECEIVE_EVENT:
        case eventActions.POST_EVENT_SUCCEED:
            return addEventsToState(state, [action.event])
        case eventActions.RECEIVE_EVENTS:
            return addEventsToState(state, action.events)
        default:
            return state
    }
}


export const filter = (state = defaultFilter, action) => {
    switch(action.type) {
        case eventActions.CHANGE_EVENT_FILTER:
            return Object.assign({}, action.filter)
        case eventActions.ADD_FILTER_ON_EVENT_TYPE:            
            return {
                ...state
                // filterSearchField: ' ',
                // eventTypes: state.eventTypes.concat({id: action.id, name: action.name})
                // eventTypes: Object.assign({}, filter.e)
            }
        case eventActions.REMOVE_EVENT_FILTER:
            if (!state.eventTypes.map(e=> e.id).includes(action.id))
            {
                return state
            }
            return {
                ...state,
                eventTypes: state.eventTypes.filter(eventType => eventType.id !== action.id)
            }
        default:
            return state
    }
}

export const pages = paginated(list, eventActions.pagination.types, pageArgs)

export default combineReducers({
    pages,
    filter
})