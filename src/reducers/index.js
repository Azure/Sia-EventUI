import { combineReducers } from 'redux'
import tickets from './ticketReducers'
import auth from './authReducer'
import incidents from './incidentReducers'
import engagements from './engagmentReducer'
import events from './eventReducer'

const rootReducer = combineReducers({
    incidents,
    auth,
    tickets,
    engagements,
    events
})

export default rootReducer