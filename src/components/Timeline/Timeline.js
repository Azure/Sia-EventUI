import { connect } from 'react-redux'
import React, { Component } from 'react'
import EventFilter from './EventFilter'
import Footer from './EventFooter'
import PropTypes from 'prop-types'
import Events from './Events'
import {pagination} from '../../actions/eventActions'
import { FlatButtonStyled } from '../elements/FlatButtonStyled'

class Timeline extends Component {
  static propTypes = {
    events: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    updatePagination(this.props.dispatch, this.props.incidentIds)
    fetchMissingEventTypes(this.props)
  }

  render() {
    const { events, 
            dispatch, 
            eventActions, 
            eventTypeActions, 
            ticketId, 
            incidentId, 
            eventTypes
    } = this.props
    
    return (
      <div>
        <EventFilter eventActions={eventActions}  />
        {Events(events.pageList, eventActions, eventTypeActions, ticketId, incidentId, eventTypes)}
        <Footer pagination={events} dispatch={dispatch}/>
      </div>
    )
  }
}
 
const updatePagination = (dispatch, incidentIds) => {
    dispatch(pagination.filter(setBaseFilter(incidentIds)))
}

const fetchMissingEventTypes = (props) => {
  const eventTypeIds = Object.keys(props.eventTypes)
  props.events.pageList
    .map(event => event.eventTypeId)
    .filter(eventTypeId => !eventTypeIds.includes(eventTypeId))
    .forEach(missingEventTypeId => props.dispatch(props.eventTypeActions.fetchEventType(missingEventTypeId)))
}

const setBaseFilter = (incidentIds) => {
  return incidentIds[0].toString()
}

const mapStateToProps = (state, ownProps) => {
  const { events } = state
  return {
    ...ownProps,
    events: events.pages,
    eventTypes: state.eventTypes.records
  }
}

export default connect(mapStateToProps)(Timeline)