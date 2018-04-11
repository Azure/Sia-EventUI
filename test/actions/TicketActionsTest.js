'use strict'
import { expect } from 'chai'
import * as ticketActions from 'actions/ticketActions'

describe('TicketActions', function () {
  describe('updateTicketQuery', function () {
    const result = ticketActions.updateTicketQuery(null)
    it('should return an object with type update_ticket_query and given ticketQuery', function () {
      expect(result).to.deep.equal({ type: ticketActions.UPDATE_TICKET_QUERY, ticketQuery: null })
    })
  })

  describe('#removePreviousTicketsFromRecent', function () {
    const result = ticketActions.removePreviousTicketsFromRecent(100)
    describe('action object', function () {
      it('Should have the REMOVE_PREVIOUS_TICKETS type', function () {
        expect(result.type).to.equal('REMOVE_PREVIOUS_TICKETS')
      })

      it('Should have a current property with the passed in value', function () {
        expect(result.currentId).to.equal(100)
      })
    })
  })

  describe('removeTicketFromRecent', function () {
    const result = ticketActions.removeTicketFromRecent(0)

    it('should return an object with type remove_ticket and the given id', function () {
      expect(result).to.deep.equal({ type: ticketActions.REMOVE_TICKET, id: 0 })
    })
  })
})
