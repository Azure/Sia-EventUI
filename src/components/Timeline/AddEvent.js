import React from 'react'
import { connect } from 'react-redux'
import RaisedButtonStyled from '../../components/elements/RaisedButtonStyled'
import * as formActions from '../../actions/formActions'
import * as popupActions from '../../actions/popupActions'
import { postEvent } from '../../actions/eventActions'
import { addEventFormName } from '../Incident/EventDialogControl'

let AddEvent = ({ dispatch, incidentIds, selectedIncidentId, eventInput, updateSelectedIncidentId, updateEventInput }) => {
  return (
    <div>
        <span> Associated Ticket:</span>
        {incidentIds.map(ticketIdToIncidentIdMap =>
          IncidentIdLabel(
            ticketIdToIncidentIdMap[0],
            ticketIdToIncidentIdMap[1],
            selectedIncidentId,
            updateSelectedIncidentId)
          )
        }
        {EventLabel(eventInput, updateEventInput)}
        <RaisedButtonStyled
          onTouchTap={() => {
            dispatch(popupActions.hidePopup())
            dispatch(postEvent(selectedIncidentId))
            dispatch(formActions.clearForm(addEventFormName))
          }}
        >
          Add Event
        </RaisedButtonStyled>
    </div>
  )
}

const IncidentIdLabel = (ticketId, incidentId, selectedIncidentId, updateSelectedIncidentId) => {

  return <label key={ticketId}>
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
}

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

AddEvent = connect()(AddEvent)

export default AddEvent