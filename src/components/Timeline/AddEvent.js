import React from 'react'
import { connect } from 'react-redux'
import RaisedButtonStyled from '../../components/elements/RaisedButtonStyled'
import * as formActions from '../../actions/formActions'
import * as popupActions from '../../actions/popupActions'
import { addEventFormName } from '../Incident/EventDialogControl'

const AddEvent = ({ dispatch, incidentIds, selectedIncidentId, eventInput, eventTypeIdInput, updateSelectedIncidentId, updateEventInput, updateEventTypeIdInput, eventActions }) => {
  let incidentIdCounter = 0
  return (
    <div>
        <span> Associated Ticket:</span>
        <br/>
        {incidentIds.map(ticketIdToIncidentIdMap =>
          IncidentIdLabel(
            ticketIdToIncidentIdMap[0],
            ticketIdToIncidentIdMap[1],
            selectedIncidentId
              ? selectedIncidentId
              : incidentIdCounter++
                ? ticketIdToIncidentIdMap[0]
                : 0, //If none are selected, select the first
            updateSelectedIncidentId)
          )
        }
        <br/>
        {EventLabel(eventInput, updateEventInput)}
        <br/>
        {EventTypeIdLabel(eventTypeIdInput, updateEventTypeIdInput)}
        <br/>
        <RaisedButtonStyled
          onTouchTap={() => {
            dispatch(popupActions.hidePopup())
            dispatch(eventActions.postEvent(selectedIncidentId ? selectedIncidentId : incidentIds[0][1], eventTypeIdInput))
            dispatch(formActions.clearForm(addEventFormName))
          }}
        >
          Add Event
        </RaisedButtonStyled>
    </div>
  )
}

const IncidentIdLabel = (ticketId, incidentId, selectedIncidentId, updateSelectedIncidentId) => <label key={ticketId}>
  {ticketId}
  <input
    name="incidentId"
    id={`incidentIdFor${ticketId}`}
    type="radio"
    style={{width: '74%'}}
    onChange={updateSelectedIncidentId(incidentId)}
    value={incidentId}
    checked={incidentId === selectedIncidentId}
  />
</label>


const EventLabel = (eventInput, updateEventInput) => <label>
  Event:
  <input
    name="event"
    type="text"
    style={{width: '74%'}}
    onChange={updateEventInput()}
    value={eventInput}
  />
</label>

const EventTypeIdLabel = (eventTypeIdInput, updateEventTypeIdInput) => <label>
  EventTypeId:
  <input
    name="eventTypeId"
    id={'eventTypeIdInput'}
    type="text"
    style={{width: '74%'}}
    onChange={updateEventTypeIdInput()}
    value={eventTypeIdInput ? eventTypeIdInput : 0}
  />
</label>

const ConnectedAddEvent = connect()(AddEvent)

export default ConnectedAddEvent