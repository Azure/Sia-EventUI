import { DateTime } from 'luxon'
import { combineReducers } from 'redux'
import { UPDATE_TICKET_QUERY, REMOVE_TICKET, REMOVE_PREVIOUS_TICKETS } from 'actions/ticketActions.js'
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
  newState[ticketId] = null
  return newState
}

const removePreviousTicketsFromState = (state, currentTicketId) =>
  Object.assign(
    {},
    ...Object.keys(state)
      .map(ticketId => ({[ticketId]: null})),
    {[currentTicketId]: state[currentTicketId]}
  )

const defaultPreferences = {
  refreshIntervalInSeconds: config.ticketRefreshIntervalInSeconds
}

const persistConfig = {
  key: 'ticket',
  version: 0,
  storage
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
    case REMOVE_PREVIOUS_TICKETS:
      return removePreviousTicketsFromState(state, action.currentId)
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

export const preferences = (state = defaultPreferences, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default combineReducers({
  map: persistReducer(persistConfig, map),
  query,
  systems,
  preferences
})
