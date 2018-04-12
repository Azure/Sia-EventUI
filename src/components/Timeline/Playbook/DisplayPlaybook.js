import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Play from 'components/Timeline/Playbook/Play'
import { TestConditionSet } from 'services/playbookService'

export const DisplayPlaybook = ({
    actions,
    eventTypeId,
    eventId,
    ticketId
}) => {
  let localKey = 0
  return actions
    ? <div>
      <div key={localKey++}>Select the Actions below:</div>
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
            ticketId={ticketId}
          />
        </div>
        )}
    </div>
    : null
}

DisplayPlaybook.propTypes = {
  actions: PropTypes.array,
  eventTypeId: PropTypes.number.isRequired,
  eventId: PropTypes.number.isRequired,
  ticketId: PropTypes.string
}

export const mapStateToDisplayPlaybookProps = (state, ownProps) => {
  const { eventTypeId, ticketId, eventId } = ownProps

  const eventType = state.eventTypes.records[eventTypeId]
  const event = Object.values(state.events.pages.list)
        .find(event => event.id === eventId)
  const ticket = state.tickets.map[ticketId]
  const actions = eventType.actions
  const populatedConditionSetTest = TestConditionSet(event, ticket, eventType)
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
    eventTypeId,
    ticketId,
    eventId
  }
}

export default connect(mapStateToDisplayPlaybookProps)(DisplayPlaybook)
