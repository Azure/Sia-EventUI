'use strict'
import { expect } from 'chai'
import * as eventTypeActions from '../../../src/actions/Playbook/eventTypeActions.js'
import ActionTemplateSourceReducer from '../../../src/reducers/Playbook/ActionTemplateSourceReducer'

const defaultState = {}

const existingActionTemplateSourceId = 1
const newActionTemplateSourceId = 2
const additionalActionTemplateSourceId = 3

const newActionTemplateSourceParentId = 1
const existingActionTemplateSourceParentId = 2
const additionalActionTemplateSourceParentId = 3

const existingActionTemplateSourceState = {
    [existingActionTemplateSourceId]: {
        name: 'Already In Reducer',
        actionTemplateId: existingActionTemplateSourceParentId
    }
}

const eventTypeWithNoActionTemplateSource = {
}

const eventTypeWithNewActionTemplateSource = {
    actions: [
        {
            actionTemplate: {
                id: newActionTemplateSourceParentId,
                sources: [{
                    id: newActionTemplateSourceId,
                    name: 'New'
                }]
            }
        }
    ]
}

const eventTypeWithOverriddenActionTemplateSource = {
    actions: [
        {
            actionTemplate: {
                id: newActionTemplateSourceParentId,
                sources: [{
                    id: existingActionTemplateSourceId,
                    name: 'Overriding'
                }]
            }
        }
    ]
}

const eventTypeWithMultipleActionTemplateSources = {
    actions: [
        {
            actionTemplate: {
                id: existingActionTemplateSourceParentId,
                sources: [{
                    id: existingActionTemplateSourceId,
                    name: 'Overriding'
                }]
            }
        },
        {
            actionTemplate: {
                id: additionalActionTemplateSourceParentId,
                sources: [{
                    id: additionalActionTemplateSourceId,
                    name: 'Additional'
                }]
            }
        }
    ]
}

const noActionTemplateSourceFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithNoActionTemplateSource)
const noActionTemplateSourceFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithNoActionTemplateSource)
const newActionTemplateSourceFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithNewActionTemplateSource)
const newActionTemplateSourceFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithNewActionTemplateSource)
const overridingActionTemplateSourceFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithOverriddenActionTemplateSource)
const overridingActionTemplateSourceFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithOverriddenActionTemplateSource)
const multipleActionTemplateSourcesFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithMultipleActionTemplateSources)
const multipleActionTemplateSourcesFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithMultipleActionTemplateSources)

describe('ActionTemplateSource Reducer', function () {
    describe('Default State', function () {
        describe('EventType Actions', function () {
            describe('No ActionTemplateSource', function () {
                before(function () {
                    this.resultFromGet = ActionTemplateSourceReducer(defaultState, noActionTemplateSourceFromFetchedEventType)
                    this.resultFromPost = ActionTemplateSourceReducer(defaultState, noActionTemplateSourceFromPostedEventType)
                })
        
                it('Should remain empty', function () {
                    expect(this.resultFromGet).to.exist
                    expect(this.resultFromPost).to.exist
                    expect(Object.keys(this.resultFromGet).length).to.equal(0)
                    expect(Object.keys(this.resultFromPost).length).to.equal(0)
                })
            })
            
            describe('New ActionTemplateSource', function () {
                before(function () {
                    this.resultFromGet = ActionTemplateSourceReducer(defaultState, newActionTemplateSourceFromFetchedEventType)
                    this.resultFromPost = ActionTemplateSourceReducer(defaultState, newActionTemplateSourceFromPostedEventType)
                })
        
                it('Should add new ActionTemplateSources by Id', function () {
                    expect(this.resultFromGet[newActionTemplateSourceId].name).to.equal('New')
                    expect(this.resultFromPost[newActionTemplateSourceId].name).to.equal('New')
                })
    
                it('Should add new actions with correct parent id', function () {
                    expect(this.resultFromGet[newActionTemplateSourceId].actionTemplateId).to.equal(1)
                    expect(this.resultFromPost[newActionTemplateSourceId].actionTemplateId).to.equal(1)
                })
            })
    
            describe('Overriding ActionTemplateSource', function () {
                before(function () {
                    this.resultFromGet = ActionTemplateSourceReducer(defaultState, overridingActionTemplateSourceFromFetchedEventType)
                    this.resultFromPost = ActionTemplateSourceReducer(defaultState, overridingActionTemplateSourceFromPostedEventType)
                })
        
                it('Should overwrite existing action by Id', function () {
                    expect(this.resultFromGet[existingActionTemplateSourceId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingActionTemplateSourceId].name).to.equal('Overriding')
                })
    
                it('Should add new actions with correct parent id', function () {
                    expect(this.resultFromGet[existingActionTemplateSourceId].actionTemplateId).to.equal(1)
                    expect(this.resultFromPost[existingActionTemplateSourceId].actionTemplateId).to.equal(1)
                })
            })
    
            describe('Multiple ActionTemplateSources', function () {
                before(function () {
                    this.resultFromGet = ActionTemplateSourceReducer(defaultState, multipleActionTemplateSourcesFromFetchedEventType)
                    this.resultFromPost = ActionTemplateSourceReducer(defaultState, multipleActionTemplateSourcesFromPostedEventType)
                })
        
                it('Should merge actions to state by Id', function () {
                    expect(this.resultFromGet[existingActionTemplateSourceId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingActionTemplateSourceId].name).to.equal('Overriding')
                    expect(this.resultFromGet[additionalActionTemplateSourceId].name).to.equal('Additional')
                    expect(this.resultFromPost[additionalActionTemplateSourceId].name).to.equal('Additional')
                })
    
                it('Should add new actions with correct parent id', function () {
                    expect(this.resultFromGet[existingActionTemplateSourceId].actionTemplateId).to.equal(existingActionTemplateSourceParentId)
                    expect(this.resultFromPost[existingActionTemplateSourceId].actionTemplateId).to.equal(existingActionTemplateSourceParentId)
                    expect(this.resultFromGet[additionalActionTemplateSourceId].actionTemplateId).to.equal(additionalActionTemplateSourceParentId)
                    expect(this.resultFromPost[additionalActionTemplateSourceId].actionTemplateId).to.equal(additionalActionTemplateSourceParentId)
                })
            })
        })
    })
    describe('Existing ActionTemplateSource State', function () {
        describe('EventType Actions', function () {
            describe('No ActionTemplateSource', function () {
                before(function () {
                    this.resultFromGet = ActionTemplateSourceReducer(existingActionTemplateSourceState, noActionTemplateSourceFromFetchedEventType)
                    this.resultFromPost = ActionTemplateSourceReducer(existingActionTemplateSourceState, noActionTemplateSourceFromPostedEventType)
                })
        
                it('Should retain only preexisting action', function () {
                    expect(Object.keys(this.resultFromGet).length).to.equal(1)
                    expect(Object.keys(this.resultFromPost).length).to.equal(1)
                    expect(this.resultFromGet[existingActionTemplateSourceId].name).to.equal('Already In Reducer')
                    expect(this.resultFromPost[existingActionTemplateSourceId].name).to.equal('Already In Reducer')
                })
            })

            describe('New ActionTemplateSource', function () {
                before(function () {
                    this.resultFromGet = ActionTemplateSourceReducer(existingActionTemplateSourceState, newActionTemplateSourceFromFetchedEventType)
                    this.resultFromPost = ActionTemplateSourceReducer(existingActionTemplateSourceState, newActionTemplateSourceFromPostedEventType)
                })
        
                it('Should add new ActionTemplateSources by Id', function () {
                    expect(this.resultFromGet[newActionTemplateSourceId].name).to.equal('New')
                    expect(this.resultFromPost[newActionTemplateSourceId].name).to.equal('New')
                    expect(this.resultFromGet[existingActionTemplateSourceId].name).to.equal('Already In Reducer')
                    expect(this.resultFromPost[existingActionTemplateSourceId].name).to.equal('Already In Reducer')
                })

                it('Should add new ActionTemplateSources with correct parent id', function () {
                    expect(this.resultFromGet[newActionTemplateSourceId].actionTemplateId).to.equal(1)
                    expect(this.resultFromPost[newActionTemplateSourceId].actionTemplateId).to.equal(1)
                    expect(this.resultFromGet[existingActionTemplateSourceId].actionTemplateId).to.equal(2)
                    expect(this.resultFromPost[existingActionTemplateSourceId].actionTemplateId).to.equal(2)
                })
            })

            describe('Overriding ActionTemplateSource', function () {
                before(function () {
                    this.resultFromGet = ActionTemplateSourceReducer(existingActionTemplateSourceState, overridingActionTemplateSourceFromFetchedEventType)
                    this.resultFromPost = ActionTemplateSourceReducer(existingActionTemplateSourceState, overridingActionTemplateSourceFromPostedEventType)
                })
        
                it('Should overwrite existing ActionTemplateSource by Id', function () {
                    expect(this.resultFromGet[existingActionTemplateSourceId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingActionTemplateSourceId].name).to.equal('Overriding')
                })

                it('Should add new ActionTemplateSources with correct parent id', function () {
                    expect(this.resultFromGet[existingActionTemplateSourceId].actionTemplateId).to.equal(1)
                    expect(this.resultFromPost[existingActionTemplateSourceId].actionTemplateId).to.equal(1)
                })
            })

            describe('Multiple ActionTemplateSource', function () {
                before(function () {
                    this.resultFromGet = ActionTemplateSourceReducer(existingActionTemplateSourceState, multipleActionTemplateSourcesFromFetchedEventType)
                    this.resultFromPost = ActionTemplateSourceReducer(existingActionTemplateSourceState, multipleActionTemplateSourcesFromPostedEventType)
                })
        
                it('Should merge ActionTemplateSources to state by id', function () {
                    expect(this.resultFromGet[existingActionTemplateSourceId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingActionTemplateSourceId].name).to.equal('Overriding')
                    expect(this.resultFromGet[additionalActionTemplateSourceId].name).to.equal('Additional')
                    expect(this.resultFromPost[additionalActionTemplateSourceId].name).to.equal('Additional')
                })

                it('Should add new ActionTemplateSources with correct parent id', function () {
                    expect(this.resultFromGet[existingActionTemplateSourceId].actionTemplateId).to.equal(existingActionTemplateSourceParentId)
                    expect(this.resultFromPost[existingActionTemplateSourceId].actionTemplateId).to.equal(existingActionTemplateSourceParentId)
                    expect(this.resultFromGet[additionalActionTemplateSourceId].actionTemplateId).to.equal(additionalActionTemplateSourceParentId)
                    expect(this.resultFromPost[additionalActionTemplateSourceId].actionTemplateId).to.equal(additionalActionTemplateSourceParentId)
                })
            })
        })
    })
})