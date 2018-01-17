'use strict'
import { expect } from 'chai'
import * as eventTypeActions from 'actions/eventTypeActions.js'
import { records } from 'reducers/eventTypeReducer'

const defaultState = {}

const existingEventTypeId = 1
const newEventTypeId = 2

const existingEventTypeState = {
  [existingEventTypeId]: {
    name: 'EventType Already In Reducer',
    id: 2
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
const newEventTypeFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(newEventType)
const overridingEventTypeFromFetchedEventType = eventTypeActions.getEventTypeActionSet(1).succeed(overridenEventType)

const fetchingEmptyState = []
const fetchingThingsState = [1, 2]

const tryGetExisting = ({
  type: eventTypeActions.TRY_GET_EVENT_TYPE,
  id: 1
})

const tryGetNew = ({
  type: eventTypeActions.TRY_GET_EVENT_TYPE,
  id: 3
})

const succeedGetExisting = ({
  type: eventTypeActions.GET_EVENT_TYPE_SUCCESS,
  id: 1
})

const succeedGetNew = ({
  type: eventTypeActions.GET_EVENT_TYPE_SUCCESS,
  id: 3
})

const failGetExisting = ({
  type: eventTypeActions.GET_EVENT_TYPE_FAILURE,
  id: 1
})

const failGetNew = ({
  type: eventTypeActions.GET_EVENT_TYPE_FAILURE,
  id: 3
})

describe('EventType Reducer', function EventTypeReducerTest () {
  describe('Records', function () {
    describe('Default State', function () {
      describe('EventType Actions', function () {
        describe('No EventType', function () {
          before(function () {
            this.resultFromGet = records(defaultState, noEventTypeFromFetchedEventType)
          })

          it('Should remain empty', function () {
            expect(this.resultFromGet).to.exist
            expect(Object.keys(this.resultFromGet).length).to.equal(0)
          })
        })

        describe('New EventType', function () {
          before(function defaultStateResults () {
            this.resultFromGet = records(defaultState, newEventTypeFromFetchedEventType)
          })

          it('Should add new EventTypes by Id', function () {
            expect(this.resultFromGet[newEventTypeId].name).to.equal('New EventType')
          })
        })

        describe('Overriding EventType', function defaultStateOverridingEventTypeTest () {
          before(function defaultStateResults () {
            this.resultFromGet = records(defaultState, overridingEventTypeFromFetchedEventType)
          })

          it('Should overwrite existing EventType by Id', function () {
            expect(this.resultFromGet[existingEventTypeId].name).to.equal('Overriding EventType')
          })
        })
      })
    })
    describe('Existing EventType State', function () {
      describe('EventType Actions', function () {
        describe('No EventType', function () {
          before(function defaultStateResults () {
            this.resultFromGet = records(existingEventTypeState, noEventTypeFromFetchedEventType)
          })

          it('Should retain only preexisting EventType', function () {
            expect(this.resultFromGet[existingEventTypeId].name).to.equal('EventType Already In Reducer')
            expect(Object.keys(this.resultFromGet).length).to.equal(1)
          })
        })

        describe('New EventType', function () {
          before(function () {
            this.resultFromGet = records(existingEventTypeState, newEventTypeFromFetchedEventType)
          })

          it('Should add new EventTypes by Id', function () {
            expect(this.resultFromGet[newEventTypeId].name).to.equal('New EventType')
            expect(this.resultFromGet[existingEventTypeId].name).to.equal('EventType Already In Reducer')
          })
        })

        describe('Overriding EventType', function () {
          before(function () {
            this.resultFromGet = records(existingEventTypeState, overridingEventTypeFromFetchedEventType)
          })

          it('Should overwrite existing EventType by Id', function () {
            expect(this.resultFromGet[existingEventTypeId].name).to.equal('Overriding EventType')
          })
        })
      })
    })
  })
})
