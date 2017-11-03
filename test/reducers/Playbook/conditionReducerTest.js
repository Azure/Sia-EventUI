'use strict'
import { expect } from 'chai'
import * as eventTypeActions from '../../../src/actions/Playbook/eventTypeActions.js'
import ConditionReducer from '../../../src/reducers/Playbook/ConditionReducer'

const defaultState = {}

const existingConditionId = 1
const newConditionId = 2
const additionalConditionId = 3

const newConditionParentId = 1
const existingConditionParentId = 2
const additionalConditionParentId = 3

const existingConditionState = {
    [existingConditionId]: {
        name: 'Already In Reducer',
        conditionSetId: existingConditionParentId
    }
}

const eventTypeWithNoCondition = {
}

const eventTypeWithNewCondition = {
    actions: [
        {
            conditionSets: [{
                id: newConditionParentId,
                conditions: [{
                    id: newConditionId,
                    name: 'New'
                }]
            }]
        }
    ]
}

const eventTypeWithOverriddenCondition = {
    actions: [
        {
            conditionSets: [{
                id: newConditionParentId,
                conditions: [{
                    id: existingConditionId,
                    name: 'Overriding'
                }]
            }]
        }
    ]
}

const eventTypeWithMultipleConditions = {
    actions: [
        {
            conditionSets: [{
                id: existingConditionParentId,
                conditions: [{
                    id: existingConditionId,
                    name: 'Overriding'
                }]
            }]
        },
        {
            conditionSets: [{
                id: additionalConditionParentId,
                conditions: [{
                    id: additionalConditionId,
                    name: 'Additional'
                }]
            }]
        }
    ]
}

const noConditionFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithNoCondition)
const noConditionFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithNoCondition)
const newConditionFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithNewCondition)
const newConditionFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithNewCondition)
const overridingConditionFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithOverriddenCondition)
const overridingConditionFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithOverriddenCondition)
const multipleConditionsFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithMultipleConditions)
const multipleConditionsFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithMultipleConditions)

describe('Condition Reducer', function () {
    describe('Default State', function () {
        describe('EventType Actions', function () {
            describe('No Condition', function () {
                before(function () {
                    this.resultFromGet = ConditionReducer(defaultState, noConditionFromFetchedEventType)
                    this.resultFromPost = ConditionReducer(defaultState, noConditionFromPostedEventType)
                })
        
                it('Should remain empty', function () {
                    expect(this.resultFromGet).to.exist
                    expect(this.resultFromPost).to.exist
                    expect(Object.keys(this.resultFromGet).length).to.equal(0)
                    expect(Object.keys(this.resultFromPost).length).to.equal(0)
                })
            })
            
            describe('New Condition', function () {
                before(function () {
                    this.resultFromGet = ConditionReducer(defaultState, newConditionFromFetchedEventType)
                    this.resultFromPost = ConditionReducer(defaultState, newConditionFromPostedEventType)
                })
        
                it('Should add new Conditions by Id', function () {
                    expect(this.resultFromGet[newConditionId].name).to.equal('New')
                    expect(this.resultFromPost[newConditionId].name).to.equal('New')
                })
    
                it('Should add new actions with correct parent id', function () {
                    expect(this.resultFromGet[newConditionId].conditionSetId).to.equal(1)
                    expect(this.resultFromPost[newConditionId].conditionSetId).to.equal(1)
                })
            })
    
            describe('Overriding Condition', function () {
                before(function () {
                    this.resultFromGet = ConditionReducer(defaultState, overridingConditionFromFetchedEventType)
                    this.resultFromPost = ConditionReducer(defaultState, overridingConditionFromPostedEventType)
                })
        
                it('Should overwrite existing action by Id', function () {
                    expect(this.resultFromGet[existingConditionId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingConditionId].name).to.equal('Overriding')
                })
    
                it('Should add new actions with correct parent id', function () {
                    expect(this.resultFromGet[existingConditionId].conditionSetId).to.equal(1)
                    expect(this.resultFromPost[existingConditionId].conditionSetId).to.equal(1)
                })
            })
    
            describe('Multiple Conditions', function () {
                before(function () {
                    this.resultFromGet = ConditionReducer(defaultState, multipleConditionsFromFetchedEventType)
                    this.resultFromPost = ConditionReducer(defaultState, multipleConditionsFromPostedEventType)
                })
        
                it('Should merge actions to state by Id', function () {
                    expect(this.resultFromGet[existingConditionId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingConditionId].name).to.equal('Overriding')
                    expect(this.resultFromGet[additionalConditionId].name).to.equal('Additional')
                    expect(this.resultFromPost[additionalConditionId].name).to.equal('Additional')
                })
    
                it('Should add new actions with correct parent id', function () {
                    expect(this.resultFromGet[existingConditionId].conditionSetId).to.equal(existingConditionParentId)
                    expect(this.resultFromPost[existingConditionId].conditionSetId).to.equal(existingConditionParentId)
                    expect(this.resultFromGet[additionalConditionId].conditionSetId).to.equal(additionalConditionParentId)
                    expect(this.resultFromPost[additionalConditionId].conditionSetId).to.equal(additionalConditionParentId)
                })
            })
        })
    })
    describe('Existing Condition State', function () {
        describe('EventType Actions', function () {
            describe('No Condition', function () {
                before(function () {
                    this.resultFromGet = ConditionReducer(existingConditionState, noConditionFromFetchedEventType)
                    this.resultFromPost = ConditionReducer(existingConditionState, noConditionFromPostedEventType)
                })
        
                it('Should retain only preexisting action', function () {
                    expect(Object.keys(this.resultFromGet).length).to.equal(1)
                    expect(Object.keys(this.resultFromPost).length).to.equal(1)
                    expect(this.resultFromGet[existingConditionId].name).to.equal('Already In Reducer')
                    expect(this.resultFromPost[existingConditionId].name).to.equal('Already In Reducer')
                })
            })

            describe('New Condition', function () {
                before(function () {
                    this.resultFromGet = ConditionReducer(existingConditionState, newConditionFromFetchedEventType)
                    this.resultFromPost = ConditionReducer(existingConditionState, newConditionFromPostedEventType)
                })
        
                it('Should add new Conditions by Id', function () {
                    expect(this.resultFromGet[newConditionId].name).to.equal('New')
                    expect(this.resultFromPost[newConditionId].name).to.equal('New')
                    expect(this.resultFromGet[existingConditionId].name).to.equal('Already In Reducer')
                    expect(this.resultFromPost[existingConditionId].name).to.equal('Already In Reducer')
                })

                it('Should add new Conditions with correct parent id', function () {
                    expect(this.resultFromGet[newConditionId].conditionSetId).to.equal(1)
                    expect(this.resultFromPost[newConditionId].conditionSetId).to.equal(1)
                    expect(this.resultFromGet[existingConditionId].conditionSetId).to.equal(2)
                    expect(this.resultFromPost[existingConditionId].conditionSetId).to.equal(2)
                })
            })

            describe('Overriding Condition', function () {
                before(function () {
                    this.resultFromGet = ConditionReducer(existingConditionState, overridingConditionFromFetchedEventType)
                    this.resultFromPost = ConditionReducer(existingConditionState, overridingConditionFromPostedEventType)
                })
        
                it('Should overwrite existing Condition by Id', function () {
                    expect(this.resultFromGet[existingConditionId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingConditionId].name).to.equal('Overriding')
                })

                it('Should add new Conditions with correct parent id', function () {
                    expect(this.resultFromGet[existingConditionId].conditionSetId).to.equal(1)
                    expect(this.resultFromPost[existingConditionId].conditionSetId).to.equal(1)
                })
            })

            describe('Multiple Condition', function () {
                before(function () {
                    this.resultFromGet = ConditionReducer(existingConditionState, multipleConditionsFromFetchedEventType)
                    this.resultFromPost = ConditionReducer(existingConditionState, multipleConditionsFromPostedEventType)
                })
        
                it('Should merge Conditions to state by id', function () {
                    expect(this.resultFromGet[existingConditionId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingConditionId].name).to.equal('Overriding')
                    expect(this.resultFromGet[additionalConditionId].name).to.equal('Additional')
                    expect(this.resultFromPost[additionalConditionId].name).to.equal('Additional')
                })

                it('Should add new Conditions with correct parent id', function () {
                    expect(this.resultFromGet[existingConditionId].conditionSetId).to.equal(existingConditionParentId)
                    expect(this.resultFromPost[existingConditionId].conditionSetId).to.equal(existingConditionParentId)
                    expect(this.resultFromGet[additionalConditionId].conditionSetId).to.equal(additionalConditionParentId)
                    expect(this.resultFromPost[additionalConditionId].conditionSetId).to.equal(additionalConditionParentId)
                })
            })
        })
    })
})