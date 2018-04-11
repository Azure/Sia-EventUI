export const UPDATE_TICKET_QUERY = 'UPDATE_TICKET_QUERY'
export const REMOVE_TICKET = 'REMOVE_TICKET'
export const REMOVE_PREVIOUS_TICKETS = 'REMOVE_PREVIOUS_TICKETS'

export const updateTicketQuery = ticketQuery => ({
  type: UPDATE_TICKET_QUERY,
  ticketQuery
})

export const removePreviousTicketsFromRecent = (currentTicketId) => ({
  type: REMOVE_PREVIOUS_TICKETS,
  currentId: currentTicketId
})

export const removeTicketFromRecent = (id) => ({
  type: REMOVE_TICKET,
  id
})
