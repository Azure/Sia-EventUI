import React from 'react'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit'
import Checkpoint from './Checkpoint'
import EventDialogControl from './EventDialogControl'
import ComparisonLinks from './ComparisonLinks'
import IconButtonStyled from '../elements/IconButtonStyled'
import BadgeStyled from '../elements/BadgeStyled'
import Timeline from '../Timeline/Timeline'
import Engagements from '../Engagements'
import { GridSet } from '../elements/Grid'
import CodeIcon from 'material-ui/svg-icons/action/code'
import SyncIcon from 'material-ui/svg-icons/notification/sync'

export const DisplayIncident = (incident, ticket, ticketSystem, dispatch) => {
    return GridSet('incident-container', 'incident-row', 'incident-col', [
        IncidentSummary(incident, ticket, ticketSystem, dispatch),
        IncidentProgress(),
        IncidentEvents([[ticket.originId, incident.id]], dispatch)
    ])
}

export const IncidentSummary = (incident, ticket, ticketSystem, dispatch) => {
    return [
                [
                    [
                        (key) =>
                            <strong key={key}>
                                Incident Summary:
                                &nbsp;
                                <IconButtonStyled tooltip="Refresh">
                                    <SyncIcon />
                                </IconButtonStyled>
                            </strong>,
                        (key) =>
                            <IconButtonStyled tooltip="Collapse/expand section" key={key}>
                                <CodeIcon />
                            </IconButtonStyled>
                    ]
                ],
                [
                    [
                        (key) =>
                            <a href={`${ticketSystem.linkPrefix}${ticket.originId}${ticketSystem.linkSuffix}`} key={key}>
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
                ],
                [
                    <div>
                        {incident.title}
                    </div>
                ],
                [
                    <Engagements
                        incidentId={incident.id}
                        engagements={incident.engagements}
                        dispatch={dispatch}
                    />
                ],
                [<ComparisonLinks ticketId={ticket.originId} />]
            ]
}

export const IncidentProgress = (ticketId) => {
    return [
                [
                    [
                        (key) =>
                            <strong key={key}>
                                Incident Progress{ticketId ? ` for ${ticketId}`:''}:
                                &nbsp;
                                <BadgeStyled badgeContent={4}>
                                    <IconButtonStyled tooltip="Suggested actions">
                                        <NotificationsIcon />
                                    </IconButtonStyled>
                                </BadgeStyled>
                            </strong>,
                        (key) =>
                            <IconButtonStyled tooltip="Collapse/expand section" key={key}>
                                <CodeIcon />
                            </IconButtonStyled>
                    ]
                ],
                [Checkpoint()]
            ]
}

export const IncidentEvents = (ticketToIncidentIdMap, dispatch) => {
    return [
        [
            [
                (key) =>
                    <EventDialogControl incidentIds={ticketToIncidentIdMap} dispatch={dispatch} key={key}/>,
                (key) =>
                    <IconButtonStyled tooltip="Collapse/expand section" key={key}>
                        <CodeIcon />
                    </IconButtonStyled>
            ]
        ],
        [<Timeline incidentIds={ExtractIncidentIdsFromMap(ticketToIncidentIdMap)}/>]
    ]
}

const ExtractIncidentIdsFromMap = (ticketToIncidentIdMap) => {
    return ticketToIncidentIdMap.map(ticketIdIncidentIdPair => ticketIdIncidentIdPair[1])
}

export default DisplayIncident