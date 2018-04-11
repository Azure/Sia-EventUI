import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { DateTime } from 'luxon'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import Playbook from 'components/Timeline/Playbook/Playbook'
import { GetQualifiedActions, LoadTextFromEvent } from 'services/playbookService'
import timeFormattedToMultipleZones from 'helpers/timeFormattedToMultipleZones'

const isAllPlaybookInfoAvailable = (actions) =>
  !!(actions && Array.isArray(actions) && actions.length > 0)

export const EventCard = ({
  event,
  titleText
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
    avatar={EventTypeIcon(event.eventTypeId)}
  />
  <CardText>
    <Playbook
      eventId={event.id}
      eventTypeId={event.eventTypeId}
      ticketId={ticketId}
      incidentId={incidentId}
    />
  </CardText>
</Card>

EventCard.propTypes ={
  event: PropTypes.object.isRequired,
}

export const mapStateToEventCardProps = (state, ownProps) => {
  const { event } = ownProps
  const eventType = state.eventTypes.records[event.eventTypeId]
  const ticket = state.tickets.map[ownProps.ticketId]

  return {
    event,
    titleText: LoadTextFromEvent(event, eventType, ticket)
  }
}