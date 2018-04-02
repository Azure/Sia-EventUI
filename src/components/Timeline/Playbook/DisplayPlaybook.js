import React from 'react'
import PropTypes from 'prop-types'
import Play from 'components/Timeline/Playbook/Play'
import { TestConditionSet } from 'services/playbookService'

export const DisplayPlaybook = ({
    actions,
    eventTypeId,
    eventId,
    ticketId,
    incidentId
}) => {
  let localKey = 0
  return <div>
    {actions.map(action =>
      <div key={localKey++}>
        <span>
          {action.name}
        </span>
        <br />
        <Play
          action={action}
          eventTypeId={eventTypeId}
          eventId={eventId}
          incidentId={incidentId}
          ticketId={ticketId}
                />
      </div>
        )}
  </div>
}

DisplayPlaybook.propTypes = {
  actions: PropTypes.array.isRequired,
  eventTypeId: PropTypes.number.isRequired,
  eventId: PropTypes.number.isRequired,
  ticketId: PropTypes.string.isRequired,
  incidentId: PropTypes.number.isRequired
}

export const mapStateToDisplayPlaybookProps = (state, ownProps) => {
  const eventType = state.eventTypes.records[ownProps.eventTypeId]
  const event = Object.values(state.events.list.list)
        .find(event => event.id === ownProps.eventId)
  const ticket = state.tickets.map[ownProps.ticketId]
  const actions = eventType.actions
  var populatedConditionSetTest = TestConditionSet(event, ticket, eventType)
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

export default DisplayPlaybook
