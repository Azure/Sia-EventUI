import React from 'react'
import PropTypes from 'prop-types'
import SyncIcon from 'material-ui/svg-icons/notification/sync'
import IconButtonStyled from '../elements/IconButtonStyled'
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit'
import Engagements from '../Engagements'

export const IncidentSummaryName = (ticketId) => {
    return 'IncidentSummary' + (ticketId ? '_' + ticketId : '')
}

IncidentSummary.propTypes = {
    incident: PropTypes.object,
    ticket: PropTypes.object,
    ticketSystem: PropTypes.object,
    expandSection: PropTypes.object,
    dispatch: PropTypes.func.isRequired
}

export const IncidentSummary = (incident, ticket, ticketSystem, ticketId, dispatch) =>
[
    HeaderRow(ticketId),
    TicketDetailsRow(ticketSystem, ticket),
    TitleRow(incident),
    EngagementsRow(incident, dispatch)
]

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
    [
        (key) =>
            <a href={`${ticketSystem.ticketUriPrefix}${ticket.originId}${ticketSystem.ticketUriSuffix}`} key={key}>
                {ticket.originId}
            </a>,
        (key) =>
            <div key={key}>
                Sev 2 {ticket.severity}
            </div>
    ],
    [
        (key) =>
            <div key={key}>
                IM: TBD {ticket.imName}
            </div>,
        (key) =>
            <IconButtonStyled tooltip="Edit IM" key={key}>
                <ModeEditIcon />
            </IconButtonStyled>
    ]
]

const noTitleMessage = 'No Title!'

const TitleRow = (incident) => [
    <div>
        {incident && incident.title
            ? incident.title
            : incident.primaryTicket
                ? incident.primaryTicket.title
                    ? incident.primaryTicket.title
                    : incident.primaryTicket.data && incident.primaryTicket.data.Title
                        ? incident.primaryTicket.data.Title
                        : noTitleMessage
                : noTitleMessage}
    </div>
]

const EngagementsRow = (incident, dispatch) => [
    <Engagements
        incidentId={incident.id}
        engagements={incident.engagements}
        dispatch={dispatch}
    />
]