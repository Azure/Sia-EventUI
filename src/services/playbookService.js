import moment from 'moment'
import ByPath from 'object-path'
import * as eventTypeActions from '../actions/eventTypeActions'
import * as eventActions from '../actions/eventActions'

export const IsBootstrapNeeded = (eventType, isFetching, isError) =>
    !eventType
    && !isFetching
    && !isError

export const BootstrapIfNeeded = ({eventTypeId, eventType, isFetching, isError, dispatch}) => {
    if(IsBootstrapNeeded(eventType, isFetching, isError))
    {
        dispatch(eventTypeActions.fetchEventType(eventTypeId))
    }
}

export const selectSourceObject = (sourceObjectEnum, event, ticket, eventType, engagement) => {
    switch(sourceObjectEnum){
        case 0: return event
        case 1: return ticket
        case 2: return eventType
        case 3: return engagement
        default: return null //not sure if there's a better behavior for undefined enum
    }
}

export const GetComparisonValue = (condition) => {
    switch(condition.dataFormat)
    {
        case 0: //string
            return condition.comparisonValue
        case 1: //datetime
            return condition.dateTimeComparisonValue
                ? moment.utc(condition.dateTimeComparisonValue)
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
        case 1: return value && value.includes(comparisonValue)
        //has value
        case 2: return !!value
        //greater than
        case 3: return value && (value > comparisonValue)
        //less than
        case 4:
            return value && (comparisonValue > value)
        //equals
        default: return value === comparisonValue
    }
}

export const TestByConditionType = testableTestByConditionType(GetComparisonValue)

export const testableTestCondition = (testByConditionType) => (condition) => {
    const testResult = testByConditionType(condition)
    return condition.AssertionType === 0
        ? !testResult
        : testResult
}

export const TestCondition = testableTestCondition(TestByConditionType)

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
        case 0: //Any of
            return metConditionsCount > 0
        case 1: //All of
            return metConditionsCount === conditionsWithValue.length
        case 2: //noneOf
            return metConditionsCount === 0
        default: //Not All Of
            return metConditionsCount < conditionsWithValue.length
    }
}

export const TestConditionSet = testableTestConditionSet(selectSourceObject, TestCondition)

export const testableFillTemplate = (selectSource) => (template, event, ticket, eventType, engagement) => {
    if(!template || !template.pattern) return ''
    const templateSourcesWithData = template.sources
        ? template.sources.map(
                source => Object.assign({}, source, {dataValue: ByPath.get(
                selectSource(source.sourceObject, event, ticket, eventType, engagement),
                source.key
            )})
        ): []
    let filledTemplate = template.pattern
    templateSourcesWithData.forEach(source => {
        filledTemplate = filledTemplate.replace('${' + source.name + '}', source.dataValue)
    })
    return filledTemplate
}

export const fillTemplate = testableFillTemplate(selectSourceObject)

export const LoadTextFromEvent = (event, eventType, ticket, engagement) => {
    return HasValidDisplayTemplatePattern(eventType) ? fillTemplate(eventType.displayTemplate, event, ticket, eventType, engagement)
    : HasValidDisplayText(event.data) ? event.data.DisplayText
    : HasValidName(eventType) ? eventType.name
    : HasValidData(event) ? JSON.stringify(event.data)
    :'This event has no text'
  }
  
  const HasValidDisplayTemplatePattern = (eventType) => {
    return eventType && eventType.displayTemplate && eventType.displayTemplate.pattern && eventType.displayTemplate.pattern.length > 0
  }
  
  const HasValidDisplayText = (data) => {
    return data && data.DisplayText && data.DisplayText.length > 0
  }
  
  const HasValidName = (eventType) => {
    return eventType && eventType.name && eventType.name.length > 0
  }
  
  const HasValidData = (event) => {
    return !!(event.data)
  }
  
export const publishEvent = (incidentId, filledTemplate) => () => (dispatch) => {
    const parsedTemplate = JSON.parse(filledTemplate)
    dispatch(eventActions.postEvent(incidentId, parsedTemplate.id, parsedTemplate.data))
}
