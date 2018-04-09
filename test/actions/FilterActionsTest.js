'use strict'
import { expect } from 'chai'
import queryString from 'query-string'
import * as filterActions from 'actions/filterActions'

describe('FilterActions', function () {
  describe('addFilter', function () {
    it('should return a function for eventType with falsy id: 0', function () {
      const history = {}
      const filter = {}
      const signalRFilterType = {}
      const eventType = { id: 0, name: 'Note' }
      const result = filterActions.addFilter(history)(filter, signalRFilterType)(eventType)
      expect(result).to.be.a('function')
    })
  })

  describe('clearFilterIncidentId', function(){
    const result = filterActions.clearFilterIncidentId()
    it('should return an object the correct type and no other properties', function(){
      expect(result.type).to.equal('CLEAR_EVENT_FILTER_INCIDENTID')
      expect(Object.keys(result).length).to.equal(1)
    })
  })
})
