'use strict'
import { expect } from 'chai'
import queryString from 'query-string'
import * as filterService from 'services/filterService'
import AddMockDispatch from 'test/helpers/mockDispatch'

describe('FilterService', function () {
  describe('getFilterFromUrl', function () {
    describe('when the query string provides a single value for eventTypes', function () {
      it('should return an array with one value', function () {
        let testQuery = '?eventTypes=1'

        let result = filterService.getFilterFromUrl(testQuery)

        expect(result.eventTypes).to.eql([1])
      })
    })

    describe('when the query string provides multiple values for eventTypes', function () {
      it('should return the right value from the query string', function () {
        let testQuery = '?eventTypes=16&eventTypes=11'

        let result = filterService.getFilterFromUrl(testQuery)

        expect(result.eventTypes).to.eql([16, 11])
      })
    })

    context('bad query strings', function () {
      describe('when an arbitrary key is given', function () {
        it('should return null if the arbitrary key is of unknown type', function () {
          let badTestQuery = '?foo=baz'

          let result = filterService.getFilterFromUrl(badTestQuery)

          expect(result).to.equal(null)
        })
      })
      describe('when filter has no value in key-value pair', function () {
        it('should return null', function () {
          let badTestQuery = '?foo='

          let result = filterService.getFilterFromUrl(badTestQuery)

          expect(result).to.equal(null)
        })
      })

      describe('when filter has no key in key-value pair', function () {
        it('should return null', function () {
          let badTestQuery = '?=foo'

          let result = filterService.getFilterFromUrl(badTestQuery)

          expect(result).to.equal(null)
        })
      })

      describe('when filter has no key-value pair', function () {
        it('should return null', function () {
          let badTestQuery = '?'

          let result = filterService.getFilterFromUrl(badTestQuery)

          expect(result).to.equal(null)
        })
      })
    })
  })

  describe('serializeFiltersForUrl', function () {
    it('Should serialize EventTypes when the filter object provides any', function () {
      const filterWithEventTypes = { ticketId: 0, eventTypes: [1, 2] }

      const expectedResult = '?eventTypes=1&eventTypes=2'
      expect(filterService.serializeFiltersForUrl(filterWithEventTypes)).to.equal(expectedResult)
    })

    it('Should return an empty string when the filter object has no values that result in valid tokens', function () {
      const filterNoEventTypes = { ticketId: 0 }

      expect(filterService.serializeFiltersForUrl(filterNoEventTypes)).to.equal('')
    })

    it('Should include startTime, endTime, and eventTypes tokens when the filter object has valid values for them', function () {
      const filterWithEventTypesAndStartEndTimes = {startTime: 'startTime', endTime: 'endTime', eventTypes: [1, 2]}
      const expectedResult =  [ 'eventTypes=1', 'eventTypes=2', 'startTime=startTime', 'endTime=endTime' ]
      const result = filterService.serializeFiltersForUrl(filterWithEventTypesAndStartEndTimes)
      expectedResult.forEach(expectedToken => expect(result).to.include(expectedToken))
    })

    it('Should serialize only startTime and EndTime when nothing else is provided', function(){
      const filterWithNoEventTypes = { startTime: 'startTime', endTime: 'endTime' }
      const expectedResultWithoutEventType = '?startTime=startTime&endTime=endTime'
      const result = filterService.serializeFiltersForUrl(filterWithNoEventTypes)
      expect(result).to.equal(expectedResultWithoutEventType)
    })
  })

  describe('serializeEventTypesForQuery', function () {
    const eventTypes = [1, 2]
    const noEventTypes = []

    const expectedResult = 'eventTypes=1&eventTypes=2'

    const result = filterService.serializeEventTypesForQuery(eventTypes)

    it('should return a serialized array', function () {
      expect(result).to.equal(expectedResult)
    })
    it('should return an empty string if given an empty array', function () {
      const emptyStringResult = filterService.serializeEventTypesForQuery(noEventTypes)
      expect(emptyStringResult).to.equal('')
    })
  })

  describe('serializeFiltersForUrl', function () {
    const filterNoEventTypes = { incidentId: 0 }
    const filterWithEventTypes = {incidentId: 0, eventTypes: [1, 2]}
    const filterWithEverything = {incidentId: 0, eventTypes: [1, 2], foo: 'bar'}

    const expectedFilterTokensWithoutEventTypes = ''
    const expectedFilterTokensWithEventTypes = '?eventTypes=1&eventTypes=2'
    const expectedFilterTokensWithEverything = '?foo=bar&eventTypes=1&eventTypes=2'

    const resultNoEventTypes = filterService.serializeFiltersForUrl(filterNoEventTypes)
    const resultWithEventTypes = filterService.serializeFiltersForUrl(filterWithEventTypes)
    const resultWithEverything = filterService.serializeFiltersForUrl(filterWithEverything)

    it('should return an empty string when no event types and no other filters', function () {
      expect(resultNoEventTypes).to.equal(expectedFilterTokensWithoutEventTypes)
    })
    it('should return a string of eventTypes if no other filter types', function () {
      expect(resultWithEventTypes).to.equal(expectedFilterTokensWithEventTypes)
    })
    it('should return a string with multiple filter types if given a more complex object', function () {
      expect(resultWithEverything).to.equal(expectedFilterTokensWithEverything)
    })
  })
})