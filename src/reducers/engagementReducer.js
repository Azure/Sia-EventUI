import * as engagementActions from '../actions/engagementActions'
import * as incidentActions from '../actions/incidentActions'
import { oneToManyMap, mergeOneToManyMaps } from './reducerHelpers'

const defaultEngagementCollections = {
    engagementIdToEngagement: {},
    incidentIdToEngagements: {}
}

const addEngagementToState = (state, engagement) => {
    return addEngagementsToState(state, [engagement])
}

const addEngagementsToState = (state, engagements) => {
    var originalIncidentIdToEngagements = { ...state.incidentIdToEngagements }
    var newIncidentIdToEngagements = oneToManyMap(engagements, (engagement) => engagement.incidentId)
    
    var engagementIdToEngagement = {...state.engagementIdToEngagement}
    engagements.forEach(engagement => engagementIdToEngagement[engagement.id] = engagement)
    return {
        engagementIdToEngagement,
        incidentIdToEngagements: mergeOneToManyMaps(originalIncidentIdToEngagements, newIncidentIdToEngagements)
    }
}

export const maps = (state = defaultEngagementCollections, action) => {
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