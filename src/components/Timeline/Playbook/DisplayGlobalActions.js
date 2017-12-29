import React from 'react'
import { connect } from 'react-redux'
import { TestConditionSet } from '../../../services/playbookService'
import Play from './Play'

export const DisplayGlobalActions = ({
    actions,
    ticketId,
    engagementId,
    incidentId
}) => {
    let localKey = 0
    return <div>
        {actions.map(action =>
            <div key={localKey++}>
                <span>
                    {action.name}
                </span>
                <br/>
                <Play
                    action={action}
                    incidentId={incidentId}
                    ticketId={ticketId}
                    engagementId={engagementId}
                />
            </div>
        )}
    </div>
}


export const mapStateToDisplayGlobalActionsProps = (state, ownProps) => {
    const auth = state.auth

    const ticket = state.tickets.map[ownProps.ticketId]
    const engagement = state.engagements.list.find(
        engagement => engagement
        && engagement.incidentId === ownProps.incidentId
        && engagement.participant
        && engagement.participant.alias === auth.userAlias
        && engagement.participant.team === auth.userTeam
        && engagement.participant.role === auth.userRole
    )

    const actions = Object.values(state.globalActions)
    var populatedConditionSetTest = TestConditionSet(null, ticket, null, engagement)
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
        ...ownProps
    }
}

export default connect(mapStateToDisplayGlobalActionsProps)(DisplayGlobalActions)