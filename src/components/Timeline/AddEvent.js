import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButtonStyled from '../../components/elements/RaisedButtonStyled'
import * as formActions from '../../actions/formActions'
import * as eventActions from '../../actions/eventActions'

export const addEventFormName = 'AddEvents'
export const eventInputKey = 'eventInput'
export const eventTypeIdInputKey = 'eventTypeIdInput'

export const AddEvent = ({
  dispatch,
  incidentId,
  eventInput,
  eventTypeIdInput
}) => <div>
    {EventInput(eventInput, handleInputChange(dispatch, eventInputKey))}
    <br/>
    {EventTypeIdInput(eventTypeIdInput, handleInputChange(dispatch, eventTypeIdInputKey))}
    <br/>
    <RaisedButtonStyled
      onTouchTap={() => {
        dispatch(eventActions.postEvent(incidentId, eventTypeIdInput))
        dispatch(formActions.clearForm(addEventFormName))
      }}
    >
      Add Event
    </RaisedButtonStyled>
</div>

const handleInputChange = (dispatch, key) => (event) => {
  dispatch(formActions.updateInput(addEventFormName, key, event.target.value))
}

const EventInput = (eventInput, updateEventInput) => <label>
  Event:
  <input
    name="event"
    type="text"
    style={{width: '74%'}}
    onChange={updateEventInput}
    value={eventInput ? eventInput : ''}
  />
</label>

const EventTypeIdInput = (eventTypeIdInput, updateEventTypeIdInput) => <label>
  EventTypeId:
  <input
    name="eventTypeId"
    type="text"
    style={{width: '74%'}}
    onChange={updateEventTypeIdInput}
    value={eventTypeIdInput ? eventTypeIdInput : 0}
  />
</label>

export const mapStateToPropsAddEvent = (state, ownProps) => {
  const form = (state && state.forms && state.forms[addEventFormName])
    ? state.forms[addEventFormName]
    : {}
  return {
    ...ownProps,
    eventInput: form[eventInputKey],
    eventTypeIdInput: form[eventTypeIdInputKey]
  }
}

AddEvent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  incidentId: PropTypes.number,
  eventInput: PropTypes.string,
  eventTypeIdInput: PropTypes.string
}

const ConnectedAddEvent = connect(mapStateToPropsAddEvent)(AddEvent)

export default ConnectedAddEvent
