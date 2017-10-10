import moment from 'moment'
import { combineReducers } from 'redux'
import { UPDATE_TICKET_QUERY } from '../actions/ticketActions.js'
import { RECEIVE_INCIDENTS, CREATE_INCIDENT_SUCCESS, RECEIVE_INCIDENT, FETCH_INCIDENTS_BY_TICKET_ID_SUCCESS } from '../actions/incidentActions.js'

const defaultTicketList = {}

const defaultQueryString = ''

const defaultSystems = {
    1: {
        id: 1,
        name: 'Example',
        linkPrefix: '',
        linkSuffix: ''
    }
}

const parseTicketsFromIncident = (incident) => {
    var associatedTickets = incident.tickets ? [...incident.tickets] : []
    associatedTickets.push(incident.primaryTicket)
    associatedTickets.map(parseTicketFromIncident(incident))
    return associatedTickets
}

const parseTicketFromIncident = (incident) => (ticket) => {
    ticket.incidentId = incident.id,
    ticket.status = 'Active',
    ticket.title = incident.title,
    ticket.primaryTicketId = incident.primaryTicket.id
    ticket.lastRefresh = moment()
}

const addIncidentToState = (state, incident) => {
    return addIncidentsToState(state, [incident])
}

const addIncidentsToState = (state, incidents) => {
    let newState = {...state}
    incidents.map(incident => parseTicketsFromIncident(incident)
                            .map(ticket => newState[ticket.originId] = ticket))
    return newState
}

export const map = (state = defaultTicketList, action) => {
    switch(action.type){
        case FETCH_INCIDENTS_BY_TICKET_ID_SUCCESS:
        case RECEIVE_INCIDENTS:
            return addIncidentsToState(state, action.incidents)
        case CREATE_INCIDENT_SUCCESS:
        case RECEIVE_INCIDENT:
            return addIncidentToState(state, action.incident)
        default:
            return state
    }
}

export const query = (state = defaultQueryString, action) => {
    switch(action.type){
        case UPDATE_TICKET_QUERY:
            return action.ticketQuery
        case CREATE_INCIDENT_SUCCESS:
            return action.incident.primaryTicket.originId.toString()
        default:
            return state
    }
}

export const systems = (state = defaultSystems, action) => {
    switch(action.type){
        default:
            return state
    }
}

const defaultPreferences = {
    // eslint-disable-next-line no-undef
    refreshIntervalInSeconds: TICKET_REFRESH_INTERVAL
}

export const preferences = (state = defaultPreferences, action) => {
    switch(action.type){
        default:
            return state
    }
}

const ticketReducer = combineReducers({
  map,
  query,
  systems,
  preferences
})

export default ticketReducer