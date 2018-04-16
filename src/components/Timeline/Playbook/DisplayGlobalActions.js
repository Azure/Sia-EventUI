import React from 'react'
import { connect } from 'react-redux'
import { TestConditionSet } from 'services/playbookService'
import DisplayPlaybook from 'components/Timeline/Playbook/DisplayPlaybook'

export const DisplayGlobalActions = ({
    actions,
    ticketId,
    incidentId
}) => (
  <DisplayPlaybook
    actions={actions}
    ticketId={ticketId}
    incidentId={incidentId}
  />
)

export const mapStateToDisplayGlobalActionsProps = (state, ownProps) => {
  const ticket = state.tickets.map[ownProps.ticketId]
  const actions = Object.values(state.globalActions)
  var populatedConditionSetTest = TestConditionSet(null, ticket, null)
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
    ...ownProps
  }
}

export default connect(mapStateToDisplayGlobalActionsProps)(DisplayGlobalActions)
