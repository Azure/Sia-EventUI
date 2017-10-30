import { combineReducers } from 'redux'
import eventTypes from './eventTypeReducer'
import actions from './actionReducer'
import actionTemplates from './actionTemplateReducer'
import actionTemplateSources from './actionTemplateSourceReducer'
import conditions from './conditionReducer'
import conditionSets from './conditionSetReducer'
import conditionSources from './conditionSourceReducer'

const playbookReducer = combineReducers({
    eventTypes,
    actions,
    actionTemplates,
    actionTemplateSources,
    conditions,
    conditionSets,
    conditionSources
})

export default playbookReducer