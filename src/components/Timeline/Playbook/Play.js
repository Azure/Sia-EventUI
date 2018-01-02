import React from 'react'
import { connect } from 'react-redux'
import FlatButtonStyled from '../../../components/elements/FlatButtonStyled'
import { fillTemplate, publishEvent } from '../../../services/playbookService'

export const Play = ({incidentId, isUrl, filledTemplate, name}) => {
    return isUrl ? <a href={filledTemplate} target="_blank">Link: {name}</a>
                 : <FlatButtonStyled
                        label={'Publish Event: ' + name}
                        onTouchTap={publishEvent(incidentId, filledTemplate)}
                    />
}

export const mapStateToPlayProps = (state, ownProps) => {
    const eventType = state.eventTypes.records[ownProps.eventTypeId]
    const event = state.events.list.list.find(event => event.id === ownProps.eventId)
    const ticket = state.tickets.map[ownProps.ticketId]
    const engagement = state.engagements.list.find(engagement => engagement.id === ownProps.engagementId)
    const action = ownProps.action
    const filledTemplate = action ? fillTemplate(action.actionTemplate, event, ticket, eventType, engagement) : ''
  
    return {
        ...ownProps,
        isUrl: action.actionTemplate.isUrl,
        name: action.actionTemplate.name,
        filledTemplate
    }
}

export default connect(mapStateToPlayProps)(Play)
