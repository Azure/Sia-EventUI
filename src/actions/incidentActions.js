import moment from 'moment'
import { authenticatedFetch, authenticatedPost } from '../services/authenticatedFetch'
import { reduxBackedPromise } from './actionHelpers'
import * as ticketActions from './ticketActions'
import * as eventActions from './eventActions'

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

export const incidentActions = ({
    fetchIncident: incidentId => reduxBackedPromise(
        authenticatedFetch,
        ['incidents/' + incidentId],
        getIncidentActionSet(incidentId)
    ),

    fetchIncidentsByTicketId: (ticketId) => reduxBackedPromise(
        authenticatedFetch,
        ['tickets/' + ticketId],
        getIncidentsByTicketIdActionSet(ticketId),
    ),

    fetchIncidents: () => reduxBackedPromise(
        authenticatedFetch,
        ['incidents/'],
        getIncidentsActionSet
    ),

    postIncident: (ticketId, ticketSystem) => reduxBackedPromise(
        authenticatedPost,
        postIncidentFetchArgs(ticketId, ticketSystem),
        createIncidentActionSet(ticketId, ticketSystem)
    )
})

export const getIncidentActionSet = (incidentId) => ({
    try: () => ({
        type: REQUEST_INCIDENT,
        incidentId
    }),

    succeed: (incident) => (dispatch) => {
        dispatch({
            type: RECEIVE_INCIDENT,
            incident
        })

        dispatch(eventActions.fetchEvents(incidentId))
    },

    fail: (failureReason) => ({
        type: RECEIVE_INCIDENT_FAILURE,
        id: incidentId,
        error: failureReason
    })
})

export const getIncidentsByTicketIdActionSet = (ticketId) => ({
    try: () => ({
        type: REQUEST_INCIDENT_BY_TICKET_ID,
        ticketId
    }),
    
    succeed: (incidents) => (dispatch) => {
        dispatch({
            type: FETCH_INCIDENTS_BY_TICKET_ID_SUCCESS,
            ticketId,
            incidents
        })

        incidents.map(incident => dispatch(eventActions.fetchEvents(incident.id)))
    } ,

    fail: (error) => ({
        type: FETCH_INCIDENTS_BY_TICKET_ID_FAILURE,
        ticketId,
        error
    })
})

export const ticketNeedsRefresh = ({incident, ticket, ticketSystem, preferences}) => {
    return (!incident
            || !incident.IsFetching
            || !ticket
            || !ticketSystem
            || !ticket.lastRefresh
            || ticket.lastRefresh.isBefore(moment().subtract(preferences.refreshIntervalInSeconds, 'seconds')))
}

export const fetchIncidentIfNeeded = props => (dispatch) => {
    if(!props.incident || !props.incident.id) {
        if(props.ticketId) {
            dispatch(props.actions.incident.fetchIncidentsByTicketId(props.ticketId))
        }
        else {
            dispatch(props.actions.incident.fetchIncidents())
        }
    }
    else
    {
        if(ticketNeedsRefresh(props))
        {
            dispatch(props.actions.incident.fetchIncident(props.incident.id))
        }
    }
}

export const getIncidentsActionSet = ({
    try: () => ({
        type: REQUEST_INCIDENTS
    }),

    succeed: (incidents) => (dispatch) => {
        dispatch({
            type: RECEIVE_INCIDENTS,
            incidents,
            receivedAt: moment()
        })

        incidents.map(incident => dispatch(eventActions.fetchEvents(incident.id)))
    },

    fail:  (error) => ({
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

    succeed: (incident) => (dispatch) => {
        dispatch({
            type: CREATE_INCIDENT_SUCCESS,
            incident
        })

        dispatch(eventActions.fetchEvents(incident.id))
    },

    fail: (reason) => ({
        type: CREATE_INCIDENT_FAILURE,
        reason
    })
})

const postIncidentFetchArgs = (ticketId, ticketSystem) => [
            'incidents/',
            {
                title: 'placeholder',
                primaryTicket: {
                    originId: ticketId,
                    ticketingSystemId: ticketSystem.id
                }
            }
        ]

export const updateIncidentCreationInput = (input) => ({
    type: UPDATE_INCIDENT_CREATION_INPUT,
    input
})

export const duplicateIncident = (ticketId) => (dispatch) => {
    dispatch(createIncidentActionSet(ticketId, {}).fail({ message: 'An incident already exists for this ticket'}))
    dispatch(ticketActions.updateIncidentQuery(ticketId))
}

export default incidentActions