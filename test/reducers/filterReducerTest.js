'use strict'
import { expect } from 'chai'

import * as filterActions from 'actions/filterActions.js'
import * as filterReducer from 'reducers/filterReducer'

/* eslint-disable no-unused-expressions */
describe('filterReducer', function () {
  context('When the default filter contains all keys', function () {
    it('Should create all filter reducers', function () {
      const defaultFilter = {
        incidentId: null,
        eventTypes: null,
        startTime: null,
        endTime: null,
        dataSearch: null
      }

      const result = filterReducer.filter(defaultFilter)({}, { type: null, filter: null })

      expect(result.incidentId).to.not.be.undefined
      expect(result.eventTypes).to.not.be.undefined
      expect(result.startTime).to.not.be.undefined
      expect(result.endTime).to.not.be.undefined
      expect(result.dataSearch).to.not.be.undefined
    })
  })

  context('When the default filter is missing keys', function () {
    it('Should create all filter reducers', function () {
      const defaultFilter = {
        eventTypes: null
      }

      const result = filterReducer.filter(defaultFilter)({}, { type: null, filter: null })

      expect(result.incidentId).to.not.be.undefined
      expect(result.eventTypes).to.not.be.undefined
      expect(result.startTime).to.not.be.undefined
      expect(result.endTime).to.not.be.undefined
      expect(result.dataSearch).to.not.be.undefined
    })
  })

  describe('IncidentId reducer', function () {
    describe('When action is CLEAR_EVENT_FILTER_INCIDENTID', function () {
      const clearIncidentIdAction = { type: filterActions.CLEAR_EVENT_FILTER_INCIDENTID }
      it('Should return null regardless of initial state', function () {
        expect(filterReducer.incidentId()(null, clearIncidentIdAction)).to.be.null
        expect(filterReducer.incidentId()(100, clearIncidentIdAction)).to.be.null
      })
    })

    describe('When action is UPDATE_EVENT_FILTER_INCIDENT_ID', function () {
      const updateIncidentIdAction = {
        type: filterActions.UPDATE_EVENT_FILTER_INCIDENTID,
        incidentId: 10
      }

      it('Should return the new action.incidentid regardless of initial state', function () {
        expect(filterReducer.incidentId()(null, updateIncidentIdAction)).to.equal(10)
        expect(filterReducer.incidentId()(100, updateIncidentIdAction)).to.equal(10)
      })
    })

    describe('When action does not match any reducer cases', function () {
      const noOpAction = { type:'IGNORE_ME'}

      it('Should return the existing state object', function () {
        expect(filterReducer.incidentId()(null, noOpAction)).to.be.null
        expect(filterReducer.incidentId()(100, noOpAction)).to.equal(100)
      })
    })
  })

  describe('DataSearch reducer', function () {
    describe('When action is UPDATE_DATASEARCH', function () {
      describe('When filter includes a dataSearch', function () {
        const testAction = { type: filterActions.UPDATE_DATASEARCH, dataSearch: 'search' }
        it('Should return an object with an dataSearch info matching the object regardless of initial state', function () {
          expect(filterReducer.dataSearch()(null, testAction)).to.equal('search')
          expect(filterReducer.dataSearch()('old_search', testAction)).to.equal('search')
        })
      })

      describe('When filter does not include a dataSearch', function () {
        const testAction = { type: filterActions.UPDATE_DATASEARCH}
        it('Should return an object with the initial dataSearch info', function () {
          expect(filterReducer.dataSearch()(null, testAction)).to.be.null
          expect(filterReducer.dataSearch()('old_search', testAction)).to.equal('old_search')
        })
      })
    })

    describe('When action does not match any reducer cases', function () {
      const result = filterReducer.dataSearch()('old_search', {type:'IGNORE_ME'})

      it('Should return the existing state object', function () {
        expect(result).to.equal('old_search')
      })
    })
  })

  describe('eventTypes reducer', function () {
    const reducer = filterReducer.eventTypes()

    context('When action is ADD_EVENT_TYPE_TO_FILTER', function () {
      const action = {
        type: 'ADD_EVENT_TYPE_TO_FILTER',
        eventTypeId: 10
      }

      context('When state does not include action.eventTypeId', function () {
        const state = []
        const result = reducer(state, action)

        it('Should add action.eventTypeId to state', function () {
          expect(result).to.include(10)
        })
      })

      context('When state includes action.eventTypeId already', function () {
        const state = [10]
        const result = reducer(state, action)

        it('Should return the original state object', function () {
          expect(result).to.equal(state)
        })
      })
    })

    context('When action is REMOVE_EVENT_TYPE_FROM_FILTER', function () {
      const action = {
        type: 'REMOVE_EVENT_TYPE_FROM_FILTER',
        eventTypeId: 10
      }

      context('When state does not include action.eventTypeId', function () {
        const state = []
        const result = reducer(state, action)

        it('Should return the original state object', function () {
          expect(result).to.equal(state)
        })
      })

      context('When state includes action.eventTypeId already', function () {
        const state = [10]
        const result = reducer(state, action)

        it('Should remove action.eventTypeId from state', function () {
          expect(result).to.not.include(10)
        })
      })
    })

    context('When action does not match any reducer cases', function () {
      const action = {type:'IGNORE_ME'}
      const state = {}
      const result = reducer(state, action)

      it('Should return the existing state object unmodified', function () {
        expect(result).to.equal(state)
      })
    })
  })
})