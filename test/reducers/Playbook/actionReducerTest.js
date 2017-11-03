'use strict'
import { expect } from 'chai'
import * as eventTypeActions from '../../../src/actions/Playbook/eventTypeActions.js'
import ActionReducer from '../../../src/reducers/Playbook/actionReducer'

const defaultState = {}

const existingActionId = 1
const newActionId = 2
const additionalActionId = 3

const existingActionState = {
    [existingActionId]: {
        name: 'Action Already In Reducer',
        eventTypeId: 2
    }
}

const eventTypeWithNoAction = {
    id: 1
}

const eventTypeWithNewAction = {
    id: 1,
    actions: [
        {
            id: newActionId,
            name: 'New Action'
        }
    ]
}

const eventTypeWithOverriddenAction = {
    id: 1,
    actions: [
        {
            id: existingActionId,
            name: 'Overriding Action'
        }
    ]
}

const eventTypeWithMultipleActions = {
    id: 1,
    actions: [
        {
            id: existingActionId,
            name: 'Overriding Action'
        },
        {
            id: additionalActionId,
            name: 'Additional Action'
        }
    ]
}

const noActionFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithNoAction)
const noActionFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithNoAction)
const newActionFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithNewAction)
const newActionFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithNewAction)
const overridingActionFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithOverriddenAction)
const overridingActionFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithOverriddenAction)
const multipleActionsFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(eventTypeWithMultipleActions)
const multipleActionsFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(eventTypeWithMultipleActions)

describe('Action Reducer', function actionReducerTest() {
    describe('Default State', function () {
        describe('EventType Actions', function () {
            describe('No Action', function () {
                before(function () {
                    this.resultFromGet = ActionReducer(defaultState, noActionFromFetchedEventType)
                    this.resultFromPost = ActionReducer(defaultState, noActionFromPostedEventType)
                })
        
                it('Should remain empty', function () {
                    expect(this.resultFromGet).to.exist
                    expect(this.resultFromPost).to.exist
                    expect(Object.keys(this.resultFromGet).length).to.equal(0)
                    expect(Object.keys(this.resultFromPost).length).to.equal(0)
                })
            })

            describe('New Action', function () {
                before(function defaultStateResults() {
                    this.resultFromGet = ActionReducer(defaultState, newActionFromFetchedEventType)
                    this.resultFromPost = ActionReducer(defaultState, newActionFromPostedEventType)
                })
        
                it('Should add new actions by Id', function () {
                    expect(this.resultFromGet[newActionId].name).to.equal('New Action')
                    expect(this.resultFromPost[newActionId].name).to.equal('New Action')
                })

                it('Should add new actions with correct parent EventTypeId', function () {
                    expect(this.resultFromGet[newActionId].eventTypeId).to.equal(1)
                    expect(this.resultFromPost[newActionId].eventTypeId).to.equal(1)
                })
            })

            describe('Overriding Action', function defaultStateOverridingActionTest() {
                before(function defaultStateResults() {
                    this.resultFromGet = ActionReducer(defaultState, overridingActionFromFetchedEventType)
                    this.resultFromPost = ActionReducer(defaultState, overridingActionFromPostedEventType)
                })
        
                it('Should overwrite existing action by Id', function () {
                    expect(this.resultFromGet[existingActionId].name).to.equal('Overriding Action')
                    expect(this.resultFromPost[existingActionId].name).to.equal('Overriding Action')
                })

                it('Should add new actions with correct parent EventTypeId', function () {
                    expect(this.resultFromGet[existingActionId].eventTypeId).to.equal(1)
                    expect(this.resultFromPost[existingActionId].eventTypeId).to.equal(1)
                })
            })

            describe('Multiple Actions', function defaultStateMultipleActionsTest() {
                before(function defaultStateResults() {
                    this.resultFromGet = ActionReducer(defaultState, multipleActionsFromFetchedEventType)
                    this.resultFromPost = ActionReducer(defaultState, multipleActionsFromPostedEventType)
                })
        
                it('Should merge actions to state by Id', function () {
                    expect(this.resultFromGet[existingActionId].name).to.equal('Overriding Action')
                    expect(this.resultFromPost[existingActionId].name).to.equal('Overriding Action')
                    expect(this.resultFromGet[additionalActionId].name).to.equal('Additional Action')
                    expect(this.resultFromPost[additionalActionId].name).to.equal('Additional Action')
                })

                it('Should add new actions with correct parent EventTypeId', function () {
                    expect(this.resultFromGet[existingActionId].eventTypeId).to.equal(1)
                    expect(this.resultFromPost[existingActionId].eventTypeId).to.equal(1)
                    expect(this.resultFromGet[additionalActionId].eventTypeId).to.equal(1)
                    expect(this.resultFromPost[additionalActionId].eventTypeId).to.equal(1)
                })
            })
        })
    })
    describe('Existing Action State', function () {
        describe('EventType Actions', function () {
            describe('No Action', function () {
                before(function defaultStateResults() {
                    this.resultFromGet = ActionReducer(existingActionState, noActionFromFetchedEventType)
                    this.resultFromPost = ActionReducer(existingActionState, noActionFromPostedEventType)
                })
        
                it('Should retain only preexisting action', function () {
                    expect(this.resultFromGet[existingActionId].name).to.equal('Action Already In Reducer')
                    expect(this.resultFromPost[existingActionId].name).to.equal('Action Already In Reducer')
                    expect(Object.keys(this.resultFromGet).length).to.equal(1)
                    expect(Object.keys(this.resultFromPost).length).to.equal(1)
                })
            })

            describe('New Action', function () {
                before(function () {
                    this.resultFromGet = ActionReducer(existingActionState, newActionFromFetchedEventType)
                    this.resultFromPost = ActionReducer(existingActionState, newActionFromPostedEventType)
                })
        
                it('Should add new actions by Id', function () {
                    expect(this.resultFromGet[newActionId].name).to.equal('New Action')
                    expect(this.resultFromPost[newActionId].name).to.equal('New Action')
                    expect(this.resultFromGet[existingActionId].name).to.equal('Action Already In Reducer')
                    expect(this.resultFromPost[existingActionId].name).to.equal('Action Already In Reducer')
                })

                it('Should add new actions with correct parent EventTypeId', function () {
                    expect(this.resultFromGet[newActionId].eventTypeId).to.equal(1)
                    expect(this.resultFromPost[newActionId].eventTypeId).to.equal(1)
                    expect(this.resultFromGet[existingActionId].eventTypeId).to.equal(2)
                    expect(this.resultFromPost[existingActionId].eventTypeId).to.equal(2)
                })
            })

            describe('Overriding Action', function () {
                before(function () {
                    this.resultFromGet = ActionReducer(existingActionState, overridingActionFromFetchedEventType)
                    this.resultFromPost = ActionReducer(existingActionState, overridingActionFromPostedEventType)
                })
        
                it('Should overwrite existing action by Id', function () {
                    expect(this.resultFromGet[existingActionId].name).to.equal('Overriding Action')
                    expect(this.resultFromPost[existingActionId].name).to.equal('Overriding Action')
                })

                it('Should add new actions with correct parent EventTypeId', function () {
                    expect(this.resultFromGet[existingActionId].eventTypeId).to.equal(1)
                    expect(this.resultFromPost[existingActionId].eventTypeId).to.equal(1)
                })
            })

            describe('Multiple Actions', function () {
                before(function () {
                    this.resultFromGet = ActionReducer(existingActionState, multipleActionsFromFetchedEventType)
                    this.resultFromPost = ActionReducer(existingActionState, multipleActionsFromPostedEventType)
                })
        
                it('Should merge actions to state by Id', function () {
                    expect(this.resultFromGet[existingActionId].name).to.equal('Overriding Action')
                    expect(this.resultFromPost[existingActionId].name).to.equal('Overriding Action')
                    expect(this.resultFromGet[additionalActionId].name).to.equal('Additional Action')
                    expect(this.resultFromPost[additionalActionId].name).to.equal('Additional Action')
                })

                it('Should add new actions with correct parent EventTypeId', function () {
                    expect(this.resultFromGet[existingActionId].eventTypeId).to.equal(1)
                    expect(this.resultFromPost[existingActionId].eventTypeId).to.equal(1)
                    expect(this.resultFromGet[additionalActionId].eventTypeId).to.equal(1)
                    expect(this.resultFromPost[additionalActionId].eventTypeId).to.equal(1)
                })
            })
        })
    })
})