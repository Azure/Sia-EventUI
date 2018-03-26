'use strict'
import { expect } from 'chai'

import * as filterActions from 'actions/filterActions.js'
import * as filterReducer from 'reducers/filterReducer'

describe('filterReducer', function () {
  describe('IncidentId reducer', function () {
    describe('When action is CLEAR_EVENT_FILTER_INCIDENTID', function () {
      const clearIncidentIdAction = { type: filterActions.CLEAR_EVENT_FILTER_INCIDENTID }
      it('Should return null regardless of initial state', function () {
        expect(filterReducer.incidentId()(null, clearIncidentIdAction)).to.be.null
        expect(filterReducer.incidentId()(100, clearIncidentIdAction)).to.be.null
      })
    })

    describe('When action is CHANGE_EVENT_FILTER', function () {
      describe('When filter includes an incidentId', function () {
        const testAction = { type: filterActions.CHANGE_EVENT_FILTER, filter: { incidentId: 200 }}
        it('Should return an object with an incidentId matching the object regardless of initial state', function () {
          expect(filterReducer.incidentId()(null, testAction)).to.equal(200)
          expect(filterReducer.incidentId()(100, testAction)).to.equal(200)
        })
      })

      describe('When filter does not include an incidentId', function () {
        const testAction = { type: filterActions.CHANGE_EVENT_FILTER, filter: { }}
        it('Should return the initial state', function () {
          expect(filterReducer.incidentId()(null, testAction)).to.be.null
          expect(filterReducer.incidentId()(100, testAction)).to.equal(100)
        })
      })
    })
  })

  describe('When action is UPDATE_START_AND_END_TIME', function(){
      describe('When filter includes an startTime or endTime', function(){
          const testAction = {type: filterActions.UPDATE_START_AND_END_TIME, startTime: 'startTime', endTime: 'endTime'}
          it('Should return an object with a startTime and an endTime matching the object regardless of the initial state', function() {
              expect(filterReducer.startTime()(null, testAction)).to.equal('startTime')
              expect(filterReducer.startTime()('old_startTime', testAction)).to.equal('startTime')
              expect(filterReducer.endTime()(null, testAction)).to.equal('endTime')
              expect(filterReducer.endTime()('old_endTime', testAction)).to.equal('endTime')
          })
      })

      describe('When filter does not include an startTime or endTime', function(){
          const testAction = {type: filterActions.UPDATE_START_AND_END_TIME}
          it('Should return an object with the initial startTime and endTime', function() {
              expect(filterReducer.startTime()(null, testAction)).to.be.null
              expect(filterReducer.startTime()('old_startTime', testAction)).to.be.equal('old_startTime')
              expect(filterReducer.endTime()(null, testAction)).to.be.null
              expect(filterReducer.endTime()('old_endTime', testAction)).to.equal('old_endTime')
          })
      })
  })

  describe('When action is UPDATE_DATASEARCH', function () {
    describe('When filter includes a dataSearch', function () {
      const testAction = { type: filterActions.UPDATE_DATASEARCH, dataSearch: 'search' }
      it('Should return an object with an dataSearch info matching the object regardless of initial state', function () {
        expect(filterReducer.dataSearch()(null, testAction)).to.equal('search')
        expect(filterReducer.dataSearch()('old_search', testAction)).to.equal('search')
      })
    })

    describe('When filter does not include a dataSearch', function () {
      const testAction = { type: filterActions.UPDATE_DATASEARCH}
      it('Should return an object with the initial dataSearch info', function () {
        expect(filterReducer.dataSearch()(null, testAction)).to.be.null
        expect(filterReducer.dataSearch()('old_search', testAction)).to.equal('old_search')
      })
    })
  })

  describe('When action is not covered by reducer statements', function () {
    it('Should return the initial state', function () {
      const testAction = { type: 'IGNORE_ME' }
      const initialState = {}
      expect(filterReducer.incidentId()(initialState, testAction)).to.equal(initialState)
    })
  })

  /*
  TODO: adapt to per-reducer tests
  it('should return the initial state with no filter in URL', function () {
    const result = Object.entries(filterReducer(defaultFilterNoFilterInUrl)(undefined, {}))
    result.forEach(element => expect(element[1]).to.equal(null))
  })
  it('should return the initial state with filter in URL', function () {
    expect(filterReducer(defaultFilterSomethingInUrl)(undefined, {}).eventTypes).to.deep.equal([1])
  })
  it('should return the initial state with filter in URL when passed action other than CHANGE_EVENT_TYPES', function () {
    expect(filterReducer(defaultFilterSomethingInUrl)(undefined, actions.noChange).eventTypes).to.deep.equal([1])
  })
  it('should return a new filter when passed a good filter that is different than current filter', function () {
    const result = filterReducer(defaultFilterNoFilterInUrl)(undefined, actions.change)
    expect(result.incidentId).to.equal(1)
    expect(result.ticketId).to.equal(2)
    expect(result.eventTypes).to.deep.equal([1,2,3])
    Object.entries(result).filter(element => element[0] != 'incidentId' &&
                          element[0] != 'ticketId' &&
                          element[0] != 'eventTypes').forEach(element => expect(element[1]).to.equal(null))
  })
  it('should return a new filter with default null ticketId when passed a filter w/no ticketId', function () {
    const result = filterReducer(defaultFilterNoFilterInUrl)(undefined, actions.badChangeOne)
    expect(result.incidentId).to.equal(2)
    expect(result.eventTypes).to.deep.equal([1])
    Object.entries(result).filter(element => element[0] != 'incidentId' &&
                          element[0] != 'eventTypes').forEach(element => expect(element[1]).to.equal(null))
  })
  it('should return a new filter with default empty eventTypes when passed a filter w/no eventTypes', function () {
    const result = filterReducer(defaultFilterNoFilterInUrl)(undefined, actions.badChangeTwo)
    expect(result.incidentId).to.equal(2)
    expect(result.ticketId).to.equal(2)
    Object.entries(result).filter(element => element[0] != 'incidentId' &&
                          element[0] != 'ticketId').forEach(element => expect(element[1]).to.equal(null))

  })
  it('should return a new filter with incidentId cleared when passed action as CLEAR_EVENT_FILTER_INCIDENTID', function(){
   const result = filterReducer(defaultFilterNoFilterInUrl)(undefined, actions.clearIncidentId)
    Object.entries(result).forEach(element => expect(element[1]).to.equal(null))
  })*/
})
