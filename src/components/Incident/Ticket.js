import LoadingMessage from 'components/elements/LoadingMessage'
import ErrorMessage from 'components/elements/ErrorMessage'
import * as incidentActions from 'actions/incidentActions'

export const getInfoByTicketId = (state, ticketId) => {
  const { incidents, tickets } = state
  const ticket = tickets.map[ticketId]
  const incident = getIncident(ticket, incidents)
  return {
    incident,
    ticket,
    ticketId,
    ticketSystem: tickets.systems[getTicketSystemId(ticket)],
    incidentIsFetching: incidents.fetchingByTicketId.includes(ticketId) ||
            (incident && incident.id && incidents.fetchingByIncidentId.includes(incident.id)),
    incidentIsError: incidents.errorByTicketId.includes(ticketId) ||
            (incident && incident.id && incidents.errorByIncidentId.includes(incident.id))
  }
}

export const getTicketSystemId = (ticket) => ticket ? (ticket.ticketSystemId ? ticket.ticketSystemId : 1) : 1
export const getIncident = (ticket, incidents) => ticket ? (ticket.incidentId ? incidents.map[ticket.incidentId] : null) : null

export const ErrorLoadingIncident = (incident, ticketId) => ErrorMessage(
    'Error Loading Incident: ' + (incident ? incident.error : 'incident could not be retrieved'),
    DetermineRetryAction(incident, ticketId)
)

export const CurrentlyLoadingIncident = (incident, ticketId) => LoadingMessage(
    'Loading Incident...',
    DetermineRetryAction(incident, ticketId)
)

export const UnexpectedFailureToLoadIncident = () => ErrorMessage(
    'Unexpected Failure When Attempting to Display Incident'
)

const DetermineRetryAction = (incident, ticketId) => (incident && incident.id)
    ? incidentActions.fetchIncident(incident.id)
    : ticketId
        ? incidentActions.fetchIncidentsByTicketId(ticketId)
        : incidentActions.fetchIncidents()
