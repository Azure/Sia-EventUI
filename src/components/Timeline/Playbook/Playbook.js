import { connect } from 'react-redux'
import { TestConditionSet } from '../../../services/playbookService'
import LoadingMessage from '../../elements/LoadingMessage'
import ErrorMessage from '../../elements/ErrorMessage'
import DisplayPlaybook from './DisplayPlaybook'
import * as eventActions from '../../../actions/eventActions'
import * as eventTypeActions from '../../../actions/eventTypeActions'

export const Playbook = ({
    actions,
    eventTypeId,
    incidentId,
    eventId,
    ticketId,
    engagementId,
    eventIsFetching,
    eventIsError,
    eventTypeIsFetching,
    eventTypeIsError
}) => {
    if(eventIsFetching) {
        return LoadingMessage('Fetching event information...', eventActions.fetchEvent(incidentId, eventId))
    }
    if(eventTypeIsFetching) {
        return LoadingMessage('Fetching event type information...', eventTypeActions.fetchEventType(eventTypeId))
    }
    if(eventIsError) {
        return ErrorMessage('Error fetching event!', eventActions.fetchEvent(incidentId, eventId))
    }
    if(eventTypeIsError){
        return ErrorMessage('Error fetching eventType!', eventTypeActions.fetchEventType(eventTypeId))
    }
    return DisplayPlaybook({actions, eventTypeId, eventId, ticketId, engagementId, incidentId})
}

export const mapStateToPlaybookProps = (state, ownProps) => {
    const auth = state.auth
    const eventType = state.eventTypes.records[ownProps.eventTypeId]
    const event = Object.values(state.events.list)
        .find(event => event.id == ownProps.eventId)
    const ticket = state.tickets.map[ownProps.ticketId]
    const engagement = state.engagements.list.find(
        engagement => engagement
        && engagement.incidentId == ownProps.incidentId
        && engagement.participant
        && engagement.participant.alias == auth.userAlias
        && engagement.participant.team == auth.userTeam
        && engagement.participant.role == auth.userRole
    )
    const actions = eventType.actions
    var populatedConditionSetTest = TestConditionSet(event, ticket, eventType, engagement)
    const qualifiedActions = actions.filter(
        action => action.conditionSets.reduce(
            (allConditionSetsMet, currentConditionSet) => allConditionSetsMet
                ? populatedConditionSetTest(currentConditionSet)
                : false,
            true
        )
    )
    return {
        actions: qualifiedActions,
        engagementId: engagement ? engagement.id : null,
        eventTypeIsFetching: state.eventTypes.fetching.includes(ownProps.eventTypeId),
        eventTypeIsError: state.eventTypes.error.includes(ownProps.eventTypeId),
        eventIsFetching: state.events.fetching.includes(ownProps.eventid),
        eventIsError: state.events.error.includes(ownProps.eventId),
        ...ownProps
    }
}

export default connect(mapStateToPlaybookProps)(Playbook)
