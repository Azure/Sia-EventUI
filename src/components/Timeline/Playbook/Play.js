import React from 'react'
import { connect } from 'react-redux'
import ByPath from 'object-path'
import FlatButtonStyled from '../../../components/elements/FlatButtonStyled'


export const Play = ({isUrl, filledTemplate, name}) => {
    return isUrl ? <a href={filledTemplate}>Link: {name}</a>
                 : <FlatButtonStyled
                        label={'Publish Event: ' + name}
                        //Todo: add event publish
                        onTouchTap={() => alert('Not yet implemented')}
                    />
}

export const mapStateToProps = (state, ownProps) => {
    const eventType = state.playbook.eventTypes[ownProps.eventTypeId]
    const event = state.events.list.find(event => event.id === ownProps.eventId)
    const ticket = state.tickets.map[ownProps.ticketId]
    const engagement = state.engagements.list.find(engagement => engagement.id === ownProps.engagementId)
    const action = ownProps.action
    const actionTemplate = Object.values(state.playbook.actionTemplates).find(template => template.actionId === action.id)
    const actionTemplateSources = Object.values(state.playbook.actionTemplateSources).filter(source => source.actionTemplateId === actionTemplate.id)
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
        isUrl: actionTemplate.isUrl,
        name: action.name,
        filledTemplate
    }
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