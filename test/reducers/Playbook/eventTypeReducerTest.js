'use strict'
import { expect } from 'chai'
import * as eventTypeActions from '../../../src/actions/Playbook/eventTypeActions.js'
import EventTypeReducer from '../../../src/reducers/Playbook/EventTypeReducer'

const defaultState = {}

const existingEventTypeId = 1
const newEventTypeId = 2

const existingEventTypeState = {
    [existingEventTypeId]: {
        name: 'EventType Already In Reducer',
        eventTypeId: 2
    }
}

const noEventType = null

const newEventType = {
    id: newEventTypeId,
    name: 'New EventType'
}

const overridenEventType = {
    id: existingEventTypeId,
    name: 'Overriding EventType'
}

const noEventTypeFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(noEventType)
const noEventTypeFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(noEventType)
const newEventTypeFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(newEventType)
const newEventTypeFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(newEventType)
const overridingEventTypeFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(overridenEventType)
const overridingEventTypeFromPostedEventType = eventTypeActions.postEventTypeActionSet().succeed(overridenEventType)

describe('EventType Reducer', function EventTypeReducerTest() {
    describe('Default State', function () {
        describe('EventType Actions', function () {
            describe('No EventType', function () {
                before(function () {
                    this.resultFromGet = EventTypeReducer(defaultState, noEventTypeFromFetchedEventType)
                    this.resultFromPost = EventTypeReducer(defaultState, noEventTypeFromPostedEventType)
                })
        
                it('Should remain empty', function () {
                    expect(this.resultFromGet).to.exist
                    expect(this.resultFromPost).to.exist
                    expect(Object.keys(this.resultFromGet).length).to.equal(0)
                    expect(Object.keys(this.resultFromPost).length).to.equal(0)
                })
            })

            describe('New EventType', function () {
                before(function defaultStateResults() {
                    this.resultFromGet = EventTypeReducer(defaultState, newEventTypeFromFetchedEventType)
                    this.resultFromPost = EventTypeReducer(defaultState, newEventTypeFromPostedEventType)
                })
        
                it('Should add new EventTypes by Id', function () {
                    expect(this.resultFromGet[newEventTypeId].name).to.equal('New EventType')
                    expect(this.resultFromPost[newEventTypeId].name).to.equal('New EventType')
                })

            })

            describe('Overriding EventType', function defaultStateOverridingEventTypeTest() {
                before(function defaultStateResults() {
                    this.resultFromGet = EventTypeReducer(defaultState, overridingEventTypeFromFetchedEventType)
                    this.resultFromPost = EventTypeReducer(defaultState, overridingEventTypeFromPostedEventType)
                })
        
                it('Should overwrite existing EventType by Id', function () {
                    expect(this.resultFromGet[existingEventTypeId].name).to.equal('Overriding EventType')
                    expect(this.resultFromPost[existingEventTypeId].name).to.equal('Overriding EventType')
                })
            })
        })
    })
    describe('Existing EventType State', function () {
        describe('EventType Actions', function () {
            describe('No EventType', function () {
                before(function defaultStateResults() {
                    this.resultFromGet = EventTypeReducer(existingEventTypeState, noEventTypeFromFetchedEventType)
                    this.resultFromPost = EventTypeReducer(existingEventTypeState, noEventTypeFromPostedEventType)
                })
        
                it('Should retain only preexisting EventType', function () {
                    expect(this.resultFromGet[existingEventTypeId].name).to.equal('EventType Already In Reducer')
                    expect(this.resultFromPost[existingEventTypeId].name).to.equal('EventType Already In Reducer')
                    expect(Object.keys(this.resultFromGet).length).to.equal(1)
                    expect(Object.keys(this.resultFromPost).length).to.equal(1)
                })
            })

            describe('New EventType', function () {
                before(function () {
                    this.resultFromGet = EventTypeReducer(existingEventTypeState, newEventTypeFromFetchedEventType)
                    this.resultFromPost = EventTypeReducer(existingEventTypeState, newEventTypeFromPostedEventType)
                })
        
                it('Should add new EventTypes by Id', function () {
                    expect(this.resultFromGet[newEventTypeId].name).to.equal('New EventType')
                    expect(this.resultFromPost[newEventTypeId].name).to.equal('New EventType')
                    expect(this.resultFromGet[existingEventTypeId].name).to.equal('EventType Already In Reducer')
                    expect(this.resultFromPost[existingEventTypeId].name).to.equal('EventType Already In Reducer')
                })
            })

            describe('Overriding EventType', function () {
                before(function () {
                    this.resultFromGet = EventTypeReducer(existingEventTypeState, overridingEventTypeFromFetchedEventType)
                    this.resultFromPost = EventTypeReducer(existingEventTypeState, overridingEventTypeFromPostedEventType)
                })
        
                it('Should overwrite existing EventType by Id', function () {
                    expect(this.resultFromGet[existingEventTypeId].name).to.equal('Overriding EventType')
                    expect(this.resultFromPost[existingEventTypeId].name).to.equal('Overriding EventType')
                })
            })
        })
    })
})