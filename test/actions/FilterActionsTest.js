'use strict'
import { expect } from 'chai'
import queryString from 'query-string'
import * as filterActions from 'actions/filterActions'

describe('FilterActions', function () {
  describe('applyEventTypeAddition', function () {
    describe('nothingToAdd', function () {
      context('When eventType has Id 0', function () {
        const eventType = {
          id: 0
        }
        it('Should return false', function () {
          expect(filterActions.nothingToAdd(eventType)).to.be.false
        })
      })

      context('When eventType is null or undefined', function () {
        it('Should return true', function () {
          expect(filterActions.nothingToAdd(undefined)).to.be.true
          expect(filterActions.nothingToAdd(null)).to.be.true
        })
      })

      context('When eventType has no id', function () {
        const eventType = {}
        it('Should return true', function () {
          expect(filterActions.nothingToAdd(eventType)).to.be.true
        })
      })
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
