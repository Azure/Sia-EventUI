import React from 'react'
import { connect } from 'react-redux'
import ByPath from 'object-path'
import Play from './Play'
import { selectSourceObject } from './Play'

export const Playbook = ({eventTypeId, eventId, incidentId, ticketId, engagementId, actions}) => {
    let localKey = 0
    return  <div>{
                actions.map(action =>
                <div key={localKey++}>
                    <span>
                        {action.name}
                    </span>
                    <br/>
                    <Play
                        action={action}
                        eventTypeId={eventTypeId}
                        eventId={eventId}
                        incidentId={incidentId}
                        ticketId={ticketId}
                        engagementId={engagementId}
                    />
                </div>
                )
            }</div>
}

export const mapStateToProps = (state, ownProps) => {
    const auth = state.auth
    const eventType = state.playbook.eventTypes[ownProps.eventTypeId]
    const event = Object.values(state.events.list).find(event => event.id == ownProps.eventId)
    const ticket = state.tickets.map[ownProps.ticketId]
    const engagement = state.engagements.list.find(
        engagement => engagement.incidentId == ownProps.incidentId
        && engagement.participant.alias == auth.userAlias
        && engagement.particpant.team == auth.userTeam
        && engagement.participant.role == auth.userRole
    )
    const actions = Object.values(state.playbook.actions).filter(action => action.eventTypeId === ownProps.eventTypeId)
    const conditionSets = actions
        .map(action => Object.values(state.playbook.conditionSets).filter(conditionSet => conditionSet.actionId === action.id))
        .reduce((accum, current) => accum.concat(current), [])
    const conditionSetIds = conditionSets
        .map(conditionSet => conditionSet.id)
        .reduce((existingIds, newId) => existingIds.includes(newId) ? existingIds : existingIds.concat([newId]), [])
    const conditions = Object.values(state.playbook.conditions).filter(
        condition => conditionSetIds.includes(condition.conditionSetId)
    )
    const conditionIds = conditions.map(condition => condition.id)
    const conditionSources = Object.values(state.playbook.conditionSources).filter(
        conditionSource => conditionIds.includes(conditionSource.conditionId)
    )
    const conditionData = conditionSources.map(
        conditionSource => ({
            [conditionSource.conditionId]: ByPath.get(
                selectSourceObject(conditionSource.sourceObject, event, ticket, eventType, engagement),
                conditionSource.key
            )
        })
    ).reduce(ByAccumulatingProperties, {})
    const metConditions = conditions.filter(condition => TestCondition(condition, conditionData[condition.id]))
    const metConditionSets = conditionSets.filter(conditionSet => TestConditionSet(conditionSet, conditions, metConditions))
    const qualifiedActions = actions.filter(
        action => conditionSets.filter(
            conditionSet => conditionSet.actionId === action.id
        ).length === metConditionSets.filter(
            conditionSet => conditionSet.actionId == action.id
        ).length
    )
    return {
        actions: qualifiedActions,
        engagementId: engagement ? engagement.id : null,
        ...ownProps
    }
}

export default connect(mapStateToProps)(Playbook)



const ByAccumulatingProperties = (existingObject, additionalProperty) => Object.assign(existingObject, additionalProperty)

const TestCondition = (condition, dataValue) => {
    const testResult = TestByConditionType(condition, dataValue)
    return condition.ConditionType === 1 ? testResult : !testResult
}

const TestByConditionType = (condition, dataValue) => {
    let comparisonValue
    switch(condition.dataFormat)
    {
        case 1: //string
            comparisonValue = condition.comparisonValue
            break
        case 2: //datetime
            comparisonValue = condition.dateTimeComparisonValue
            break
        default: //int
            comparisonValue = condition.integerComparisonValue
    }
    switch(condition.conditionType)
    {
        //contains
        case 2: return dataValue.includes(comparisonValue)
        //has value
        case 3: return !!dataValue
        //greater than
        case 4: return dataValue > comparisonValue
        //less than
        case 5: return comparisonValue > dataValue
        //equals
        default: return dataValue === comparisonValue
    }
}

const TestConditionSet = (conditionSet, conditions, metConditions) => {
    const associatedWithThisConditionSet = (condition) => condition.conditionSetId == conditionSet.id
    switch(conditionSet.type)
    {
        case 1: //Any of
            return !!metConditions.find(associatedWithThisConditionSet)
        case 2: //All of
            return metConditions.filter(associatedWithThisConditionSet).length === conditions.filter(associatedWithThisConditionSet).length
        default: //noneOf
            return metConditions.filter(associatedWithThisConditionSet).length === 0
    }
}