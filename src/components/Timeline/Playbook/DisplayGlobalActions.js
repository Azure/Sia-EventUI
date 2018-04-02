import React from 'react'
import { connect } from 'react-redux'
import { TestConditionSet } from 'services/playbookService'
import Play from 'components/Timeline/Playbook/Play'

export const DisplayGlobalActions = ({
    actions,
    ticketId,
    incidentId
}) => {
  let localKey = 0
  return <div>
    { AreAnyActionsAvailable(actions)
            ? actions.map(action => DisplayGlobalAction(
                    action,
                    ticketId,
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
    />
</div>

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
