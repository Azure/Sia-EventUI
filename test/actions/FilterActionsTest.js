'use strict'
import { expect } from 'chai'
import queryString from 'query-string'
import * as filterActions from 'actions/filterActions'
import AddMockDispatch from 'test/helpers/mockDispatch'

// Istanbul for test coverage, provides us with a new command nyc-mocha, which runs the tests and gives a reporter
describe('FilterActions', function () {


  describe('changeEventFilter', function () {
    const history = []
    const filter = {ticketId: 0, eventTypes: [1, 2]}

    const result = filterActions.changeEventFilter(history)(filter)

    const expectedValue = {type: 'CHANGE_EVENT_FILTER', filter: {ticketId: 0, eventTypes: [1, 2]}}

    it('should return an object with a type and a filter', function () {
      expect(result).to.deep.equal(expectedValue)
    })
  })

  describe('removeFilter', function () {
    beforeEach(() => {
      this.mockDispatchRecorder = {
        action: null
      }
      this.singleState = setup(dummyState(this.mockDispatchRecorder), null)
    })
  })
})
