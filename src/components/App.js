import React from 'react'

import Ticket from 'components/Incident/Ticket'
import LoadGate from 'components/elements/LoadGate'
import { fetchIncidentsByTicketId, fetchIncident } from 'actions/incidentActions'
import DisplayIncident from 'components/Incident/DisplayIncident'
import {
  IncidentSummary,
  IncidentHeader,
  SummaryStatement,
  TicketDetails,
  TicketLink,
  TicketSeverity,
  BasicInfo,
  IncidentManager,
  IncidentManagerName,
  EditIncidentManager,
  Title
} from 'components/Incident/IncidentSummary'
import Engagements from 'components/Engagements'
import GlobalActions from 'components/Timeline/Playbook/GlobalActions'
import { IncidentEvents, TimelineTitle } from 'components/Incident/IncidentEvents'
import Passthrough from 'components/elements/Passthrough'
import InjectArgs from 'components/elements/InjectArgs'
import { getTicket } from 'reducers/ticketReducers'
import Timeline from 'components/Timeline/Timeline'


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
        pullFromState={(state, ownProps) => {
          const ticket = getTicket(state)(ownProps.ticketId)
          const ticketSystemId = ticket ? (ticket.ticketSystemId ? ticket.ticketSystemId : 1) : 1
          return {
            ticket,
            ticketSystemId,
            ticketSystem: state.tickets.systems[ticketSystemId]
          }
        }}
        injectUsing={({ticket}) => ({
          incidentId: ticket ? ticket.incidentId : null
        })}
      >
        <LoadGate
          isAvailable={(state, ownProps) => state.incidents.map[ownProps.incidentId]}
          isLoading={(state, ownProps) => state.incidents.fetchingByIncidentId.includes(ownProps.incidentId)}
          isError={(state, ownProps) => state.incidents.errorByIncidentId.includes(ownProps.incidentId)}
          loadByDispatching={({incidentId}) => fetchIncident(incidentId)}
          loadMessage={({incidentId}) => 'Loading incident ' + incidentId}
          errorMessage={({incidentId}) => 'Error when loading incident ' + incidentId}
        >
          <DisplayIncident>
            <IncidentSummary>
              <IncidentHeader>
                <SummaryStatement />
              </IncidentHeader>
              <TicketDetails >
                <BasicInfo>
                  <TicketLink />
                  <TicketSeverity />
                </BasicInfo>
                <IncidentManager>
                  <IncidentManagerName />
                  <EditIncidentManager />
                </IncidentManager>
              </TicketDetails>
              <Passthrough>
                <Title />
              </Passthrough>
              <Passthrough>
                <GlobalActions />
              </Passthrough>
              <Passthrough>
                <Engagements />
              </Passthrough>
            </IncidentSummary>
            <IncidentEvents>
              <Passthrough>
                <TimelineTitle />
              </Passthrough>
              <Passthrough>
                <Timeline />
              </Passthrough>
            </IncidentEvents>
          </DisplayIncident>
        </LoadGate>
      </InjectArgs>
    </LoadGate>
  </Passthrough>
}
//
export default App