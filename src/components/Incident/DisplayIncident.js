import React from 'react'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Checkpoint from './Checkpoint'
import EventDialogControl from './EventDialogControl'
import ComparisonLinks from './ComparisonLinks'
import IconButtonStyled from '../elements/IconButtonStyled'
import FlatButtonStyled from '../elements/FlatButtonStyled'
import BadgeStyled from '../elements/BadgeStyled'
import Timeline from '../Timeline/Timeline'
import Engagements from '../Engagements'
import { GridSet } from '../elements/Grid'
import { fetchIncident } from '../../actions/incidentActions'
import { buttonFontEnlarge } from '../../actions/styleActions'

export const DisplayIncident = (incident, ticket, ticketSystem, dispatch) => {
    return GridSet('incident-container', 'incident-row', 'incident-col', [
        IncidentSummary(incident, ticket, ticketSystem, dispatch),
        IncidentProgress(),
        IncidentEvents([[ticket.originId, incident.id]])
    ])
}

export const IncidentSummary = (incident, ticket, ticketSystem, dispatch) => {
    return [
                [<a href={`${ticketSystem.linkPrefix}${ticket.originId}${ticketSystem.linkSuffix}`}>
                    Sev {ticket.severity} / ID {ticket.originId}
                </a>,
                <div>
                    IM: {ticket.imName}
                    <IconButtonStyled>
                        <ModeEdit />
                    </IconButtonStyled>
                    <FlatButtonStyled
                        label='Refresh'
                        dispatchOnTouchTap={fetchIncident(incident.id)}
                    />
                    <FlatButtonStyled
                        label='Big Button'
                        dispatchOnTouchTap={buttonFontEnlarge()}
                    />
                </div>],
                [<div>
                    Engagements:
                </div>,
                <Engagements
                    incidentId={incident.id}
                    engagements={incident.engagements}
                    dispatch={dispatch}
                />],
                [<span>{incident.title}</span>,
                <ComparisonLinks ticketId={ticket.originId} />]
            ]
}

export const IncidentProgress = (ticketId) => {
    return [
                [<div>
                    <strong>Incident Progress{ticketId ? ` for ${ticketId}`:''}:</strong> [hide]
                    <br/>
                    <BadgeStyled badgeContent={4}>
                        <IconButtonStyled tooltip="Suggested Actions">
                            <NotificationsIcon />
                        </IconButtonStyled>
                    </BadgeStyled>
                </div>],
                [Checkpoint()]
            ]
}

export const IncidentEvents = (ticketToIncidentIdMap) => {
    return [
        [<EventDialogControl incidentIds={ticketToIncidentIdMap}/>],
        [<Timeline incidentIds={ExtractIncidentIdsFromMap(ticketToIncidentIdMap)}/>]
    ]
}

const ExtractIncidentIdsFromMap = (ticketToIncidentIdMap) => {
    return ticketToIncidentIdMap.map(ticketIdIncidentIdPair => ticketIdIncidentIdPair[1])
}

export default DisplayIncident

