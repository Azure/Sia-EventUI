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
import { connect } from 'react-redux'
import * as expandSectionActions from '../../actions/expandSectionActions'

export const DisplayIncident = ({incident, ticket, ticketSystem, dispatch, expandSection}) => {
    return GridSet('incident-container', 'incident-row', 'incident-col', [
        IncidentSummary(expandSection.expandIncidentSummary, incident, ticket, ticketSystem, dispatch),
        IncidentProgress(expandSection.expandIncidentProgress, null, dispatch),
        IncidentEvents(expandSection.expandIncidentEvent, [[ticket.originId, incident.id]], dispatch)
    ])
}

export const IncidentSummary = (expandIncidentSummaryState, incident, ticket, ticketSystem, dispatch) => {
    let incidentSummaryArray = [
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
                    <IconButtonStyled
                        tooltip="Collapse/expand section"
                        onTouchTap={() => dispatch(expandSectionActions.expandIncidentSummary())}
                        key={key}
                    >
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
    return expandIncidentSummaryState? incidentSummaryArray : incidentSummaryArray.slice(0,1)
}

export const IncidentProgress = (expandIncidentProgressState, ticketId, dispatch) => {
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
                    </strong>,
                (key) =>
                    <IconButtonStyled
                        tooltip="Collapse/expand section"
                        onTouchTap={() => dispatch(expandSectionActions.expandIncidentProgress())}
                        key={key}
                    >
                        <CodeIcon />
                    </IconButtonStyled>
            ]
        ],
        [Checkpoint()]
    ]
    return expandIncidentProgressState? incidentProgressArray : incidentProgressArray.slice(0,1)
}

export const IncidentEvents = (expandIncidentEventsState, ticketToIncidentIdMap, dispatch) => {
    let incidentEventsArray = [
        [
            [
                (key) =>
                    <EventDialogControl incidentIds={ticketToIncidentIdMap} key={key}/>,
                (key) =>
                    <IconButtonStyled
                        onTouchTap={() => dispatch(expandSectionActions.expandIncidentEvent())}
                        key={key}
                    >
                        <CodeIcon />
                    </IconButtonStyled>
            ]
        ],
        [<Timeline incidentIds={ExtractIncidentIdsFromMap(ticketToIncidentIdMap)}/>]
    ]
    return expandIncidentEventsState? incidentEventsArray : incidentEventsArray.slice(0,1)
}

const ExtractIncidentIdsFromMap = (ticketToIncidentIdMap) => {
    return ticketToIncidentIdMap.map(ticketIdIncidentIdPair => ticketIdIncidentIdPair[1])
}

export const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        expandSection: state.expandSection
    }
}

export default connect(mapStateToProps)(DisplayIncident)