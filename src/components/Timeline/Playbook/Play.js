import React from 'react'
import { connect } from 'react-redux'
import ByPath from 'object-path'
import FlatButtonStyled from '../../../components/elements/FlatButtonStyled'


export const Play = ({incidentId, isUrl, filledTemplate, name, eventActions, dispatch}) => {
    return isUrl ? <a href={filledTemplate}>Link: {name}</a>
                 : <FlatButtonStyled
                        label={'Publish Event: ' + name}
                        onTouchTap={publishEvent(incidentId, eventActions, dispatch)(filledTemplate)}
                    />
}

export const mapStateToProps = (state, ownProps) => {
    const eventType = state.eventTypes.records[ownProps.eventTypeId]
    const event = state.events.list.find(event => event.id === ownProps.eventId)
    const ticket = state.tickets.map[ownProps.ticketId]
    const engagement = state.engagements.list.find(engagement => engagement.id === ownProps.engagementId)
    const action = ownProps.action
    const actionTemplate = action.actionTemplate
    const actionTemplateSources = actionTemplate.sources
    const actionTemplateSourcesWithData = actionTemplateSources.map(
        templateSource => Object.assign({}, templateSource, {dataValue: ByPath.get(
            selectSourceObject(templateSource.sourceObject, event, ticket, eventType, engagement),
            templateSource.key
        )})
    )
    let filledTemplate = actionTemplate.template
    actionTemplateSourcesWithData.forEach(source => {
        filledTemplate = filledTemplate.replace('${' + source.name + '}', source.dataValue)
    })
    return {
        ...ownProps,
        isUrl: actionTemplate.isUrl,
        name: actionTemplate.name,
        filledTemplate
    }
}

const publishEvent = (incidentId, eventActions, dispatch) => (filledTemplate) => () => {
    const parsedTemplate = JSON.parse(filledTemplate)
    dispatch(eventActions.postEvent(incidentId, parsedTemplate.id, parsedTemplate.data))
}

export default connect(mapStateToProps)(Play)

export const selectSourceObject = (sourceObjectEnum, event, ticket, eventType, engagement) => {
    switch(sourceObjectEnum){
        case 1: return event
        case 2: return ticket
        case 3: return eventType
        case 4: return engagement
        default: return null //not sure if there's a better behavior for undefined enum
    }
}