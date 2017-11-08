import React from 'react'
import { connect } from 'react-redux'
import ByPath from 'object-path'
import Play from './Play'
import { selectSourceObject } from './Play'

export const Playbook = ({eventTypeId, eventId, incidentId, ticketId, engagementId, actions}) => {
    let localKey = 0
    return  <div>{
                actions 
                ? actions.map(action =>
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
                    </div>)
                : <div>Fetching action options...</div>
            }</div>
}

export const mapStateToProps = (state, ownProps) => {
    const auth = state.auth
    const eventType = state.eventTypes.records[ownProps.eventTypeId]
    const event = Object.values(state.events.list).find(event => event.id == ownProps.eventId)
    const ticket = state.tickets.map[ownProps.ticketId]
    const engagement = state.engagements.list.find(
        engagement => engagement.incidentId == ownProps.incidentId
        && engagement.participant.alias == auth.userAlias
        && engagement.particpant.team == auth.userTeam
        && engagement.participant.role == auth.userRole
    )
    const actions = eventType.actions
    const qualifiedActions = actions.filter(
        action => action.conditionSets.reduce(
            (allConditionSetsMet, currentConditionSet) => allConditionsMet 
                ? TestConditionSet(currentConditionSet)
                : false,
            true
        )
    )
    return {
        actions: qualifiedActions,
        engagementId: engagement ? engagement.id : null,
        ...ownProps
    }
}

export default connect(mapStateToProps)(Playbook)


const TestCondition = (condition) => {
    const testResult = TestByConditionType(condition)
    return condition.ConditionType === 1 ? testResult : !testResult
}

const TestByConditionType = (condition) => {
    let comparisonValue
    let value = condition ? condition.value : null
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
        case 2: return value && value.includes(comparisonValue)
        //has value
        case 3: return !!value
        //greater than
        case 4: return value && value > comparisonValue
        //less than
        case 5: return value && comparisonValue > value
        //equals
        default: return value === comparisonValue
    }
}


const TestConditionSet = (conditionSet) => {
    const conditionsWithValue = conditionSet.conditions 
        ? conditionSet.conditions
            .map(condition => condition.conditionSource 
                ? ({
                    ...condition,
                    value: ByPath.get(
                        selectSourceObject(condition.conditionSource.sourceObject, event, ticket, eventType, engagement),
                        condition.conditionSource.key
                    )
                })
                : ({
                    ...condition,
                    value: null
                })
            )
        : []
    switch(conditionSet.type)
    {
        case 1: //Any of
            return conditions.map(TestCondition).filter(b => b).length > 0
        case 2: //All of
            return conditions.map(TestCondition).filter(b => b).length === conditions.length
        case 3: //Not All Of
            return conditions.map(TestCondition).filter(b => b).length < conditions.length
        default: //noneOf
            return conditions.map(TestCondition).filter(b => b).length === 0
    }
}