import { combineReducers } from 'redux'
import paginated from 'paginated-redux'
import * as eventActions from '../actions/eventActions'
import { mergeWithOverwrite } from './reducerHelpers'
import { mockEventTypes }  from '../components/elements/mockEventTypes'
import {filterServiceActions} from '../services/filterService'

const defaultEventCollection = []

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


export const filter = (defaultFilter) => (state = defaultFilter, action) => {
    switch(action.type) {
        case eventActions.CHANGE_EVENT_FILTER:
            return Object.assign({eventTypes: [], ticketId: null}, action.filter)
        case eventActions.UPDATE_FILTER_SEARCH_BOX:
            return {
                ...state, 
                filterSearchField: action.searchText
            }
        default:
            return state
    }
}

export const pages = paginated(list, eventActions.pagination.types, pageArgs)

export default (defaultFilter) => combineReducers({
    pages,
    filter: filter(defaultFilter)
})