'use strict'
import { expect } from 'chai'
import * as eventActions from 'actions/eventActions'

describe('EventActions', function () {
  describe('getEventsEndPoint', function () {
    describe('when there is an incidentId', function () {
      const incidentId = 42

      const result = eventActions.getEventsEndPoint(incidentId)
      it('should return string with the incident id', function () {
        expect(result).to.equal('incidents/42/events')
      })
    })

    describe('when there is no incidentId', function () {
      const incidentId = null

      let result = eventActions.getEventsEndPoint(incidentId)
      it('should return string with just events', function () {
        expect(result).to.equal('events')
      })
    })
  })

  describe('getEventsFetchArgs', function () {
    describe('when filter has eventTypes', function () {
      it('should return an array item with url that includes eventTypes', function () {
        let filter = { incidentId: 42, ticketId: 1, eventTypes: [0] }

        let result = eventActions.getEventsFetchArgs(filter)

        expect(result).to.deep.equal(['incidents/42/events?eventTypes=0'])
      })
    })

    describe('when filter has no eventTypes', function () {
      it('should return an array item with url', function () {
        let filter = { incidentId: 42, ticketId: 1, eventTypes: [] }

        let result = eventActions.getEventsFetchArgs(filter)

        expect(result).to.deep.equal(['incidents/42/events'])
      })
    })
  })

  describe('getEventActionSet', function () {
    context('when given an eventId', function () {
      const eventId = 1
      describe('try', function () {
        it('should return an object with the incidentId, eventId, and type', function () {
          const result = eventActions.getEventActionSet(eventId).try()

          expect(result).to.deep.equal({type: 'REQUEST_EVENT', id: 1})
        })
      })
    })
  })
})
