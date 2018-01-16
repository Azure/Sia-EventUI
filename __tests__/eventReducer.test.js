import {buildReducersObject, rawList} from '../src/reducers/eventReducer'
import { getEventActionSet, getEventsActionSet } from '../src/actions/eventActions'
import moment from 'moment'

describe('eventReducer', () => {
    describe('rawList', function() {
        describe('default behavior', () => {
            it('should return the default events collection', () => {
                const result = rawList({ events: [] }, {})

                expect(result).toEqual({ events: [] })
            })

        })

        describe('CHANGE_EVENT_FILTER', () => {
            it('should return the default events', () => {
                const mockAction = { type: 'CHANGE_EVENT_FILTER' }

                const result = rawList([], mockAction)

                expect(result).toEqual([])
            })
        })

        describe('RECEIVE_EVENT', ()  => {
            it('should add new received event to state', () => {
                const mockState = []
                const mockEvent = { id: 1, incidentId: 12 }
                const mockReceiveEventAction = {
                    type: 'RECEIVE_EVENT',
                    event: mockEvent,
                    id: 1
                }

                const result = rawList(mockState, mockReceiveEventAction)

                expect(result[0].id).toEqual(1)
                expect(result[0].incidentId).toEqual(12)
                expect(result[0].filterableIncidentId).toEqual('12')
                expect(result[0].timeRecieved).toBe()
            })
        })

        describe('POST_EVENT_SUCCEED', () => {
            it('should add new posted event to state', () => {
                const mockState = []
                const mockEvent = { id: 2, incidentId: 12 }
                const mockPostEventAction = {
                    type: 'POST_EVENT_SUCCEED',
                    event: mockEvent,
                    id: 2
                }

                const result = rawList(mockState, mockPostEventAction)

                expect(result[0].id).toEqual(2)
                expect(result[0].incidentId).toEqual(12)
                expect(result[0].filterableIncidentId).toEqual('12')
                expect(result[0].timeRecieved).toBe()
            })
        })

        describe('RECEIVE_EVENTS plural', () => {
            it('should add received events to state', () => {
                const mockState = []
                const mockReceiveEventsAction = {
                    type: 'RECEIVE_EVENTS',
                    events: [{ id: 1, incidentId: 3 }, { id: 2, incidentId: 10 }],
                    incidentId: 7,
                    pagination: {}
                }

                const result = rawList(mockState, mockReceiveEventsAction)

                expect(typeof(result)).toEqual('object')
                expect(result).toEqual([{filterableIncidentId: '3', id: 1, incidentId: 3}, {filterableIncidentId: '10', id: 2, incidentId: 10}])
            })
        })
    })

    describe('buildReducersToCombine', function () {
        it('should return an object of reducers to combine', function () {
            const mockFetching = []
            const mockError = 42
            const mockPages = 37
            const mockDefaultFilter = {eventTypes: [], incidentId: null}
            const mockFilter = (defaultFilter) => ({
                ...defaultFilter, eventTypes: [42]
            })

            const result = buildReducersObject(mockDefaultFilter)(mockFetching, mockError, mockPages, mockFilter)
            expect(typeof(result)).toEqual('object')
            expect(result).toEqual({fetching: [], error: 42, pages: 37, filter: {eventTypes: [42], incidentId: null}})
        })
    })
})