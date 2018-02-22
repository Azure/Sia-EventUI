import React from 'react'
import SyncIcon from 'material-ui/svg-icons/notification/sync'
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit'

import IconButtonStyled from 'components/elements/IconButtonStyled'
import Passthrough from 'components/elements/Passthrough'

export const IncidentSummaryName = (ticketId) => {
  return 'IncidentSummary' + (ticketId ? '_' + ticketId : '')
}

export const IncidentSummary = Passthrough

export const IncidentHeader = Passthrough

export const SummaryStatement = ({ticketId}) => <strong>
  Incident Summary{ticketId ? ` for ${ticketId}` : ''}:
  &nbsp;
  <IconButtonStyled tooltip='Refresh'>
    <SyncIcon />
  </IconButtonStyled>
</strong>

export const TicketDetails = Passthrough

export const BasicInfo = Passthrough

export const TicketLink = ({ticketSystem, ticket}) => <a
    href={`${ticketSystem.ticketUriPrefix}${ticket.originId}${ticketSystem.ticketUriSuffix}`}
    target='_blank'
  >
    {ticket.originId}
  </a>

export const TicketSeverity = ({ticket}) => <div>{ticket.severity}</div>

export const IncidentManager = Passthrough

export const IncidentManagerName = ({ticket}) => <div>{ticket.imName}</div>

export const EditIncidentManager = () => <IconButtonStyled tooltip='Edit IM'><ModeEditIcon /></IconButtonStyled>

const noTitleMessage = 'No Title!'

export const Title = ({incident}) => <div>
  {DoesIncidentHaveTitle(incident) ? incident.title
  : DoesPrimaryTicketHaveNativeTitle(incident) ? incident.primaryTicket.title
  : DoesPrimaryTicketHaveDataTitle(incident) ? incident.primaryTicket.data.title
  : noTitleMessage}
  </div>

const DoesIncidentHaveTitle = (incident) =>
  incident && incident.title

const DoesPrimaryTicketHaveNativeTitle = (incident) =>
  incident && incident.primaryTicket && incident.primaryTicket.title

const DoesPrimaryTicketHaveDataTitle = (incident) =>
  incident && incident.primaryTicket && incident.primaryTicket.data && incident.primaryTicket.data.title

export default IncidentSummary
