import paginated from 'paginated-redux'
import * as eventActions from '../actions/eventActions'
import * as incidentActions from '../actions/incidentActions'
import { mergeWithOverwrite } from './reducerHelpers'

const defaultEventCollection = []

const addEventsToState = (state, Events) => {
    return mergeWithOverwrite(state, Events)
}

export const list = (state = defaultEventCollection, action) => {
    switch(action.type){
        case incidentActions.RECEIVE_INCIDENT:
            return addEventsToState(state, action.incident.events)
        case incidentActions.RECEIVE_INCIDENTS:
        case incidentActions.FETCH_INCIDENTS_BY_TICKET_ID_SUCCESS:
            return addEventsToState(state,
                action.incidents
                .map(incident => incident.events)
                .reduce( (a, b) => a.concat(b), [] )
            )
        default:
            return state
    }
}

export const events = paginated(list, eventActions.pagination.types)

export default events