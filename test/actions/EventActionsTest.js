'use strict'
import { expect } from 'chai'
import * as eventActions from '../../src/actions/eventActions'

describe('EventActions', function () {
    describe('serializeFilters', function () {
        it('should return an empty string when passed an empty object or a falsey object', function () {
            expect(eventActions.serializeFilters(null)).to.equal('')
            expect(eventActions.serializeFilters({})).to.equal('')
        })

        it('should return a serialized query fragment when passed an object with properties', function () {
            const testInput = {
                testProperty: 'testValue',
                secondTestProperty: 'secondTestValue'
            }
            const expectedResult = 'testProperty=testValue&secondTestProperty=secondTestValue'
            
            expect(eventActions.serializeFilters(testInput)).to.equal(expectedResult)
        })

        it('Should ignore incidentId', function () {
            const testInput = {
                incidentId: 'valueThatShouldNotBeThere'
            }
            expect(eventActions.serializeFilters(testInput)).to.equal('')
        })
    })
})

