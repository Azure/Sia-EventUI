'use strict'
import { expect } from 'chai'
import * as ticketActions from 'actions/ticketActions'

describe('TicketActions', function() {
  describe('updateTicketQuery', function() {
    const result = ticketActions.updateTicketQuery(null)
    it('should return an object with type update_ticket_query and given ticketQuery', function() {
      expect(result).to.deep.equal({ type: ticketActions.UPDATE_TICKET_QUERY, ticketQuery: null })
    })

  })

  describe('removeAllTicketsFromRecent', function () {
    const result = ticketActions.removeAllTicketsFromRecent()
    it('should return an object with type remove_all_tickets', function() {
      expect(result).to.deep.equal({ type: ticketActions.REMOVE_ALL_TICKETS })
    })

  })

  describe('removeTicketFromRecent', function () {
    const result = ticketActions.removeTicketFromRecent(0)

    it('should return an object with type remove_ticket and the given id', function () {
      expect(result).to.deep.equal({ type: ticketActions.REMOVE_TICKET, id: 0 })
    })
  })
})
