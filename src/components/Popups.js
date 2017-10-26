import React from 'react'
import { connect } from 'react-redux'
import EventDialog from '../components/Timeline/AddEventDialog'
import { addEventPopupName } from '../components/Incident/EventDialogControl'

export const Popups = ({selectedPopup, eventActions}) => {
    let toRender
    switch(selectedPopup) {
        case addEventPopupName:
            toRender = <EventDialog eventActions={eventActions}/>
            break
        default:
            toRender = <div/>
    }

    return toRender
}

export const mapStateToProps = (state, ownProps) => {
    return {
        selectedPopup: state.popup ? state.popup.popupName : null,
        eventActions: ownProps.eventActions
    }
}

export default connect(mapStateToProps)(Popups)