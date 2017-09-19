import React from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../../actions/eventActions'
import RaisedButtonStyled from '../../components/elements/RaisedButtonStyled'


let AddEvent = ({ dispatch, incidentIds, selectedIncidentId, eventInput, updateSelectedIncidentId, updateEventInput }) => {
  return (
    <div>
      <form onSubmit={OnFormSubmit(eventInput, selectedIncidentId, updateEventInput, dispatch)}>
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
        <RaisedButtonStyled type="submit" primary={false}>
          Add Event
        </RaisedButtonStyled>
      </form>
    </div>
  )
}

const OnFormSubmit = (eventInput, selectedIncidentId, updateEventInput, dispatch) => (event) => {
    event.preventDefault()
    if (!eventInput.value.trim()) {
      return
    }
    dispatch(addEvent(eventInput, selectedIncidentId))
    updateEventInput('')
}

const IncidentIdLabel = (ticketId, incidentId, selectedIncidentId, updateSelectedIncidentId) => <label key={ticketId}>
              {ticketId}
              <input
                name="incidentId"
                id={`incidentIdFor${ticketId}`}
                type="radio"
                style={{width: '74%'}}
                onChange={(e) => updateSelectedIncidentId(e)}
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
            onChange={(e) => updateEventInput(e)}
            value={eventInput}
          />
        </label>

AddEvent = connect()(AddEvent)

export default AddEvent