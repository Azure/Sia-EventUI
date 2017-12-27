'use strict'
import { expect } from 'chai'
import * as filterActions from '../../src/actions/filterActions'

describe('FilterActions', function () {
    describe('serializeFilters', function () {
        it('should return an empty string when passed an empty object or a falsey object', function () {
            expect(eventActions.serializeFilters(null)).to.equal('')
            expect(eventActions.serializeFilters({})).to.equal('')
        })

        it('should return a serialized query fragment when passed an object with properties', function () {
            const testInput = {
                testProperty: 'testValue',
                secondTestProperty: 'secondTestValue'````````````````````````````
            }
            const expectedResult = 'testProperty=testValue&secondTestProperty=secondTestValue'

            expect(filterActions.serializeFilters(testInput)).to.equal(expectedResult)
        })

        it('Should ignore incidentId', function () {
            const testInput = {
                incidentId: 'valueThatShouldNotBeThere'
            }
            expect(filterActions.serializeFilters(testInput)).to.equal('')
        })
    })
})



// Filter Actions

// list of events[]
// filter object { eventTypes: [] }
// url ''

// HAPPY PATHS AT TOP
// SAD PATHS AT BOTTOM
// should see intended cases before exceptional cases

// It does nothing
// when query parameters are blank
// it no - ops(no - op it does nothing, no state change no activity at all)
// when query params use an unknown key
// it no - ops(eg foo - baz = quuux)
// it indicates to user that there is no such filter type ?
//     when key is an event type
// and event type value is eventTypeId
// and ET ID is valid
// it updates state with an eventType in the filter object
// it clears event list
// it queries the gateway
// it populates event list with only the EventType's events

// when the event type ID does not correlate to the event type
// it does not change events list
// it indicates to the user that that ET ID is invalid[tests for prop in reducer that matches whatever flash message we have"]


