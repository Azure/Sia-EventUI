import { combineReducers } from 'redux'
import tickets from './ticketReducers'
import auth from './authReducer'
import incidents from './incidentReducers'
import expandSection from './expandSectionReducer'

const rootReducer = combineReducers({
    incidents,
    auth,
    tickets,
    expandSection
})

export default rootReducer