'use strict'
import { expect } from 'chai'

import * as filterActions from 'actions/filterActions.js'
import filterReducer from 'reducers/filterReducer'

const defaultFilter = { eventTypes: [], ticketId: null }
const filterWithEventTypes = {incidentId: 2, ticketId: 2, eventTypes: [1, 2]}

const newFilterWithIncidentId = {incidentId: 1, ticketId: 2, eventTypes: [1, 2, 3]}
const newFilterNoTicketId = { incidentId: 2, eventTypes: [1] }
const newFilterNoEventTypes = {incidentId: 2, ticketId: 2}

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
  it('should return the initial state with no filter in URL', function () {
    const result = Object.entries(filterReducer(defaultFilterNoFilterInUrl)(undefined, {}))
    result.forEach(element => expect(element[1]).to.equal(null))
  })
  it('should return the initial state with filter in URL', function () {
    expect(filterReducer(defaultFilterSomethingInUrl)(undefined, {}).eventTypes).to.deep.equal([1])
  })
  it('should return the initial state with filter in URL when passed action other than CHANGE_EVENT_TYPES', function () {
    expect(filterReducer(defaultFilterSomethingInUrl)(undefined, actions.noChange).eventTypes).to.deep.equal([1])
  })
  it('should return a new filter when passed a good filter that is different than current filter', function () {
    const result = filterReducer(defaultFilterNoFilterInUrl)(undefined, actions.change)
    expect(result.incidentId).to.equal(1)
    expect(result.ticketId).to.equal(2)
    expect(result.eventTypes).to.deep.equal([1,2,3])
    Object.entries(result).filter(element => element[0] != 'incidentId' &&
                          element[0] != 'ticketId' &&
                          element[0] != 'eventTypes').forEach(element => expect(element[1]).to.equal(null))
  })
  it('should return a new filter with default null ticketId when passed a filter w/no ticketId', function () {
    const result = filterReducer(defaultFilterNoFilterInUrl)(undefined, actions.badChangeOne)
    expect(result.incidentId).to.equal(2)
    expect(result.eventTypes).to.deep.equal([1])
    Object.entries(result).filter(element => element[0] != 'incidentId' &&
                          element[0] != 'eventTypes').forEach(element => expect(element[1]).to.equal(null))
  })
  it('should return a new filter with default empty eventTypes when passed a filter w/no eventTypes', function () {
    const result = filterReducer(defaultFilterNoFilterInUrl)(undefined, actions.badChangeTwo)
    expect(result.incidentId).to.equal(2)
    expect(result.ticketId).to.equal(2)
    Object.entries(result).filter(element => element[0] != 'incidentId' &&
                          element[0] != 'ticketId').forEach(element => expect(element[1]).to.equal(null))
    
  })
  it('should return a new filter with incidentId cleared when passed action as CLEAR_EVENT_FILTER_INCIDENTID', function(){
   const result = filterReducer(defaultFilterNoFilterInUrl)(undefined, actions.clearIncidentId)
    Object.entries(result).forEach(element => expect(element[1]).to.equal(null))
  })
})
