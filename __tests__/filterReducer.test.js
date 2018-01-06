import reducer from '../src/reducers/filterReducer'
import { changeEventFilter, addFilter } from '../src/actions/filterActions'

describe('FilterReducer', function() {
    const initialState = {
        "eventTypes": [],
        "incidentId": 10,
        "ticketId": 10
    }

    it('should return initial state', function() {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    // describe('changeEventFilter', function() {
    //     it('should handle CHANGE_EVENT_FILTER', function() {

    //     })
    // })
})