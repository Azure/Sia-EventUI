import { connect } from 'react-redux'
import { TestConditionSet } from '../../../services/playbookService'
import LoadingMessage from '../../elements/LoadingMessage'
import DisplayPlaybook from './DisplayPlaybook'
import * as eventActions from '../../../actions/eventActions'
import * as eventTypeActions from '../../../actions/eventTypeActions'

export const Playbook = (args) => args.eventIsFetching
    ? args.eventtypeIsFetching
        ? LoadingMessage('Fetching event type information...', eventTypeActions.fetchEventType(args.eventTypeId))
        : LoadingMessage('Fetching event information...', eventActions.fetchEvent(args.incidentId, args.eventId))
    : DisplayPlaybook(args)


export const mapStateToPlaybookProps = (state, ownProps) => {
    const auth = state.auth
    const eventType = state.eventTypes.records[ownProps.eventTypeId]
    const event = Object.values(state.events.pages.list)
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
        eventTypeIsFetching: state.evenTypes.fetching.includes(ownProps.eventTypeId),
        eventIsFetching: state.events.fetching.includes(ownProps.eventid),
        ...ownProps
    }
}

export default connect(mapStateToPlaybookProps)(Playbook)
