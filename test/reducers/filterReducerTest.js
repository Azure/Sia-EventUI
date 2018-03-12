'use strict'
import { expect } from 'chai'
import * as filterActions from 'actions/filterActions.js'
import filterReducer from 'reducers/filterReducer'

const defaultFilter = { eventTypes: [], ticketId: null }
const filterWithEventTypes = {incidentId: 0, ticketId: 0, eventTypes: [1, 2]}

const newFilterWithIncidentId = {incidentId: 1, ticketId: 0, eventTypes: [1, 2, 3]}
const newFilterNoTicketId = { incidentId: 0, eventTypes: [1] }
const newFilterNoEventTypes = {incidentId: 0, ticketId: 0}

const history = []

const dispatch = function () {
  return 'nothing'
}

const defaultFilterNoFilterInUrl = null
const defaultFilterSomethingInUrl = {eventTypes: [1]}

const actions = {
  change: filterActions.changeEventFilter(history)(newFilterWithIncidentId),
  badChangeOne: filterActions.changeEventFilter(history)(newFilterNoTicketId),
  badChangeTwo: filterActions.changeEventFilter(history)(newFilterNoEventTypes),
  noChange: {
    type: 'DUMMY_ACTION'
  },
  clearIncidentId: filterActions.clearFilterIncidentId(newFilterWithIncidentId)
}

const changedEventFilter = { incidentId: 1, ticketId: 0, eventTypes: [1, 2, 3] }

describe('filterReducer', function () {
  describe('from default state', function () {
    it('should return the initial state with no filter in URL', function () {
      expect(filterReducer(defaultFilterNoFilterInUrl)(undefined, {})).to.equal(null)
    })
    it('should return the initial state with filter in URL', function () {
      expect(filterReducer(defaultFilterSomethingInUrl)(undefined, {})).to.deep.equal({eventTypes: [1]})
    })
    it('should return the initial state with filter in URL when passed action other than CHANGE_EVENT_TYPES', function () {
      expect(filterReducer(defaultFilterSomethingInUrl)(undefined, actions.noChange)).to.deep.equal({ eventTypes: [1] })
    })
    it('should return a new filter when passed a good filter that is different than current filter', function () {
      expect(filterReducer(defaultFilterNoFilterInUrl)(undefined, actions.change)).to.deep.equal(newFilterWithIncidentId)
    })
    it('should return a new filter with default null ticketId when passed a filter w/no ticketId', function () {
      expect(filterReducer(defaultFilterNoFilterInUrl)(undefined, actions.badChangeOne)).to.deep.equal({incidentId: 0, ticketId: null, eventTypes: [1]})
    })
    it('should return a new filter with default empty eventTypes when passed a filter w/no eventTypes', function () {
      expect(filterReducer(defaultFilterNoFilterInUrl)(undefined, actions.badChangeTwo)).to.deep.equal({incidentId: 0, ticketId: 0, eventTypes: []})
    })
    it('should return a new filter with incidentId cleared when passed action as CLEAR_EVENT_FILTER_INCIDENTID', function(){
      expect(filterReducer(defaultFilterSomethingInUrl)(undefined, actions.clearIncidentId)).to.deep.equal({ticketId: 0, eventTypes: [1, 2, 3]})
    })
  }),

  describe('from initialized state', function () {
    it('should return a new filter with incidentId cleared when passed action as CLEAR_EVENT_FILTER_INCIDENTID', function(){
      expect(filterReducer(defaultFilterSomethingInUrl)(changedEventFilter, actions.clearIncidentId)).to.deep.equal({ticketId: 0, eventTypes: [1, 2, 3]})
    })
  })
})
