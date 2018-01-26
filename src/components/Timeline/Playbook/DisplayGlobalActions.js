import React from 'react'
import { connect } from 'react-redux'
import { TestConditionSet } from 'services/playbookService'
import Play from 'components/Timeline/Playbook/Play'

export const DisplayGlobalActions = ({
    actions,
    ticketId,
    engagementId,
    incidentId
}) => {
  let localKey = 0
  return <div>
    { AreAnyActionsAvailable(actions)
            ? actions.map(action => DisplayGlobalAction(
                    action,
                    ticketId,
                    engagementId,
                    incidentId,
                    localKey++
                ))
            : null}
  </div>
}

const AreAnyActionsAvailable = (actions) =>
    actions && Array.isArray(actions) && actions.length

export const DisplayGlobalAction = (
    action,
    ticketId,
    engagementId,
    incidentId,
    key
) => <div key={key}>
  <span>
    {action.name}
  </span>
  <br />
  <Play
    action={action}
    incidentId={incidentId}
    ticketId={ticketId}
    engagementId={engagementId}
    />
</div>

export const mapStateToDisplayGlobalActionsProps = (state, ownProps) => {
  const ticket = state.tickets.map[ownProps.ticketId]
  const engagement = FindCurrentUserEngagement(state, ownProps.incidentId)

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

const FindCurrentUserEngagement = (state, incidentId) => state.engagements.list.find(
    engagement => engagement &&
    engagement.incidentId === incidentId &&
    engagement.participant &&
    engagement.participant.alias === state.auth.userAlias &&
    engagement.participant.team === state.auth.userTeam &&
    engagement.participant.role === state.auth.userRole
)

export default connect(mapStateToDisplayGlobalActionsProps)(DisplayGlobalActions)
