export const UPDATE_TICKET_QUERY = 'UPDATE_TICKET_QUERY'
export const REMOVE_TICKET = 'REMOVE_TICKET'
export const REMOVE_ALL_TICKETS = 'REMOVE_ALL_TICKETS'


export const updateTicketQuery = ticketQuery => ({
  type: UPDATE_TICKET_QUERY,
  ticketQuery
})

export const removeAllTicketsFromRecent = (ids) => ({
  type: REMOVE_ALL_TICKETS,
  ids
})

export const removeTicketFromRecent = (id) => ({
  type: REMOVE_TICKET,
  id
})