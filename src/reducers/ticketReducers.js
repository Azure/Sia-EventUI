import { DateTime } from 'luxon'
import { combineReducers } from 'redux'
import { UPDATE_TICKET_QUERY, REMOVE_TICKET } from 'actions/ticketActions.js'
import { RECEIVE_INCIDENTS, CREATE_INCIDENT_SUCCESS, RECEIVE_INCIDENT, FETCH_INCIDENTS_BY_TICKET_ID_SUCCESS } from 'actions/incidentActions.js'
import config from 'config'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native

const defaultTicketList = {}

const defaultQueryString = ''

const defaultSystems = config.ticketSystems

const parseTicketsFromIncident = (incident) => {
  var associatedTickets = incident.tickets ? [...incident.tickets] : []
  if (incident.primaryTicket) {
    associatedTickets.push(incident.primaryTicket)
  }
  if (associatedTickets.length) {
    associatedTickets.map(parseTicketFromIncident(incident))
  }

  return associatedTickets
}

const parseTicketFromIncident = (incident) => (ticket) => {
  if (ticket) {
    ticket.incidentId = incident.id
    ticket.status = 'Active'
    ticket.title = incident.title
    ticket.primaryTicketId = incident.primaryTicket.id
    ticket.lastRefresh = DateTime.utc().toString()
  }
}

const addIncidentToState = (state, incident) => {
  return addIncidentsToState(state, [incident])
}

const addIncidentsToState = (state, incidents) => {
  let newState = { ...state }
  incidents.map(incident => parseTicketsFromIncident(incident)
           .map(ticket => { newState[ticket.originId] = ticket }))
  return newState
}

const removeTicketFromState = (state, ticketId) => {
  let newState = { ...state }
  Reflect.deleteProperty(newState, ticketId)
  return newState
}

export const map = (state = defaultTicketList, action) => {
  switch (action.type) {
    case FETCH_INCIDENTS_BY_TICKET_ID_SUCCESS:
    case RECEIVE_INCIDENTS:
      return addIncidentsToState(state, action.incidents)
    case CREATE_INCIDENT_SUCCESS:
    case RECEIVE_INCIDENT:
      return addIncidentToState(state, action.incident)
    case REMOVE_TICKET:
      return removeTicketFromState(state, action.id)
    default:
      return state
  }
}

export const query = (state = defaultQueryString, action) => {
  switch (action.type) {
    case UPDATE_TICKET_QUERY:
      return action.ticketQuery
    case CREATE_INCIDENT_SUCCESS:
      if (action && action.incident && action.incident.primaryTicket && action.incident.primaryTicket.originId) {
        return action.incident.primaryTicket.originId.toString()
      } else return state
    default:
      return state
  }
}

export const systems = (state = defaultSystems, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const defaultPreferences = {
  refreshIntervalInSeconds: config.ticketRefreshIntervalInSeconds
}

export const preferences = (state = defaultPreferences, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const mapRed = persistReducer({
  key: 'ticket',
  storage
}, map)

const ticketReducer = combineReducers({
  map: mapRed,
  query,
  systems,
  preferences
})

export default ticketReducer
