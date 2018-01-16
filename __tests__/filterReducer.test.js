import reducer from '../src/reducers/filterReducer'
import { changeEventFilter, addFilter } from '../src/actions/filterActions'

describe('FilterReducer', function() {
    const initialState = {
        "eventTypes": [],
        "incidentId": 12,
        "ticketId": 12
    }
    const defaultFilter = {}

    describe('default behavior', () => {
        const mockAction = {
            type: 'unknown'
        }

        const resultSetup = reducer(defaultFilter)
        const result = resultSetup(defaultFilter, mockAction)

        describe('when given unknown action type', () => {
            it('should return current state, in this case defaultFilter', () => {
                expect(result).toEqual(defaultFilter)
            })
        })
    })

    describe('changeEventFilter', function() {
        it('should handle CHANGE_EVENT_FILTER', function() {
            const mockAction = {
                type: 'CHANGE_EVENT_FILTER',
                filter: {eventTypes: [22], incidentId: 10, ticketId: 10}
            }

            const resultSetup = reducer(defaultFilter)
            const result = resultSetup(initialState, mockAction)

            expect(result).toEqual({eventTypes: [22], incidentId: 10, ticketId: 10})
        })
    })
})