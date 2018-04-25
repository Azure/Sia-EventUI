import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, CardHeader, CardActions } from 'material-ui/Card'
import * as Icons from 'material-ui/svg-icons'
import Avatar from 'material-ui/Avatar'

import Playbook from 'components/Timeline/Playbook/Playbook'
import { LoadTextFromEvent } from 'services/playbookService'
import TimeDisplay from 'components/elements/TimeDisplay'

export const EventCard = ({
  event,
  titleText,
  ticketId,
  IconType
}) => <Card
  className='incident-card'
  style={{ backgroundColor: event.backgroundColor }}
>
  <CardHeader
    title={titleText}
    subtitle={getTimeDisplay(event)}
    iconStyle={{
      color: 'black'
    }}
    avatar={IconType ? <Avatar icon={<IconType />} /> : null}
  />
  <CardActions>
    <Playbook
      eventId={event.id}
      eventTypeId={event.eventTypeId}
      ticketId={ticketId}
    />
  </CardActions>
</Card>

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  titleText: PropTypes.string.isRequired,
  ticketId: PropTypes.string,
  IconType: PropTypes.func
}

export const getTimeDisplay = (event) =>
  event.occurred || event.Occurred
    ? <TimeDisplay time={event.occurred || event.Occurred} />
    : null

export const mapStateToEventCardProps = (state, ownProps) => {
  const { event, ticketId } = ownProps
  const eventType = state.eventTypes.records[event.eventTypeId]
  const ticket = state.tickets.map[ticketId]
  const IconType = eventType ? Icons[eventType.icon] : null

  return {
    event,
    titleText: LoadTextFromEvent(event, eventType, ticket),
    ticketId,
    IconType: typeof IconType === 'function'
      ? IconType
      : null
  }
}

export default connect(mapStateToEventCardProps)(EventCard)
