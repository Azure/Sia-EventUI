import React from 'react'
import { connect } from 'react-redux'
import EventDialog from '../components/Timeline/AddEventDialog'
import { addEventPopupName } from '../components/Incident/EventDialogControl'

export const Popups = ({selectedPopup}) => {
    let toRender
    switch(selectedPopup) {
        case addEventPopupName:
            toRender = <EventDialog/>
            break
        default:
            toRender = <div/>
    }

    return toRender
}

export const mapStateToProps = (state) => {
    return {
        selectedPopup: state.popup ? state.popup.popupName : null
    }
}

export default connect(mapStateToProps)(Popups)