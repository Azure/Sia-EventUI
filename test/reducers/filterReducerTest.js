'use strict'
import { expect } from 'chai'
import * as filterActions from '../../src/actions/filterActions.js'
import filterReducer from '../../src/reducers/filterReducer'

const defaultFilter = { eventTypes: [], ticketId: null }
const filterWithEventTypes = {incidentId: 0, ticketId: 0, eventTypes: [1, 2]}

const newFilterWithIncidentId = {incidentId: 1, ticketId: 0, eventTypes: [1,2,3]}
const newFilterNoTicketId = { incidentId: 0, eventTypes: [1] }
const newFilterNoEventTypes = {incidentId: 0, ticketId: 0}

const history = []

const dispatch = function() {
    return 'nothing'
}

const defaultFilterNoFilterInUrl = null
const defaultFilterSomethingInUrl = {eventTypes: [1]}

const actions ={
    change: filterActions.changeEventFilter(history)(newFilterWithIncidentId),
    badChangeOne: filterActions.changeEventFilter(history)(newFilterNoTicketId),
    badChangeTwo: filterActions.changeEventFilter(history)(newFilterNoEventTypes),
    noChange:  {
        type: 'DUMMY_ACTION'
    }
}

const changedEventFilter = { incidentId: 1, ticketId: 0, eventTypes: [1, 2, 3] }

describe('filterReducer', function () {
    it('should return the initial state with no filter in URL', function() {
        expect(filterReducer(defaultFilterNoFilterInUrl)(undefined, {})).to.equal(null)
    })
    it('should return the initial state with filter in URL', function() {
        expect(filterReducer(defaultFilterSomethingInUrl)(undefined, {})).to.deep.equal({eventTypes: [1]})
    })
    it('should return the initial state with filter in URL when passed action other than CHANGE_EVENT_TYPES', function () {
        expect(filterReducer(defaultFilterSomethingInUrl)(undefined, actions.noChange)).to.deep.equal({ eventTypes: [1] })
    })
    it('should return a new filter when passed a good filter that is different than current filter', function() {
        expect(filterReducer(defaultFilterNoFilterInUrl)(undefined, actions.change)).to.deep.equal(newFilterWithIncidentId)
    })
    it('should return a new filter with default null ticketId when passed a filter w/no ticketId', function() {
        expect(filterReducer(defaultFilterNoFilterInUrl)(undefined, actions.badChangeOne)).to.deep.equal({incidentId: 0, ticketId: null, eventTypes: [1]})
    })
    it('should return a new filter with default empty eventTypes when passed a filter w/no eventTypes', function() {
        expect(filterReducer(defaultFilterNoFilterInUrl)(undefined, actions.badChangeTwo)).to.deep.equal({incidentId: 0, ticketId: 0, eventTypes: []})
    })
})