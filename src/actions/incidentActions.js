import { DateTime } from 'luxon'
import { reduxBackedPromise } from 'actions/actionHelpers'
import * as ticketActions from 'actions/ticketActions'

export const REQUEST_INCIDENT = 'REQUEST_INCIDENT'
export const RECEIVE_INCIDENT = 'RECEIVE_INCIDENT'
export const RECEIVE_INCIDENT_FAILURE = 'RECEIVE_INCIDENT_FAILURE'
export const REQUEST_INCIDENTS = 'REQUEST_INCIDENTS'
export const RECEIVE_INCIDENTS = 'RECEIVE_INCIDENTS'
export const RECEIVE_INCIDENTS_FAILURE = 'RECEIVE_INCIDENTS_FAILURE'
export const UPDATE_INCIDENT_CREATION_INPUT = 'UPDATE_INCIDENT_CREATION_INPUT'
export const TRY_CREATE_INCIDENT = 'TRY_CREATE_INCIDENT'
export const CREATE_INCIDENT_SUCCESS = 'CREATE_INCIDENT_SUCCESS'
export const CREATE_INCIDENT_FAILURE = 'CREATE_INCIDENT_FAILURE'
export const REQUEST_INCIDENT_BY_TICKET_ID = 'REQUEST_INCIDENT_BY_TICKET_ID'
export const FETCH_INCIDENTS_BY_TICKET_ID_SUCCESS = 'FETCH_INCIDENTS_BY_TICKET_ID_SUCCESS'
export const FETCH_INCIDENTS_BY_TICKET_ID_FAILURE = 'FETCH_INCIDENTS_BY_TICKET_ID_FAILURE'

export const fetchIncident = incidentId => reduxBackedPromise(
    ['incidents/' + incidentId],
    getIncidentActionSet(incidentId)
)

export const fetchIncidentsByTicketId = (ticketId) => reduxBackedPromise(
    ['tickets/' + ticketId],
    getIncidentsByTicketIdActionSet(ticketId))

export const fetchIncidents = () => reduxBackedPromise(
    ['incidents/'],
    getIncidentsActionSet
)

export const postIncident = (ticketId, ticketSystem) => reduxBackedPromise(
    postIncidentFetchArgs(ticketId, ticketSystem),
    createIncidentActionSet(ticketId, ticketSystem),
    'POST'
)

export const getIncidentActionSet = (incidentId) => ({
  try: () => ({
    type: REQUEST_INCIDENT,
    id: incidentId
  }),

  succeed: (incident) => (dispatch) => {
    dispatch({
      type: RECEIVE_INCIDENT,
      incident,
      id: incidentId
    })
  },

  fail: (failureReason) => ({
    type: RECEIVE_INCIDENT_FAILURE,
    error: failureReason
  })
})

export const getIncidentsByTicketIdActionSet = (ticketId) => ({
  try: () => ({
    type: REQUEST_INCIDENT_BY_TICKET_ID,
    ticketId
  }),

  succeed: (incidents) => ({
    type: FETCH_INCIDENTS_BY_TICKET_ID_SUCCESS,
    ticketId,
    incidents
  }),

  fail: (error) => ({
    type: FETCH_INCIDENTS_BY_TICKET_ID_FAILURE,
    ticketId,
    error
  })
})

export const fetchIncidentIfNeeded = (incident, ticketId, ticket, ticketSystem, preferences, incidentIsFetching, incidentIsError) =>
(dispatch) =>
(incidentIsFetching || incidentIsError)
    ? null // No refresh needed
    : basicIncidentInfoLoaded(incident)
            ? fullIncidentInfoLoaded(incident, ticket, ticketSystem, preferences)
                ? null // No refresh needed
                : dispatch(fetchIncident(incident.id))
            : ticketId
                ? dispatch(fetchIncidentsByTicketId(ticketId))
                : dispatch(fetchIncidents())

const basicIncidentInfoLoaded = (incident) => incident && incident.id
const fullIncidentInfoLoaded = (incident, ticket, ticketSystem, preferences) => !incident.IsFetching &&
ticketSystem &&
isTicketInfoRecent(ticket, preferences)

const isTicketInfoRecent = (ticket, preferences) => ticket &&
ticket.lastRefresh &&
DateTime.local(ticket.lastRefresh).isAfter(DateTime.local().subtract(preferences.refreshIntervalInSeconds, 'seconds'))

export const getIncidentsActionSet = ({
  try: () => ({
    type: REQUEST_INCIDENTS
  }),

  succeed: (incidents) => ({
    type: RECEIVE_INCIDENTS,
    incidents,
    receivedAt: DateTime.local()
  }),

  fail: (error) => ({
    type: RECEIVE_INCIDENTS_FAILURE,
    error
  })
})

export const createIncidentActionSet = (ticketId, ticketSystem) => ({
  try: () => ({
    type: TRY_CREATE_INCIDENT,
    ticketId,
    ticketSystem
  }),

  succeed: (incident) => ({
    type: CREATE_INCIDENT_SUCCESS,
    incident
  }),

  fail: (reason) => ({
    type: CREATE_INCIDENT_FAILURE,
    reason
  })
})

const postIncidentFetchArgs = (ticketId, ticketSystem) => {
  return [
    'incidents/',
    {
      title: 'placeholder',
      primaryTicket: {
        originId: ticketId,
        ticketingSystemId: ticketSystem.id
      }
    }
  ]
}

export const updateIncidentCreationInput = (input) => ({
  type: UPDATE_INCIDENT_CREATION_INPUT,
  input
})

export const duplicateIncident = (ticketId) => (dispatch) => {
  dispatch(createIncidentActionSet(ticketId, {}).fail({message: 'An incident already exists for this ticket'}))
  dispatch(ticketActions.updateTicketQuery(ticketId))
}
