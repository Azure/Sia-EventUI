import { combineReducers } from 'redux'
import * as incidentActions from 'actions/incidentActions'
import { ENGAGE_SUCCESS, DISENGAGE_SUCCESS } from 'actions/engagementActions'
import buildFetching from 'reducers/reducerHelpers/fetching'
import buildError from 'reducers/reducerHelpers/error'

const defaultIncidents = []

const mapIncidents = (incidents) => {
  let incidentsMap = {}
  incidents.map(incident => { incidentsMap[incident.id] = incident })
  return incidentsMap
}

const defaultIncidentMap = mapIncidents(defaultIncidents)

const startFetch = {
  IsFetching: true
}

const endFetch = {
  IsFetching: false
}

const addIncidentToState = (state, incident, incidentPropertyUpdates) => {
  return addIncidentsToState(state, [incident], incidentPropertyUpdates)
}

const addIncidentsToState = (state, incidents, incidentPropertyUpdates) => {
  let newState = {...state}
  incidents.map(incident => { newState[incident.id] = Object.assign({}, incident, incidentPropertyUpdates) })
  return newState
}

export const map = (state = defaultIncidentMap, action) => {
  switch (action.type) {
    case incidentActions.RECEIVE_INCIDENT:
    case incidentActions.CREATE_INCIDENT_SUCCESS:
      return addIncidentToState(state, action.incident, endFetch)
    case incidentActions.RECEIVE_INCIDENT_FAILURE:
      return addIncidentToState(state, {id: action.id, error: action.error}, endFetch)
    case incidentActions.RECEIVE_INCIDENTS:
    case incidentActions.FETCH_INCIDENTS_BY_TICKET_ID_SUCCESS:
      return addIncidentsToState(state, action.incidents, endFetch)
    case incidentActions.REQUEST_INCIDENT:
      const localIncidentRecord = state[action.incidentId]
      return addIncidentToState(state, localIncidentRecord || { id: action.incidentId }, startFetch)
    case incidentActions.REQUEST_INCIDENTS:
      return addIncidentsToState(state, Object.values(state), startFetch)
    case ENGAGE_SUCCESS:
    case DISENGAGE_SUCCESS:
      const existingIncident = state[action.engagement.incidentId]
      return addIncidentToState(state, existingIncident, {
        engagements: Array
                                                    .from(existingIncident.engagements)
                                                    .filter(engagement => engagement.id !== action.engagement.id)
                                                    .concat(action.engagement)
      })
    default:
      return state
  }
}

const defaultCreationState = {
  input: ''
}

export const creation = (state = defaultCreationState, action) => {
  switch (action.type) {
    case incidentActions.UPDATE_INCIDENT_CREATION_INPUT:
      return {
        ...state,
        input: action.input
      }
    case incidentActions.TRY_CREATE_INCIDENT:
      return {
        ...state,
        error: null
      }
    case incidentActions.CREATE_INCIDENT_FAILURE:
      return {
        ...state,
        error: action.reason
      }
    case incidentActions.CREATE_INCIDENT_SUCCESS:
      return {
        input: '',
        error: null
      }
    default:
      return state
  }
}

const actionSetByIncidentId = {
  try: incidentActions.REQUEST_INCIDENT,
  succeed: incidentActions.RECEIVE_INCIDENT,
  fail: incidentActions.RECEIVE_INCIDENT_FAILURE
}

const fetchingByIncidentId = buildFetching(actionSetByIncidentId)

const errorByIncidentId = buildError(actionSetByIncidentId)

const actionSetByTicketId = {
  try: incidentActions.REQUEST_INCIDENT_BY_TICKET_ID,
  succeed: incidentActions.FETCH_INCIDENTS_BY_TICKET_ID_SUCCESS,
  fail: incidentActions.FETCH_INCIDENTS_BY_TICKET_ID_FAILURE
}

const fetchingByTicketId = buildFetching(actionSetByTicketId,
    [],
    (action) => action.ticketId
)

const errorByTicketId = buildError(actionSetByTicketId,
    [],
    (action) => action.ticketId
)

const incidentReducer = combineReducers({
  map,
  creation,
  fetchingByIncidentId,
  errorByIncidentId,
  fetchingByTicketId,
  errorByTicketId
})

export default incidentReducer

//Selectors

export const getIncident = (state) => (incidentId) => state.incidents.map[incidentId]
