'use strict'
import { expect } from 'chai'
import {
  nothingToAdd,
  typeIsAlreadyFiltered,
  clearFilterIncidentId
} from 'actions/filterActions'

describe('FilterActions', function () {
  describe('applyEventTypeAddition', function () {
    describe('nothingToAdd', function () {
      context('When eventType has Id 0', function () {
        const eventType = {
          id: 0
        }
        it('Should return false', function () {
          expect(nothingToAdd(eventType)).to.be.false
        })
      })

      context('When eventType is null or undefined', function () {
        it('Should return true', function () {
          expect(nothingToAdd(undefined)).to.be.true
          expect(nothingToAdd(null)).to.be.true
        })
      })

      context('When eventType has no id', function () {
        const eventType = {}
        it('Should return true', function () {
          expect(nothingToAdd(eventType)).to.be.true
        })
      })
    })

    describe('typeIsAlreadyFiltered', function () {
      context('When type is not represented in the existing filter', function () {
        const filter = {
          eventTypes: [1]
        }
        const eventType = {
          id: 2
        }

        const result = typeIsAlreadyFiltered(filter, eventType)

        it('Should return false', function () {
          expect(result).to.be.false
        })
      })

      context('When type is represented in the existing filter', function () {
        const filter = {
          eventTypes: [2]
        }
        const eventType = {
          id: 2
        }

        const result = typeIsAlreadyFiltered(filter, eventType)

        it('Should return true', function () {
          expect(result).to.be.true
        })
      })
    })
  })

  describe('clearFilterIncidentId', function () {
    const result = clearFilterIncidentId()
    it('should return an object the correct type and no other properties', function () {
      expect(result.type).to.equal('CLEAR_EVENT_FILTER_INCIDENTID')
      expect(Object.keys(result).length).to.equal(1)
    })
  })
})
