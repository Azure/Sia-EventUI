'use strict'
import { expect } from 'chai'
// import * as eventActions from '../../src/actions/eventActions.js'
import eventReducer, { filter } from '../../src/reducers/eventReducer'

const defaultState = {}

describe('Event Reducer', function EventReducerTest() {
    describe('filter()', function() {
        describe('when the provided filter has no type', function () {
            it('should return the current state', function () {
                var state = {fozzie: 'bear'}
                var filterAction = {}
                expect(filter(state, filterAction)).to.equal(state)
            })
        })
        describe('when the provided filter has a known type', function () {
            it('should filter to the expected state', function () {
                var state = { 
                    fozzie: 'bear', 
                    miss: 'piggy', 
                    kermit: 'the frog'
                }

                var expectedState = { 
                    incidentId: 0,
                    eventTypes: [{id: 1, name: 'TestName'}]                    
                }

                
                var filterAction = { 
                    type: 'CHANGE_EVENT_FILTER', 
                    filter: {
                        incidentId: 0,
                        eventTypes: [{id: 1, name: 'TestName'}]
                    } 
                }

                expect(filter(state, filterAction)).to.eql(expectedState)
            })
        })
        describe('when the provided filter has an unknown type', function () {
            it('should return the current state', function () {
                var state = {fozzie: 'bear'}
                var filterAction = {}
                expect(filter(state, filterAction)).to.equal(state)
            })
        })
    })
})