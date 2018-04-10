import React from 'react'
import PropTypes from 'prop-types'

import GlobalActions from 'components/Timeline/Playbook/GlobalActions'

export const IncidentSummaryName = (ticketId) => {
  return 'IncidentSummary' + (ticketId ? '_' + ticketId : '')
}

export const IncidentSummary = ({incident, ticket, ticketSystem, ticketOriginId, dispatch}) =>
  [
    HeaderRow(ticketOriginId),
    TicketDetailsRow(ticketSystem, ticket),
    TitleRow(incident),
    GlobalActionsRow(incident, ticketOriginId)
  ]
IncidentSummary.propTypes = {
  incident: PropTypes.object,
  ticket: PropTypes.object,
  ticketSystem: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

const HeaderRow = (ticketId) => [
  [
    (key) =>
      <strong key={key}>
                Incident Summary{ticketId ? ` for ${ticketId}` : ''}:
      </strong>
  ]
]

const TicketDetailsRow = (ticketSystem, ticket) => [
  BasicInfoColumn(ticketSystem, ticket),
  IncidentManagerColumn(ticket)
]

const BasicInfoColumn = (ticketSystem, ticket) => [
  (key) =>
    <a href={`${ticketSystem.ticketUriPrefix}${ticket.originId}${ticketSystem.ticketUriSuffix}`} key={key} target='_blank'>
      {ticket.originId}
    </a>,
  (key) => ticket.data && 'severity' in ticket.data
    ? (
      <div key={key}>
        Severity: {ticket.data.severity}
      </div>
    )
    : null
]

const IncidentManagerColumn = (ticket) => [
  (key) =>
    <div key={key}>
      {ticket.imName}
    </div>
]

const noTitleMessage = 'No Title!'

const TitleRow = (incident) => [
  <div>
    {DoesIncidentHaveTitle(incident) ? incident.title
        : DoesPrimaryTicketHaveNativeTitle(incident) ? incident.primaryTicket.title
        : DoesPrimaryTicketHaveDataTitle(incident) ? incident.primaryTicket.data.title
        : noTitleMessage}
  </div>
]

const DoesIncidentHaveTitle = (incident) =>
    incident && incident.title

const DoesPrimaryTicketHaveNativeTitle = (incident) =>
    incident && incident.primaryTicket && incident.primaryTicket.title

const DoesPrimaryTicketHaveDataTitle = (incident) =>
    incident && incident.primaryTicket && incident.primaryTicket.data && incident.primaryTicket.data.title

const GlobalActionsRow = (incident, ticketId) => [
  [
    (key) => <GlobalActions
      incidentId={incident.id}
      ticketId={ticketId}
      key={key}
            />
  ]
]
