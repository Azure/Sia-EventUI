import React from 'react'
import PropTypes from 'prop-types'
import SyncIcon from 'material-ui/svg-icons/notification/sync'
import IconButtonStyled from '../elements/IconButtonStyled'
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit'
import Engagements from '../Engagements'
import GlobalActions from '../Timeline/Playbook/GlobalActions'

export const IncidentSummaryName = (ticketId) => {
    return 'IncidentSummary' + (ticketId ? '_' + ticketId : '')
}


export const IncidentSummary = ({incident, ticket, ticketSystem, ticketOriginId, dispatch}) =>
[
    HeaderRow(ticketOriginId),
    TicketDetailsRow(ticketSystem, ticket),
    TitleRow(incident),
    GlobalActionsRow(incident, ticketOriginId),
    EngagementsRow(incident, dispatch)
]
IncidentSummary.propTypes = {
    incident: PropTypes.object,
    ticket: PropTypes.object,
    ticketSystem: PropTypes.object,
    expandSection: PropTypes.object,
    dispatch: PropTypes.func.isRequired
}

const HeaderRow = (ticketId) => [
    [
        (key) =>
            <strong key={key}>
                Incident Summary{ticketId ? ` for ${ticketId}`:''}:
                &nbsp;
                <IconButtonStyled tooltip="Refresh">
                    <SyncIcon />
                </IconButtonStyled>
            </strong>
    ]
]

const TicketDetailsRow = (ticketSystem, ticket) => [
    BasicInfoColumn(ticketSystem, ticket),
    IncidentManagerColumn(ticket)
]

const BasicInfoColumn = (ticketSystem, ticket) => [
    (key) =>
        <a href={`${ticketSystem.ticketUriPrefix}${ticket.originId}${ticketSystem.ticketUriSuffix}`} key={key} target="_blank">
            {ticket.originId}
        </a>,
    (key) =>
        <div key={key}>
            {ticket.severity}
        </div>
]

const IncidentManagerColumn = (ticket) => [
    (key) =>
        <div key={key}>
            {ticket.imName}
        </div>,
    (key) =>
        <IconButtonStyled tooltip="Edit IM" key={key}>
            <ModeEditIcon />
        </IconButtonStyled>
]

const noTitleMessage = 'No Title!'

const TitleRow = (incident) => [
    <div>
        {DoesIncidentHaveTitle(incident) ? incident.title
        : DoesPrimaryTicketHaveNativeTitle(incident) ? incident.primaryTicket.title
        : DoesPrimaryTicketHaveDataTitle(incident) ? incident.primaryTicket.data.Title
        : noTitleMessage}
    </div>
]

const DoesIncidentHaveTitle = (incident) =>
    incident && incident.title

const DoesPrimaryTicketHaveNativeTitle = (incident) =>
    incident && incident.primaryTicket && incident.primaryTicket.title

const DoesPrimaryTicketHaveDataTitle = (incident) =>
    incident && incident.primaryTicket && incident.primaryTicket.data && incident.primaryTicket.data.Title

const EngagementsRow = (incident, dispatch) => [
    <Engagements
        incidentId={incident.id}
        engagements={incident.engagements}
        dispatch={dispatch}
    />
]

const GlobalActionsRow = (incident, ticketId) => [
    [
        (key) => <GlobalActions
                incidentId={incident.id}
                ticketId={ticketId}
                key={key}
            />
    ]
]
