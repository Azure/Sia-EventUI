import React from 'react'
import { connect } from 'react-redux'
import { TestConditionSet } from '../../../services/playbookService'
import DisplayPlaybook from './DisplayPlaybook'

export const Playbook = (args) => args.eventTypeIsFetching
    || args.eventIsFetching
    ? <div>Fetching event information...</div>
    : DisplayPlaybook(args)


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
        eventTypeIsFetching: state.evenTypes.fetching.includes(ownProps.eventTypeId),
        eventIsFetching: state.events.fetching.includes(ownProps.eventid),
        ...ownProps
    }
}

export default connect(mapStateToPlaybookProps)(Playbook)
