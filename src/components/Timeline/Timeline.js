import { connect } from 'react-redux'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import EventFilter from 'components/Timeline/EventFilter'
import Footer from 'components/Timeline/EventFooter'
import AddEventCard from 'components/Timeline/AddEventCard'
import PropTypes from 'prop-types'
import Events from 'components/Timeline/Events'
import * as eventActions from 'actions/eventActions'
import * as eventTypeActions from 'actions/eventTypeActions'
import * as filterActions from 'actions/filterActions'

class Timeline extends Component {
  static propTypes = {
    events: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    ticketId: PropTypes.string.isRequired,
    incidentId: PropTypes.number.isRequired,
    eventTypes: PropTypes.object.isRequired,
    filter: PropTypes.object
  }

  componentDidMount () {
    console.log("in timeline")
    const { eventTypes, events, ticketId, incidentId, filter, history, dispatch } = this.props
    updatePagination(incidentId, dispatch)
    fetchMissingEventTypes(eventTypes, events, dispatch)
    if (incidentId) {
      dispatch(filterActions.synchronizeFilters(filter, incidentId, ticketId, history))
      console.log(`in end of timeline, incidentId is :  ${incidentId} ticketId is: ${ticketId}`)
    }
    
  }

  render () {
    const { events, dispatch, ticketId, incidentId, eventTypes, history } = this.props
    return (
      <div>
        {AddEventCard(incidentId)}
        <EventFilter history={history} eventTypes={eventTypes} />
        <Events events={events.pageList} ticketId={ticketId} incidentId={incidentId} />
        <Footer pagination={events} dispatch={dispatch} />
      </div>
    )
  }
}

const updatePagination = (incidentId, dispatch) => {
  dispatch(eventActions.pagination.filter(incidentId.toString()))
}

const fetchMissingEventTypes = (eventTypes, events, dispatch) => {
  const eventTypeIds = Object.keys(eventTypes)
  events.pageList
    .map(event => event.eventTypeId)
    .filter(eventTypeId => !eventTypeIds.includes(eventTypeId))
    .forEach(missingEventTypeId => dispatch(eventTypeActions.fetchEventType(missingEventTypeId)))
}

const mapStateToProps = (state, ownProps) => {
  const { events } = state
  return {
    ...ownProps,
    events: events.pages,
    filter: events.filter,
    eventTypes: state.eventTypes.records
  }
}

export default withRouter(connect(mapStateToProps)(Timeline))
