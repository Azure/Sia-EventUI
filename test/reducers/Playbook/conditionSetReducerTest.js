'use strict'
import { expect } from 'chai'
import * as eventTypeActions from '../../../src/actions/Playbook/eventTypeActions.js'
import ConditionSetReducer from '../../../src/reducers/Playbook/ConditionSetReducer'

const defaultState = {}

const existingConditionSetId = 1
const newConditionSetId = 2
const additionalConditionSetId = 3

const newConditionSetParentId = 1
const existingConditionSetParentId = 2
const additionalConditionSetParentId = 3

const existingConditionSetState = {
    [existingConditionSetId]: {
        name: 'Already In Reducer',
        actionId: existingConditionSetParentId
    }
}

const eventTypeWithNoConditionSet = {
}

const eventTypeWithNewConditionSet = {
    actions: [
        {
            id: newConditionSetParentId,
            conditionSets: [{
                id: newConditionSetId,
                name: 'New'
            }]
        }
    ]
}

const eventTypeWithOverriddenConditionSet = {
    actions: [
        {
            id: newConditionSetParentId,
            conditionSets: [{
                id: existingConditionSetId,
                name: 'Overriding'
            }]
        }
    ]
}

const eventTypeWithMultipleConditionSets = {
    actions: [
        {
            id: existingConditionSetParentId,
            conditionSets: [{
                id: existingConditionSetId,
                name: 'Overriding'
            }]
        },
        {
            id: additionalConditionSetParentId,
            conditionSets: [{
                id: additionalConditionSetId,
                name: 'Additional'
            }]
        }
    ]
}

const noConditionSetFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithNoConditionSet)
const noConditionSetFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithNoConditionSet)
const newConditionSetFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithNewConditionSet)
const newConditionSetFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithNewConditionSet)
const overridingConditionSetFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithOverriddenConditionSet)
const overridingConditionSetFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithOverriddenConditionSet)
const multipleConditionSetsFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithMultipleConditionSets)
const multipleConditionSetsFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithMultipleConditionSets)

describe('ConditionSet Reducer', function () {
    describe('Default State', function () {
        describe('EventType Actions', function () {
            describe('No ConditionSet', function () {
                before(function () {
                    this.resultFromGet = ConditionSetReducer(defaultState, noConditionSetFromFetchedEventType)
                    this.resultFromPost = ConditionSetReducer(defaultState, noConditionSetFromPostedEventType)
                })
        
                it('Should remain empty', function () {
                    expect(this.resultFromGet).to.exist
                    expect(this.resultFromPost).to.exist
                    expect(Object.keys(this.resultFromGet).length).to.equal(0)
                    expect(Object.keys(this.resultFromPost).length).to.equal(0)
                })
            })
            
            describe('New ConditionSet', function () {
                before(function () {
                    this.resultFromGet = ConditionSetReducer(defaultState, newConditionSetFromFetchedEventType)
                    this.resultFromPost = ConditionSetReducer(defaultState, newConditionSetFromPostedEventType)
                })
        
                it('Should add new ConditionSets by Id', function () {
                    expect(this.resultFromGet[newConditionSetId].name).to.equal('New')
                    expect(this.resultFromPost[newConditionSetId].name).to.equal('New')
                })

                it('Should add new actions with correct parent id', function () {
                    expect(this.resultFromGet[newConditionSetId].actionId).to.equal(1)
                    expect(this.resultFromPost[newConditionSetId].actionId).to.equal(1)
                })
            })

            describe('Overriding ConditionSet', function () {
                before(function () {
                    this.resultFromGet = ConditionSetReducer(defaultState, overridingConditionSetFromFetchedEventType)
                    this.resultFromPost = ConditionSetReducer(defaultState, overridingConditionSetFromPostedEventType)
                })
        
                it('Should overwrite existing action by Id', function () {
                    expect(this.resultFromGet[existingConditionSetId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingConditionSetId].name).to.equal('Overriding')
                })

                it('Should add new actions with correct parent id', function () {
                    expect(this.resultFromGet[existingConditionSetId].actionId).to.equal(1)
                    expect(this.resultFromPost[existingConditionSetId].actionId).to.equal(1)
                })
            })

            describe('Multiple ConditionSets', function () {
                before(function () {
                    this.resultFromGet = ConditionSetReducer(defaultState, multipleConditionSetsFromFetchedEventType)
                    this.resultFromPost = ConditionSetReducer(defaultState, multipleConditionSetsFromPostedEventType)
                })
        
                it('Should merge actions to state by Id', function () {
                    expect(this.resultFromGet[existingConditionSetId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingConditionSetId].name).to.equal('Overriding')
                    expect(this.resultFromGet[additionalConditionSetId].name).to.equal('Additional')
                    expect(this.resultFromPost[additionalConditionSetId].name).to.equal('Additional')
                })

                it('Should add new actions with correct parent id', function () {
                    expect(this.resultFromGet[existingConditionSetId].actionId).to.equal(existingConditionSetParentId)
                    expect(this.resultFromPost[existingConditionSetId].actionId).to.equal(existingConditionSetParentId)
                    expect(this.resultFromGet[additionalConditionSetId].actionId).to.equal(additionalConditionSetParentId)
                    expect(this.resultFromPost[additionalConditionSetId].actionId).to.equal(additionalConditionSetParentId)
                })
            })
        })
    })
    describe('Existing ConditionSet State', function () {
        describe('EventType Actions', function () {
            describe('No ConditionSet', function () {
                before(function () {
                    this.resultFromGet = ConditionSetReducer(existingConditionSetState, noConditionSetFromFetchedEventType)
                    this.resultFromPost = ConditionSetReducer(existingConditionSetState, noConditionSetFromPostedEventType)
                })
        
                it('Should retain only preexisting action', function () {
                    expect(Object.keys(this.resultFromGet).length).to.equal(1)
                    expect(Object.keys(this.resultFromPost).length).to.equal(1)
                    expect(this.resultFromGet[existingConditionSetId].name).to.equal('Already In Reducer')
                    expect(this.resultFromPost[existingConditionSetId].name).to.equal('Already In Reducer')
                })
            })

            describe('New ConditionSet', function () {
                before(function () {
                    this.resultFromGet = ConditionSetReducer(existingConditionSetState, newConditionSetFromFetchedEventType)
                    this.resultFromPost = ConditionSetReducer(existingConditionSetState, newConditionSetFromPostedEventType)
                })
        
                it('Should add new ConditionSets by Id', function () {
                    expect(this.resultFromGet[newConditionSetId].name).to.equal('New')
                    expect(this.resultFromPost[newConditionSetId].name).to.equal('New')
                    expect(this.resultFromGet[existingConditionSetId].name).to.equal('Already In Reducer')
                    expect(this.resultFromPost[existingConditionSetId].name).to.equal('Already In Reducer')
                })

                it('Should add new ConditionSets with correct parent id', function () {
                    expect(this.resultFromGet[newConditionSetId].actionId).to.equal(1)
                    expect(this.resultFromPost[newConditionSetId].actionId).to.equal(1)
                    expect(this.resultFromGet[existingConditionSetId].actionId).to.equal(2)
                    expect(this.resultFromPost[existingConditionSetId].actionId).to.equal(2)
                })
            })

            describe('Overriding ConditionSet', function () {
                before(function () {
                    this.resultFromGet = ConditionSetReducer(existingConditionSetState, overridingConditionSetFromFetchedEventType)
                    this.resultFromPost = ConditionSetReducer(existingConditionSetState, overridingConditionSetFromPostedEventType)
                })
        
                it('Should overwrite existing ConditionSet by Id', function () {
                    expect(this.resultFromGet[existingConditionSetId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingConditionSetId].name).to.equal('Overriding')
                })

                it('Should add new ConditionSets with correct parent id', function () {
                    expect(this.resultFromGet[existingConditionSetId].actionId).to.equal(1)
                    expect(this.resultFromPost[existingConditionSetId].actionId).to.equal(1)
                })
            })

            describe('Multiple ConditionSet', function () {
                before(function () {
                    this.resultFromGet = ConditionSetReducer(existingConditionSetState, multipleConditionSetsFromFetchedEventType)
                    this.resultFromPost = ConditionSetReducer(existingConditionSetState, multipleConditionSetsFromPostedEventType)
                })
        
                it('Should merge ConditionSets to state by id', function () {
                    expect(this.resultFromGet[existingConditionSetId].name).to.equal('Overriding')
                    expect(this.resultFromPost[existingConditionSetId].name).to.equal('Overriding')
                    expect(this.resultFromGet[additionalConditionSetId].name).to.equal('Additional')
                    expect(this.resultFromPost[additionalConditionSetId].name).to.equal('Additional')
                })

                it('Should add new ConditionSets with correct parent id', function () {
                    expect(this.resultFromGet[existingConditionSetId].actionId).to.equal(existingConditionSetParentId)
                    expect(this.resultFromPost[existingConditionSetId].actionId).to.equal(existingConditionSetParentId)
                    expect(this.resultFromGet[additionalConditionSetId].actionId).to.equal(additionalConditionSetParentId)
                    expect(this.resultFromPost[additionalConditionSetId].actionId).to.equal(additionalConditionSetParentId)
                })
            })
        })
    })
})