import React from 'react'

import Ticket from 'components/Incident/Ticket'
import LoadGate from 'components/elements/LoadGate'
import { fetchIncidentsByTicketId } from 'actions/incidentActions'
import DisplayIncident from 'components/Incident/DisplayIncident'
import IncidentSummary from 'components/Incident/IncidentSummary'
import IncidentEvents from 'components/Incident/IncidentEvents'
import Passthrough from 'components/elements/Passthrough'
import InjectArgs from 'components/elements/InjectArgs'
import { getTicket } from 'reducers/ticketReducers'

export const App = (props) => {
  return <Passthrough ticketId={parseInt(props.match.params.ticketId)}>
    <LoadGate
      isAvailable={(state, ownProps) => state.tickets.map[ownProps.ticketId]}
      isLoading={(state, ownProps) => state.incidents.fetchingByTicketId.includes(ownProps.ticketId)}
      isError={(state, ownProps) => state.incidents.errorByTicketId.includes(ownProps.ticketId)}
      loadByDispatching={({ticketId}) => fetchIncidentsByTicketId(ticketId)}
      loadMessage={({ticketId}) => 'Loading ticket ' + ticketId}
      errorMessage={({ticketId}) => 'Error when loading ticket ' + ticketId}
    >
      <InjectArgs
        pullFromState={(state, ownProps) => ({
          ticket: getTicket(state)(ownProps.ticketId)
        })}
        injectUsing={({ticket}) => ({
          incidentId: ticket ? ticket.incidentId : null
        })}
      >
        <DisplayIncident>
          <IncidentSummary />
          <IncidentEvents />
        </DisplayIncident>
      </InjectArgs>
    </LoadGate>
  </Passthrough>
}
//
export default App