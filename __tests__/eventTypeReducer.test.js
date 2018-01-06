import reducer from '../src/reducers/eventTypeReducer'
import { getEventTypeActionSet, getEventTypesActionSet } from '../src/actions/eventTypeActions'

const initialState = { "error": [], "fetching": [], "records": {} }

describe('eventTypeReducer', ()=> {
    const eventTypeId = 42
    const eventTypeMock = {
        eventType: { id: 42 },
        eventTypes: [{ id: 42 }, { id: 43 }]
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    describe('getEventTypeActionSet', () => {
        it('should handle TRY_GET_EVENT_TYPE', () => {
            const tryGetEventAction = () => ({
                type: getEventTypeActionSet(eventTypeId).try(),
                id: eventTypeId
            })

            expect(reducer(initialState, tryGetEventAction)).toEqual(initialState)
        })

        it('should handle GET_EVENT_TYPE_SUCCESS', () => {
            const succeedGetEventAction = {
                type: getEventTypeActionSet(eventTypeId).succeed().type,
                eventType: eventTypeMock.eventType
            }

            const laterState = { "error": [], "fetching": [], "records": { 0: { id: 0 } } }

            expect(reducer(initialState, succeedGetEventAction)).toEqual({ "error": [], "fetching": [], "records": { 42: { id: 42 } } })
            expect(reducer(laterState, succeedGetEventAction)).toEqual({ "error": [], "fetching": [], "records": { 0: { id: 0 }, 42: { id: 42 }}})
        })

        it('should handle GET_EVENT_TYPE_FAILURE', () => {
            const failGetEventAction = {
                type: getEventTypeActionSet(eventTypeId).fail().type,
                failureReason: 'FAIL'
            }

            expect(reducer(initialState, failGetEventAction)).toEqual({ "error": [undefined], "fetching": [], "records": {} })
        })
    })

    describe('getEventTypeActionSet', () => {
        it('should handle TRY_GET_EVENT_TYPES', () => {
            const tryGetEventAction = () => ({
                type: getEventTypesActionSet.try().type,
                id: eventTypeId
            })

            expect(reducer(initialState, tryGetEventAction)).toEqual(initialState)
        })

        it('should handle GET_EVENT_TYPES_SUCCESS', () => {
            const succeedGetEventAction = {
                type: getEventTypesActionSet.succeed().type,
                eventTypes: eventTypeMock.eventTypes
            }

            expect(reducer(initialState, succeedGetEventAction)).toEqual({ "error": [], "fetching": [], "records": 
            { 42: { id: 42 }, 
            43: { id: 43 } 
        } })
        })

        it('should handle GET_EVENT_TYPES_FAILURE', () => {
            const failGetEventAction = {
                type: getEventTypesActionSet.fail(),
                failureReason: 'FAIL'
            }

            const laterState = { "error": [], "fetching": [], "records": {0:{id:0}} }

            expect(reducer(initialState, failGetEventAction)).toEqual({ "error": [], "fetching": [], "records": {} })
            expect(reducer(laterState, failGetEventAction)).toEqual({ "error": [], "fetching": [], "records": {0:{id:0}} })
        })
    })
})