import { connect } from 'react-redux'
import { TestConditionSet } from 'services/playbookService'
import { DisplayPlaybook } from 'components/Timeline/Playbook/DisplayPlaybook'

export const mapStateToDisplayGlobalActionsProps = (state, ownProps) => {
  const { ticketId } = ownProps

  const ticket = state.tickets.map[ticketId]
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
    ticketId
  }
}

export default connect(mapStateToDisplayGlobalActionsProps)(DisplayPlaybook)
