import * as filterActions from '../actions/filterActions'
import * as eventTypeActions from '../actions/eventActions'

export const filter = (defaultFilter) => (state = defaultFilter, action) => {
    switch (action.type) {
        case filterActions.CHANGE_EVENT_FILTER:
            return Object.assign({ eventTypes: [], ticketId: null }, action.filter)
        default:
            return state
    }
}

export default filter