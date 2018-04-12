import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DateTime } from 'luxon'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import * as Icons from 'material-ui/svg-icons'
import Avatar from 'material-ui/Avatar'

import Playbook from 'components/Timeline/Playbook/Playbook'
import { LoadTextFromEvent } from 'services/playbookService'
import timeFormattedToMultipleZones from 'helpers/timeFormattedToMultipleZones'

const isAllPlaybookInfoAvailable = (actions) =>
  !!(actions && Array.isArray(actions) && actions.length > 0)

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
    subtitle={timeFormattedToMultipleZones(DateTime.fromISO(event.occurred ? event.occurred : event.Occurred))}
    iconStyle={{
      color: isAllPlaybookInfoAvailable ? 'black' : 'Lightgrey'
    }}
    avatar={IconType ? <Avatar icon={<IconType />} /> : null}
  />
  <CardText>
    <Playbook
      eventId={event.id}
      eventTypeId={event.eventTypeId}
      ticketId={ticketId}
    />
  </CardText>
</Card>

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  titleText: PropTypes.string.isRequired,
  ticketId: PropTypes.string,
  IconType: PropTypes.func
}

export const mapStateToEventCardProps = (state, ownProps) => {
  const { event, ticketId } = ownProps
  const eventType = state.eventTypes.records[event.eventTypeId]
  const ticket = state.tickets.map[ticketId]
  const IconType = Icons[eventType.icon]

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
