import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import ByPath from 'object-path'
import Play from './Play'
import { selectSourceObject } from './Play'

export const Playbook = ({eventTypeId, eventId, incidentId, ticketId, engagementId, actions, eventActions, eventTypeActions}) => {
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
                            eventActions={eventActions}
                            eventTypeActions={eventTypeActions}
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
        engagement => engagement
        && engagement.incidentId == ownProps.incidentId
        && engagement.participant
        && engagement.participant.alias == auth.userAlias
        && engagement.participant.team == auth.userTeam
        && engagement.participant.role == auth.userRole
    )
    const actions = eventType.actions
    var populatedConditionSetTest = TestConditionSet(event, ticket, eventType, engagement)
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
        engagementId: engagement ? engagement.id : null,
        ...ownProps
    }
}

export default connect(mapStateToProps)(Playbook)

export const GetComparisonValue = (condition) => {
    switch(condition.dataFormat)
    {
        case 1: //string
            return condition.comparisonValue
        case 2: //datetime
            return condition.dateTimeComparisonValue 
                ? moment(condition.dateTimeComparisonValue)
                : condition.dateTimeComparisonValue
        default: //int
            return condition.integerComparisonValue
    }
}

export const testableTestByConditionType = (getComparisonValue) => (condition) => {
    const comparisonValue = getComparisonValue(condition)
    const value = condition ? condition.value : null
    switch(condition.conditionType)
    {
        //contains
        case 2: return value && value.includes(comparisonValue)
        //has value
        case 3: return !!value
        //greater than
        case 4: return value && (value > comparisonValue)
        //less than
        case 5: 
            return value && (comparisonValue > value)
        //equals
        default: return value === comparisonValue
    }
}

const TestByConditionType = testableTestByConditionType(GetComparisonValue)

export const testableTestCondition = (testByConditionType) => (condition) => {
    const testResult = testByConditionType(condition)
    return condition.ConditionType === 1 ? testResult : !testResult
}

const TestCondition = testableTestCondition(TestByConditionType)

export const testableTestConditionSet = (select, testCondition) => (event, ticket, eventType, engagement) => (conditionSet) => {
    const conditionsWithValue = conditionSet.conditions
        ? conditionSet.conditions
            .map(condition => condition.conditionSource
                ? ({
                    ...condition,
                    value: ByPath.get(
                        select(condition.conditionSource.sourceObject, event, ticket, eventType, engagement),
                        condition.conditionSource.key
                    )
                })
                : ({
                    ...condition,
                    value: null
                })
            )
        : []
    const metConditionsCount = conditionsWithValue.map(testCondition).filter(b => b).length
    switch(conditionSet.type)
    {
        case 1: //Any of
            return metConditionsCount > 0
        case 2: //All of
            return metConditionsCount === conditionsWithValue.length
        case 3: //Not All Of
            return metConditionsCount < conditionsWithValue.length
        default: //noneOf
            return metConditionsCount === 0
    }
}

const TestConditionSet = testableTestConditionSet(selectSourceObject, TestCondition)