'use strict'
import { expect } from 'chai'
import queryString from 'query-string'
import * as filterActions from '../../src/actions/filterActions'

describe('FilterActions', function () {
    describe('getFilterFromUrl', function() {
        const testQueryOne = '?eventTypes=16&eventTypes=11'
        const expectedValue = [16, 11] 
        const resultOne = filterActions.getFilterFromUrl(testQueryOne)
        it('should return the right value from the query string', function() {
            expect(resultOne).to.be.an('object')
            expect(resultOne.eventTypes).to.be.an('array')
            expect(resultOne.eventTypes[0]).to.equal(expectedValue[0])
            expect(resultOne.eventTypes[1]).to.equal(expectedValue[1])
        })
        it('should return an array when query string includes a single filter value', function() {
            const testQueryTwo = '?eventTypes=1'
            const resultTwo = filterActions.getFilterFromUrl(testQueryTwo)

            expect(resultTwo).to.be.an('object')
            expect(resultTwo.eventTypes).to.be.an('array')
        })
        it('should return an int array', function() {
            const unexpectedValue = ["16", "11"]

            expect(resultOne.eventTypes[0]).to.not.equal(unexpectedValue[0])
            expect(resultOne.eventTypes[0]).to.equal(parseInt(unexpectedValue[0]))
        })
        it('should return null if filter is of unknown type', function() {
            const badTestQueryOne = '?foo=baz'
            const resultThree = filterActions.getFilterFromUrl(badTestQueryOne)
            expect(resultThree).to.equal(null)
        })
        it('should return null if filter has no value in key-value pair', function() {
            const badTestQueryTwo = '?foo='
            const resultFour = filterActions.getFilterFromUrl(badTestQueryTwo)

            expect(resultFour).to.equal(null)
        })
        it('should return null if filter has no key in key-value pair', function () {
            const badTestQueryThree = '?=foo'
            const resultFive = filterActions.getFilterFromUrl(badTestQueryThree)

            expect(resultFive).to.equal(null)
        })
        it('should return null if filter has no key-value pair', function () {
            const badTestQueryFour = '?'
            const resultSix = filterActions.getFilterFromUrl(badTestQueryFour)

            expect(resultSix).to.equal(null)
        })
    })

    describe('getUrlFromFilter', function() {
        const history = []
        
        const filterNoEventTypes = {ticketId: 0, foo: 'bar'}
        const filterWithEventTypes = {ticketId: 0, eventTypes: [1,2]}

        const expectedResult = '/tickets/0?eventTypes=1&eventTypes=2'

        filterActions.getUrlFromFilter(history, filterWithEventTypes)

        it('should push urls to history when there are eventTypes', function() {
            expect(history[0]).to.equal(expectedResult)
        })
        it('should push nothing to history when there are no eventTypes', function() {
            const newHistory = []
            filterActions.getUrlFromFilter(newHistory, filterNoEventTypes)
            expect(newHistory).to.be.empty
        })
    })

    describe('generateUrl', function() {
        const history = []
        const filter = {ticketId: 0, eventTypes: [1, 2]}

        const result = filterActions.generateUrl(history, filter)

        const expectedValue = '/tickets/0?eventTypes=1&eventTypes=2'

        it('should return the right URL from the filter object', function() {
            expect(result).to.equal(expectedValue)
        })
    })

    describe('findEventTypeInRef', function() {
        const testEventTypeId = 0
        const unknownEventTypeId = 10000

        const referenceData = {0: {id: 0, name: 'testZero'}, 1: {id: 1, name: 'testOne'}}

        const expectedEventType = { id: 0, name: 'testZero' }
        const unknownEventType = {id: 10000, name: 'unknown'}

        it('should return a matching object when given a known id', function() {
            const result = filterActions.findEventTypeInRef(testEventTypeId, referenceData)
            expect(result).to.deep.equal(expectedEventType)
        })
        it('should return a new object with name "unknown" when given an unknown id', function() {
            const badResult = filterActions.findEventTypeInRef(unknownEventTypeId, referenceData)
            expect(badResult).to.deep.equal(unknownEventType)
        })
    })

    describe('changeEventFilter', function() {
        const history = []
        const filter = {ticketId: 0, eventTypes: [1,2]}

        const result = filterActions.changeEventFilter(history)(filter)

        const expectedValue = {type: 'CHANGE_EVENT_FILTER', filter: {ticketId: 0, eventTypes: [1, 2]}}
        
        it('should return an object with a type and a filter', function() {
            expect(result).to.deep.equal(expectedValue)
        })
    })

    describe('applyFilter', function() {
        const history = []
        const oldFilter = {incidentId: 0}
        const goodNewFilter = {incidentId: 0}
        const badNewFilter = {foo: 'bar'}

        const dispatch = function(arg) {
            return arg
        }
        const errorMessage = 'Need to filter on incidentId!'
        const expectedReturn = { type: 'CHANGE_EVENT_FILTER', filter: {incidentId: 0} }

        it('should throw an error when new filter has no incident id', function() {
            expect(() => filterActions.applyFilter(history)(oldFilter, badNewFilter)(dispatch)).to.throw(errorMessage)
        })
    })

    describe('serializeEventTypesForQuery', function() {
        const eventTypes = [1, 2]
        const noEventTypes = []

        const expectedResult = 'eventTypes=1&eventTypes=2'

        const result = filterActions.serializeEventTypesForQuery(eventTypes)

        it('should return a serialized array', function() {
            expect(result).to.equal(expectedResult)
        })
        it('should return an empty string if given an empty array', function() {
            const emptyStringResult = filterActions.serializeEventTypesForQuery(noEventTypes)
            expect(emptyStringResult).to.equal('')
        })
    })

    describe('serializeFiltersForUrl', function() {
        const filterNoEventTypes = { incidentId: 0 }
        const filterWithEventTypes = {incidentId: 0, eventTypes: [1, 2]}
        const filterWithEverything = {incidentId: 0, eventTypes: [1, 2], foo: 'bar'}

        const expectedFilterTokensWithoutEventTypes = '?'
        const expectedFilterTokensWithEventTypes = '?eventTypes=1&eventTypes=2'
        const expectedFilterTokensWithEverything = '?foo=bar&eventTypes=1&eventTypes=2'

        const resultNoEventTypes = filterActions.serializeFiltersForUrl(filterNoEventTypes)
        const resultWithEventTypes = filterActions.serializeFiltersForUrl(filterWithEventTypes)
        const resultWithEverything = filterActions.serializeFiltersForUrl(filterWithEverything)

        it('should return an empty string when no event types and no other filters', function() {
            expect(resultNoEventTypes).to.equal(expectedFilterTokensWithoutEventTypes)
        })
        it('should return a string of eventTypes if no other filter types', function() {
            expect(resultWithEventTypes).to.equal(expectedFilterTokensWithEventTypes)
        })
        it('should return a string with multiple filter types if given a more complex object', function() {
            expect(resultWithEverything).to.equal(expectedFilterTokensWithEverything)
        })
    })

})


