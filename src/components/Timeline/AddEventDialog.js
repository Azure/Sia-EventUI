import React from 'react'
import { connect } from 'react-redux'
import * as popupActions from '../../actions/popupActions'
import * as formActions from '../../actions/formActions'
import FlatButtonStyled from '../elements/FlatButtonStyled'
import Dialog from 'material-ui/Dialog'
import { addEventFormName, eventInputKey, selectedIncidentIdKey } from '../Incident/EventDialogControl'
import AddEvent from './AddEvent'

const handleUpdateEvent = (dispatch, key) => (value) => event => {
    dispatch(formActions.updateInput(addEventFormName, key, value ? value : event.target.value))
}

export const addEventDialog = ({dispatch, form, args}) => <Dialog
        title='Please enter a custom event:'
        actions={addEventDialogOptions(dispatch, form[selectedIncidentIdKey])}
        open={true}
        modal={false}
        onRequestClose={() => dispatch(popupActions.hidePopup())}
    >
        <AddEvent
            onRequestClose={() => dispatch(popupActions.hidePopup())}
            incidentIds={args.incidentIds}
            eventInput={form[eventInputKey]}
            selectedIncidentId={form[selectedIncidentIdKey]}
            updateEventInput={handleUpdateEvent(dispatch, eventInputKey)}
            updateSelectedIncidentId={handleUpdateEvent(dispatch, selectedIncidentIdKey)}
        />
    </Dialog>


export const addEventDialogOptions = (dispatch, selectedIncidentId) => [
    <FlatButtonStyled
        label='Cancel'
        onTouchTap={() => dispatch(popupActions.hidePopup())}
    />
]

export const mapStateToProps = state => {
    return {
        form: state.forms[addEventFormName] ? state.forms[addEventFormName] : {},
        args: state.popup.args
    }
}

export const connectedAddEventDialog = connect(mapStateToProps)(addEventDialog)

export default connectedAddEventDialog