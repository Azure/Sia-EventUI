import React from 'react'
import { connect } from 'react-redux'

import FlatButtonStyled from 'components/elements/FlatButtonStyled'
import { fillTemplate, publishEvent } from 'services/playbookService'
import appInsights from '../../../appInsights'

const trackLinkClick = (name) => {
  appInsights.trackEvent(name + ' Clicked')
}

export const Play = ({incidentId, isUrl, filledTemplate, name}) =>
  isUrl
  ? <FlatButtonStyled
    label={name}
    primary
    href={filledTemplate}
    target='_blank'
    onTouchTap={() => trackLinkClick(name)}
  />
  : <FlatButtonStyled
    label={'Publish ' + name}
    primary
    onTouchTap={publishEvent(incidentId, filledTemplate)}
  />

export const mapStateToPlayProps = (fillTemplate) => (state, ownProps) => {
  const { eventTypeId, eventId, ticketId, action } = ownProps

  const eventType = state.eventTypes.records[eventTypeId]
  const event = state.events.pages.list.find(event => event.id === eventId)
  const ticket = state.tickets.map[ticketId]
  const filledTemplate = action ? fillTemplate(action.actionTemplate, event, ticket, eventType) : ''

  return {
    incidentId: event
      ? event.incidentId
      : ticket
        ? ticket.incidentId
        : null,
    isUrl: action.actionTemplate.isUrl,
    name: action.actionTemplate.name,
    filledTemplate
  }
}

export default connect(mapStateToPlayProps(fillTemplate))(Play)
