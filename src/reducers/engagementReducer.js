import paginated from 'paginated-redux'
import * as engagementActions from '../actions/engagementActions'
import * as incidentActions from '../actions/incidentActions'
import { mergeWithOverwrite } from './reducerHelpers/merge'

const defaultEngagementCollection = []


const addEngagementToState = (state, engagement) => {
    return addEngagementsToState(state, [engagement])
}

const addEngagementsToState = (state, engagements) => {
    return mergeWithOverwrite(state, engagements)
}

export const list = (state = defaultEngagementCollection, action) => {
    switch(action.type){
        case incidentActions.RECEIVE_INCIDENT:
            return addEngagementsToState(state, action.incident.engagements)
        case incidentActions.RECEIVE_INCIDENTS:
        case incidentActions.FETCH_INCIDENTS_BY_TICKET_ID_SUCCESS:
            return addEngagementsToState(state,
                action.incidents
                .map(incident => incident.engagements)
                .reduce( (a, b) => a.concat(b), [] )
            )
        case engagementActions.ENGAGE_SUCCESS:
        case engagementActions.DISENGAGE_SUCCESS:
            return addEngagementToState(state, action.engagement)
        default:
            return state
    }
}

export const engagements = paginated(list, engagementActions.pagination.types)

export default engagements