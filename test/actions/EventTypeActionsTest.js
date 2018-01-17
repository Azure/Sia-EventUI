'use strict'
import { expect } from 'chai'
import * as eventTypeActions from 'actions/eventTypeActions'

describe('EventTypeActions', function () {
  describe('GetEventTypesActionSet', function () {
    context('getEventTypes try', function () {
      let result = eventTypeActions.getEventTypesActionSet.try()

      it('try should return the try action object', function () {
        expect(result).to.eql({type: 'TRY_GET_EVENT_TYPES'})
      })
    })

    context('getEventTypes succeed', function () {
      let testEventTypes = [{id: 0, name: 'TestEventType'}]
      let emptyEventTypes

      let result = eventTypeActions.getEventTypesActionSet.succeed(testEventTypes)

      describe('when given an array of eventTypes', function () {
        it('should return the success type and the eventTypes', function () {
          expect(result).to.eql({type: 'GET_EVENT_TYPES_SUCCESS', eventTypes: [{id: 0, name: 'TestEventType'}]})
        })
      })
    })

    context('getEventTypes fail', function () {
      describe('when given a failure message', function () {
        let testFailureMessage = 'fail'

        let result = eventTypeActions.getEventTypesActionSet.fail(testFailureMessage)

        it('should return the fail type and the failure reason', function () {
          expect(result).to.eql({type: 'GET_EVENT_TYPES_FAILURE', failureReason: 'fail'})
        })
      })
    })
  })
})
