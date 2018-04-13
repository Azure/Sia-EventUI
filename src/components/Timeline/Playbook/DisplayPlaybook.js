import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Play from 'components/Timeline/Playbook/Play'
import { TestConditionSet } from 'services/playbookService'

const wrapperStyle = {
  display: 'flex',
  flexWrap: 'wrap'
}

export const DisplayPlaybook = ({
    actions,
    eventTypeId,
    eventId,
    ticketId
}) => {
  let localKey = 0
  return <div style={wrapperStyle}>
    {AreAnyActionsAvailable(actions)
      ? actions.map(action => DisplayAction(
      action,
      eventTypeId,
      eventId,
      ticketId,
      localKey++
    ))
    : null}
  </div>
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

const AreAnyActionsAvailable = (actions) =>
    actions && Array.isArray(actions) && actions.length

export const DisplayAction = (
  action,
  eventTypeId,
  eventId,
  ticketId,
  key
) => <div key={key}>
  <Play
    action={action}
    eventTypeId={eventTypeId}
    eventId={eventId}
    ticketId={ticketId}
  />
</div>

export default connect(mapStateToDisplayPlaybookProps)(DisplayPlaybook)
