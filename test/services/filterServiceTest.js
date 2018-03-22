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

  describe('getUrlFromFilter', function () {
    const history = []

    const filterNoEventTypes = {ticketId: 0, foo: 'bar'}
    const filterWithEventTypes = {ticketId: 0, eventTypes: [1, 2]}

    const expectedResult = '/tickets/0?eventTypes=1&eventTypes=2'

    filterService.getUrlFromFilter(history, filterWithEventTypes)

    it('should push urls to history when there are eventTypes', function () {
      expect(history[0]).to.equal(expectedResult)
    })
    it('should push nothing to history when there are no eventTypes', function () {
      const newHistory = []
      filterService.getUrlFromFilter(newHistory, filterNoEventTypes)
      expect(newHistory).to.be.empty
    })
  })

  describe('getUrlFromUncorrelatedFilter', function () {
    const history = []

    const filterNostartEndTimes = {eventTypes: [1, 2]}
    const filterWithEventTypesAndStartEndTimes = {startTime: 'startTime', endTime: 'endTime', eventTypes: [1, 2]}
    const filterWithNoEventTypes = {startTime: 'startTime', endTime: 'endTime'}

    const expectedResult =  [ 'eventTypes=1', 'eventTypes=2', 'startTime=startTime', 'endTime=endTime' ]
    const expectedResultWithoutEventType = '/events/?startTime=startTime&endTime=endTime'

    it('should push urls to history when there are startTime, EndTime and eventTypes', function () {
      filterService.getUrlFromUncorrelatedFilter(history, filterWithEventTypesAndStartEndTimes)
      expectedResult.forEach(expectedToken => expect(history[0]).to.include(expectedToken))
    })
    it('should push only startTime and EndTime to history and nothing else', function(){
      filterService.getUrlFromUncorrelatedFilter(history, filterWithNoEventTypes)
      expect(history[1]).to.equal(expectedResultWithoutEventType)
    })
    it('should push nothing to history when there are no startTime and EndTime', function () {
      const newHistory = []
      filterService.getUrlFromUncorrelatedFilter(newHistory, filterNostartEndTimes)
      expect(newHistory).to.be.empty
    })
  })

  describe('generateUrl', function () {
    const history = []
    const filter = {ticketId: 0, eventTypes: [1, 2]}

    const result = filterService.generateUrl(history, filter)

    const expectedValue = '/tickets/0?eventTypes=1&eventTypes=2'

    it('should return the right URL from the filter object', function () {
      expect(result).to.equal(expectedValue)
    })
  })

  describe('findEventTypeInRef', function () {
    const testEventTypeId = 0
    const unknownEventTypeId = 10000

    const referenceData = {0: {id: 0, name: 'testZero'}, 1: {id: 1, name: 'testOne'}}

    const expectedEventType = { id: 0, name: 'testZero' }
    const unknownEventType = {id: 10000, name: 'unknown'}

    it('should return a matching object when given a known id', function () {
      const result = filterService.findEventTypeInRef(referenceData)(testEventTypeId)
      expect(result).to.deep.equal(expectedEventType)
    })
    it('should return a new object with name "unknown" when given an unknown id', function () {
      const badResult = filterService.findEventTypeInRef(referenceData)(unknownEventTypeId)
      expect(badResult).to.deep.equal(unknownEventType)
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