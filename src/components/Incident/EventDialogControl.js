import React from 'react'
import IconButtonStyled from '../elements/IconButtonStyled'
import OpenInNewIcon from 'material-ui/svg-icons/action/open-in-new'
import * as popupActions from '../../actions/popupActions'

export const addEventPopupName = 'AddEvents'
export const addEventFormName = 'AddEvents'
export const eventInputKey = 'eventInput'
export const selectedIncidentIdKey = 'selectedIncidentId'
export const eventTypeIdInputKey = 'eventTypeIdInput'


export const EventDialogControl = ({incidentIds, dispatch}) =>
    <strong>
        Incident Event:
        &nbsp;
        <IconButtonStyled
            tooltip="Enter new event"
            onTouchTap={() => dispatch(popupActions.showPopup(addEventPopupName, {incidentIds}))}
        >
            <OpenInNewIcon />
        </IconButtonStyled>
    </strong>

export default EventDialogControl