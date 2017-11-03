'use strict'
import { expect } from 'chai'
import * as eventTypeActions from '../../../src/actions/Playbook/eventTypeActions.js'
import ActionTemplateReducer from '../../../src/reducers/Playbook/actionTemplateReducer'

const defaultState = {}

const existingActionTemplateId = 1
const newActionTemplateId = 2
const additionalActionTemplateId = 3

const newActionTemplateParentId = 1
const existingActionTemplateParentId = 2
const additionalActionTemplateParentId = 3

const existingActionTemplateState = {
    [existingActionTemplateId]: {
        name: 'Already In Reducer',
        actionId: existingActionTemplateParentId
    }
}

const eventTypeWithNoActionTemplate = {
}

const eventTypeWithNewActionTemplate = {
    actions: [
        {
            id: newActionTemplateParentId,
            actionTemplate: {
                id: newActionTemplateId,
                name: 'New'
            }
        }
    ]
}

const eventTypeWithOverriddenActionTemplate = {
    actions: [
        {
            id: newActionTemplateParentId,
            actionTemplate: {
                id: existingActionTemplateId,
                name: 'Overriding'
            }
        }
    ]
}

const eventTypeWithMultipleActionTemplates = {
    actions: [
        {
            id: existingActionTemplateParentId,
            actionTemplate: {
                id: existingActionTemplateId,
                name: 'Overriding'
            }
        },
        {
            id: additionalActionTemplateParentId,
            actionTemplate: {
                id: additionalActionTemplateId,
                name: 'Additional'
            }
        }
    ]
}

const noActionTemplateFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithNoActionTemplate)
const noActionTemplateFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithNoActionTemplate)
const newActionTemplateFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithNewActionTemplate)
const newActionTemplateFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithNewActionTemplate)
const overridingActionTemplateFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithOverriddenActionTemplate)
const overridingActionTemplateFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithOverriddenActionTemplate)
const multipleActionTemplatesFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithMultipleActionTemplates)
const multipleActionTemplatesFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithMultipleActionTemplates)

describe('ActionTemplate Reducer', function () {
    describe('Default State', function () {
        describe('EventType Actions', function () {
            describe('No ActionTemplate', function () {
                before(function () {
                    this.resultFromGet = ActionTemplateReducer(defaultState, noActionTemplateFromFetchedEventType)
                    this.resultFromPost = ActionTemplateReducer(defaultState, noActionTemplateFromPostedEventType)
                })
        
                it('Should remain empty', function () {
                    expect(this.resultFromGet).to.exist
                    expect(this.resultFromPost).to.exist
                    expect(Object.keys(this.resultFromGet).length).to.equal(0)
                    expect(Object.keys(this.resultFromPost).length).to.equal(0)
                })
            })
            
            describe('New ActionTemplate', function () {
                before(function () {
                    this.resultFromGet = ActionTemplateReducer(defaultState, newActionTemplateFromFetchedEventType)
                    this.resultFromPost = ActionTemplateReducer(defaultState, newActionTemplateFromPostedEventType)
                })
        
                it('Should add new ActionTemplates by Id', function () {
                    expect(this.resultFromGet[newActionTemplateId].name).to.equal('New')
                    expect(this.resultFromPost[newActionTemplateId].name).to.equal('New')
                })

                it('Should add new actions with correct parent id', function () {
                    expect(this.resultFromGet[newActionTemplateId].actionId).to.equal(1)
                    expect(this.resultFromPost[newActionTemplateId].actionId).to.equal(1)
                })
            })

            describe('Overriding ActionTemplate', function () {
                before(function () {
                    this.resultFromGet = ActionTemplateReducer(defaultState, overridingActionTemplateFromFetchedEventType)
                    this.resultFromPost = ActionTemplateReducer(defaultState, overridingActionTemplateFromPostedEventType)
                })
        
                it('Should overwrite existing action by Id', function () {
                    expect(this.resultFromGet[existingActionTemplateId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingActionTemplateId].name).to.equal('Overriding')
                })

                it('Should add new actions with correct parent id', function () {
                    expect(this.resultFromGet[existingActionTemplateId].actionId).to.equal(1)
                    expect(this.resultFromPost[existingActionTemplateId].actionId).to.equal(1)
                })
            })

            describe('Multiple ActionTemplates', function () {
                before(function () {
                    this.resultFromGet = ActionTemplateReducer(defaultState, multipleActionTemplatesFromFetchedEventType)
                    this.resultFromPost = ActionTemplateReducer(defaultState, multipleActionTemplatesFromPostedEventType)
                })
        
                it('Should merge actions to state by Id', function () {
                    expect(this.resultFromGet[existingActionTemplateId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingActionTemplateId].name).to.equal('Overriding')
                    expect(this.resultFromGet[additionalActionTemplateId].name).to.equal('Additional')
                    expect(this.resultFromPost[additionalActionTemplateId].name).to.equal('Additional')
                })

                it('Should add new actions with correct parent id', function () {
                    expect(this.resultFromGet[existingActionTemplateId].actionId).to.equal(existingActionTemplateParentId)
                    expect(this.resultFromPost[existingActionTemplateId].actionId).to.equal(existingActionTemplateParentId)
                    expect(this.resultFromGet[additionalActionTemplateId].actionId).to.equal(additionalActionTemplateParentId)
                    expect(this.resultFromPost[additionalActionTemplateId].actionId).to.equal(additionalActionTemplateParentId)
                })
            })
        })
    })
    describe('Existing ActionTemplate State', function () {
        describe('EventType Actions', function () {
            describe('No ActionTemplate', function () {
                before(function () {
                    this.resultFromGet = ActionTemplateReducer(existingActionTemplateState, noActionTemplateFromFetchedEventType)
                    this.resultFromPost = ActionTemplateReducer(existingActionTemplateState, noActionTemplateFromPostedEventType)
                })
        
                it('Should retain only preexisting action', function () {
                    expect(Object.keys(this.resultFromGet).length).to.equal(1)
                    expect(Object.keys(this.resultFromPost).length).to.equal(1)
                    expect(this.resultFromGet[existingActionTemplateId].name).to.equal('Already In Reducer')
                    expect(this.resultFromPost[existingActionTemplateId].name).to.equal('Already In Reducer')
                })
            })

            describe('New ActionTemplate', function () {
                before(function () {
                    this.resultFromGet = ActionTemplateReducer(existingActionTemplateState, newActionTemplateFromFetchedEventType)
                    this.resultFromPost = ActionTemplateReducer(existingActionTemplateState, newActionTemplateFromPostedEventType)
                })
        
                it('Should add new ActionTemplates by Id', function () {
                    expect(this.resultFromGet[newActionTemplateId].name).to.equal('New')
                    expect(this.resultFromPost[newActionTemplateId].name).to.equal('New')
                    expect(this.resultFromGet[existingActionTemplateId].name).to.equal('Already In Reducer')
                    expect(this.resultFromPost[existingActionTemplateId].name).to.equal('Already In Reducer')
                })

                it('Should add new ActionTemplates with correct parent id', function () {
                    expect(this.resultFromGet[newActionTemplateId].actionId).to.equal(1)
                    expect(this.resultFromPost[newActionTemplateId].actionId).to.equal(1)
                    expect(this.resultFromGet[existingActionTemplateId].actionId).to.equal(2)
                    expect(this.resultFromPost[existingActionTemplateId].actionId).to.equal(2)
                })
            })

            describe('Overriding ActionTemplate', function () {
                before(function () {
                    this.resultFromGet = ActionTemplateReducer(existingActionTemplateState, overridingActionTemplateFromFetchedEventType)
                    this.resultFromPost = ActionTemplateReducer(existingActionTemplateState, overridingActionTemplateFromPostedEventType)
                })
        
                it('Should overwrite existing ActionTemplate by Id', function () {
                    expect(this.resultFromGet[existingActionTemplateId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingActionTemplateId].name).to.equal('Overriding')
                })

                it('Should add new ActionTemplates with correct parent id', function () {
                    expect(this.resultFromGet[existingActionTemplateId].actionId).to.equal(1)
                    expect(this.resultFromPost[existingActionTemplateId].actionId).to.equal(1)
                })
            })

            describe('Multiple ActionTemplate', function () {
                before(function () {
                    this.resultFromGet = ActionTemplateReducer(existingActionTemplateState, multipleActionTemplatesFromFetchedEventType)
                    this.resultFromPost = ActionTemplateReducer(existingActionTemplateState, multipleActionTemplatesFromPostedEventType)
                })
        
                it('Should merge ActionTemplates to state by id', function () {
                    expect(this.resultFromGet[existingActionTemplateId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingActionTemplateId].name).to.equal('Overriding')
                    expect(this.resultFromGet[additionalActionTemplateId].name).to.equal('Additional')
                    expect(this.resultFromPost[additionalActionTemplateId].name).to.equal('Additional')
                })

                it('Should add new ActionTemplates with correct parent id', function () {
                    expect(this.resultFromGet[existingActionTemplateId].actionId).to.equal(existingActionTemplateParentId)
                    expect(this.resultFromPost[existingActionTemplateId].actionId).to.equal(existingActionTemplateParentId)
                    expect(this.resultFromGet[additionalActionTemplateId].actionId).to.equal(additionalActionTemplateParentId)
                    expect(this.resultFromPost[additionalActionTemplateId].actionId).to.equal(additionalActionTemplateParentId)
                })
            })
        })
    })
})