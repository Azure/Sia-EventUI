import * as filterActions from 'actions/filterActions'

export const filter = (defaultFilter) => (state = defaultFilter, action) => {
  switch (action.type) {
    case filterActions.CHANGE_EVENT_FILTER:
      return {...state, eventTypes: [], ticketId: null, ...action.filter}
    default:
      return state
  }
}

export default filter
