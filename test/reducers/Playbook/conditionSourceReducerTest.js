'use strict'
import { expect } from 'chai'
import * as eventTypeActions from '../../../src/actions/Playbook/eventTypeActions.js'
import ConditionSourceReducer from '../../../src/reducers/Playbook/ConditionSourceReducer'

const defaultState = {}

const existingConditionSourceId = 1
const newConditionSourceId = 2
const additionalConditionSourceId = 3

const newConditionSourceParentId = 1
const existingConditionSourceParentId = 2
const additionalConditionSourceParentId = 3

const existingConditionSourceState = {
    [existingConditionSourceId]: {
        name: 'Already In Reducer',
        conditionId: existingConditionSourceParentId
    }
}

const eventTypeWithNoConditionSource = {
}

const eventTypeWithNewConditionSource = {
    actions: [
        {
            conditionSets: [{
                conditions: [{
                    id: newConditionSourceParentId,
                    conditionSource: {
                        id: newConditionSourceId,
                        name: 'New'
                    }
                }]
            }]
        }
    ]
}

const eventTypeWithOverriddenConditionSource = {
    actions: [
        {
            conditionSets: [{
                conditions: [{
                    id: newConditionSourceParentId,
                    conditionSource: {
                        id: existingConditionSourceId,
                        name: 'Overriding'
                    }
                }]
            }]
        }
    ]
}

const eventTypeWithMultipleConditionSources = {
    actions: [
        {
            conditionSets: [{
                conditions: [{
                    id: existingConditionSourceParentId,
                    conditionSource: {
                        id: existingConditionSourceId,
                        name: 'Overriding'
                    }
                }]
            }]
        },
        {
            conditionSets: [{
                conditions: [{
                    id: additionalConditionSourceParentId,
                    conditionSource: {
                        id: additionalConditionSourceId,
                        name: 'Additional'
                    }
                }]
            }]
        }
    ]
}

const noConditionSourceFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithNoConditionSource)
const noConditionSourceFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithNoConditionSource)
const newConditionSourceFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithNewConditionSource)
const newConditionSourceFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithNewConditionSource)
const overridingConditionSourceFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithOverriddenConditionSource)
const overridingConditionSourceFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithOverriddenConditionSource)
const multipleConditionSourcesFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithMultipleConditionSources)
const multipleConditionSourcesFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithMultipleConditionSources)

describe('ConditionSource Reducer', function () {
    describe('Default State', function () {
        describe('EventType Actions', function () {
            describe('No ConditionSource', function () {
                before(function () {
                    this.resultFromGet = ConditionSourceReducer(defaultState, noConditionSourceFromFetchedEventType)
                    this.resultFromPost = ConditionSourceReducer(defaultState, noConditionSourceFromPostedEventType)
                })
        
                it('Should remain empty', function () {
                    expect(this.resultFromGet).to.exist
                    expect(this.resultFromPost).to.exist
                    expect(Object.keys(this.resultFromGet).length).to.equal(0)
                    expect(Object.keys(this.resultFromPost).length).to.equal(0)
                })
            })
            
            describe('New ConditionSource', function () {
                before(function () {
                    this.resultFromGet = ConditionSourceReducer(defaultState, newConditionSourceFromFetchedEventType)
                    this.resultFromPost = ConditionSourceReducer(defaultState, newConditionSourceFromPostedEventType)
                })
        
                it('Should add new ConditionSources by Id', function () {
                    expect(this.resultFromGet[newConditionSourceId].name).to.equal('New')
                    expect(this.resultFromPost[newConditionSourceId].name).to.equal('New')
                })
    
                it('Should add new actions with correct parent id', function () {
                    expect(this.resultFromGet[newConditionSourceId].conditionId).to.equal(1)
                    expect(this.resultFromPost[newConditionSourceId].conditionId).to.equal(1)
                })
            })
    
            describe('Overriding ConditionSource', function () {
                before(function () {
                    this.resultFromGet = ConditionSourceReducer(defaultState, overridingConditionSourceFromFetchedEventType)
                    this.resultFromPost = ConditionSourceReducer(defaultState, overridingConditionSourceFromPostedEventType)
                })
        
                it('Should overwrite existing action by Id', function () {
                    expect(this.resultFromGet[existingConditionSourceId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingConditionSourceId].name).to.equal('Overriding')
                })
    
                it('Should add new actions with correct parent id', function () {
                    expect(this.resultFromGet[existingConditionSourceId].conditionId).to.equal(1)
                    expect(this.resultFromPost[existingConditionSourceId].conditionId).to.equal(1)
                })
            })
    
            describe('Multiple ConditionSources', function () {
                before(function () {
                    this.resultFromGet = ConditionSourceReducer(defaultState, multipleConditionSourcesFromFetchedEventType)
                    this.resultFromPost = ConditionSourceReducer(defaultState, multipleConditionSourcesFromPostedEventType)
                })
        
                it('Should merge actions to state by Id', function () {
                    expect(this.resultFromGet[existingConditionSourceId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingConditionSourceId].name).to.equal('Overriding')
                    expect(this.resultFromGet[additionalConditionSourceId].name).to.equal('Additional')
                    expect(this.resultFromPost[additionalConditionSourceId].name).to.equal('Additional')
                })
    
                it('Should add new actions with correct parent id', function () {
                    expect(this.resultFromGet[existingConditionSourceId].conditionId).to.equal(existingConditionSourceParentId)
                    expect(this.resultFromPost[existingConditionSourceId].conditionId).to.equal(existingConditionSourceParentId)
                    expect(this.resultFromGet[additionalConditionSourceId].conditionId).to.equal(additionalConditionSourceParentId)
                    expect(this.resultFromPost[additionalConditionSourceId].conditionId).to.equal(additionalConditionSourceParentId)
                })
            })
        })
    })
    describe('Existing ConditionSource State', function () {
        describe('EventType Actions', function () {
            describe('No ConditionSource', function () {
                before(function () {
                    this.resultFromGet = ConditionSourceReducer(existingConditionSourceState, noConditionSourceFromFetchedEventType)
                    this.resultFromPost = ConditionSourceReducer(existingConditionSourceState, noConditionSourceFromPostedEventType)
                })
        
                it('Should retain only preexisting action', function () {
                    expect(Object.keys(this.resultFromGet).length).to.equal(1)
                    expect(Object.keys(this.resultFromPost).length).to.equal(1)
                    expect(this.resultFromGet[existingConditionSourceId].name).to.equal('Already In Reducer')
                    expect(this.resultFromPost[existingConditionSourceId].name).to.equal('Already In Reducer')
                })
            })

            describe('New ConditionSource', function () {
                before(function () {
                    this.resultFromGet = ConditionSourceReducer(existingConditionSourceState, newConditionSourceFromFetchedEventType)
                    this.resultFromPost = ConditionSourceReducer(existingConditionSourceState, newConditionSourceFromPostedEventType)
                })
        
                it('Should add new ConditionSources by Id', function () {
                    expect(this.resultFromGet[newConditionSourceId].name).to.equal('New')
                    expect(this.resultFromPost[newConditionSourceId].name).to.equal('New')
                    expect(this.resultFromGet[existingConditionSourceId].name).to.equal('Already In Reducer')
                    expect(this.resultFromPost[existingConditionSourceId].name).to.equal('Already In Reducer')
                })

                it('Should add new ConditionSources with correct parent id', function () {
                    expect(this.resultFromGet[newConditionSourceId].conditionId).to.equal(1)
                    expect(this.resultFromPost[newConditionSourceId].conditionId).to.equal(1)
                    expect(this.resultFromGet[existingConditionSourceId].conditionId).to.equal(2)
                    expect(this.resultFromPost[existingConditionSourceId].conditionId).to.equal(2)
                })
            })

            describe('Overriding ConditionSource', function () {
                before(function () {
                    this.resultFromGet = ConditionSourceReducer(existingConditionSourceState, overridingConditionSourceFromFetchedEventType)
                    this.resultFromPost = ConditionSourceReducer(existingConditionSourceState, overridingConditionSourceFromPostedEventType)
                })
        
                it('Should overwrite existing ConditionSource by Id', function () {
                    expect(this.resultFromGet[existingConditionSourceId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingConditionSourceId].name).to.equal('Overriding')
                })

                it('Should add new ConditionSources with correct parent id', function () {
                    expect(this.resultFromGet[existingConditionSourceId].conditionId).to.equal(1)
                    expect(this.resultFromPost[existingConditionSourceId].conditionId).to.equal(1)
                })
            })

            describe('Multiple ConditionSource', function () {
                before(function () {
                    this.resultFromGet = ConditionSourceReducer(existingConditionSourceState, multipleConditionSourcesFromFetchedEventType)
                    this.resultFromPost = ConditionSourceReducer(existingConditionSourceState, multipleConditionSourcesFromPostedEventType)
                })
        
                it('Should merge ConditionSources to state by id', function () {
                    expect(this.resultFromGet[existingConditionSourceId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingConditionSourceId].name).to.equal('Overriding')
                    expect(this.resultFromGet[additionalConditionSourceId].name).to.equal('Additional')
                    expect(this.resultFromPost[additionalConditionSourceId].name).to.equal('Additional')
                })

                it('Should add new ConditionSources with correct parent id', function () {
                    expect(this.resultFromGet[existingConditionSourceId].conditionId).to.equal(existingConditionSourceParentId)
                    expect(this.resultFromPost[existingConditionSourceId].conditionId).to.equal(existingConditionSourceParentId)
                    expect(this.resultFromGet[additionalConditionSourceId].conditionId).to.equal(additionalConditionSourceParentId)
                    expect(this.resultFromPost[additionalConditionSourceId].conditionId).to.equal(additionalConditionSourceParentId)
                })
            })
        })
    })
})