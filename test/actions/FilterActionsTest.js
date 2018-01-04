'use strict'
import { expect } from 'chai'
import queryString from 'query-string'
import * as filterActions from '../../src/actions/filterActions'

// Istanbul for test coverage, provides us with a new command nyc-mocha, which runs the tests and gives a reporter
describe('FilterActions', function () {
    describe('getFilterFromUrl', function() {
        describe('when the query string provides a single value for eventTypes', function() {
            it('should return an array with one value', function() {
                let testQuery = '?eventTypes=1'
    
                let result = filterActions.getFilterFromUrl(testQuery)

                expect(result.eventTypes).to.eql([1])
            })
        })

        describe('when the query string provides multiple values for eventTypes', function() {
            it('should return the right value from the query string', function() {
                let testQuery = '?eventTypes=16&eventTypes=11'

                let result = filterActions.getFilterFromUrl(testQuery)
                
                expect(result.eventTypes).to.eql([16, 11])
            })
        })

        context('bad query strings', function() {
            describe('when an arbitrary key is given', function() {
                it('should return null if the arbitrary key is of unknown type', function() {
                    let badTestQuery = '?foo=baz'
        
                    let result = filterActions.getFilterFromUrl(badTestQuery)

                    expect(result).to.equal(null)
                })
            })
            describe('when filter has no value in key-value pair', function() {
                it('should return null', function() {
                    let badTestQuery = '?foo='
        
                    let result = filterActions.getFilterFromUrl(badTestQuery)
        
                    expect(result).to.equal(null)
                })
            })

            describe('when filter has no key in key-value pair', function() {
                it('should return null', function () {
                    let badTestQuery = '?=foo'
        
                    let result = filterActions.getFilterFromUrl(badTestQuery)
        
                    expect(result).to.equal(null)
                })
            })
            
            describe('when filter has no key-value pair', function() {
                it('should return null', function () {
                    let badTestQuery = '?'
        
                    let result = filterActions.getFilterFromUrl(badTestQuery)
        
                    expect(result).to.equal(null)
                })
            })           
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
            const result = filterActions.findEventTypeInRef(referenceData)(testEventTypeId)
            expect(result).to.deep.equal(expectedEventType)
        })
        it('should return a new object with name "unknown" when given an unknown id', function() {
            const badResult = filterActions.findEventTypeInRef(referenceData)(unknownEventTypeId)
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

        const expectedFilterTokensWithoutEventTypes = ''
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


