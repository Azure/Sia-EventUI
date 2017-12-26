import React from 'react'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit'
import Checkpoint from './Checkpoint'
import IconButtonStyled from '../elements/IconButtonStyled'
import BadgeStyled from '../elements/BadgeStyled'
import Timeline from '../Timeline/Timeline'
import Engagements from '../Engagements'
import { CollapsibleGridSet } from '../elements/CollapsibleGrid'
import SyncIcon from 'material-ui/svg-icons/notification/sync'
import { connect } from 'react-redux'

export const DisplayIncident = ({incident, ticket, ticketSystem, expandSection, dispatch}) => {
    return CollapsibleGridSet('incident-container', 'incident-row', 'incident-col', [
        IncidentSummary(incident, ticket, ticketSystem, null, dispatch),
        IncidentEvents([[ticket.originId, incident.id]])
    ],
    [
        IncidentSummaryName(),
        IncidentEventsName()
    ],
    expandSection, dispatch)
}

export const IncidentSummaryName = (ticketId) => {
    return 'IncidentSummary' + (ticketId ? '_' + ticketId : '')
}

export const IncidentProgressName = (ticketId) => {
    return 'IncidentProgress' + (ticketId ? '_' + ticketId : '')
}

export const IncidentEventsName = () => {
    return 'IncidentEvents'
}

export const IncidentSummary = (incident, ticket, ticketSystem, ticketId, dispatch) => {
    let incidentSummaryArray = [
        [
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
        ],
        [
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
        ]
    ]
    return incidentSummaryArray
}

export const IncidentProgress = (ticketId) => {
    let incidentProgressArray = [
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
                    </strong>
            ]
        ],
        [Checkpoint()]
    ]
    return incidentProgressArray
}

export const IncidentEvents = (ticketToIncidentIdMap) => {
    let incidentEventsArray = [
        [
            [
                (key) =><strong key={key}>
                    Incident Timeline:
                </strong>
            ]
        ],
        [
            <Timeline
                ticketId={ticketToIncidentIdMap[0][0]}
                incidentId={ticketToIncidentIdMap[0][1]}
            />
        ]
    ]
    return incidentEventsArray
}

export const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        expandSection: state.expandSection
    }
}

export default connect(mapStateToProps)(DisplayIncident)
