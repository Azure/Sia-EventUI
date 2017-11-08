
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Filter from './EventFilter'
import Footer from './EventFooter'
import PropTypes from 'prop-types'
import Events from './Events'
import * as eventActions from '../../actions/eventActions'

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
    const { events, dispatch, eventTypeActions, ticketId, eventTypes } = this.props
    return (
      <div>
        <Filter pagination={events} dispatch={dispatch}/>
        {Events(events.pageList, eventTypeActions, ticketId, eventTypes)}
        <Footer pagination={events} dispatch={dispatch}/>
      </div>
    )
  }
}

const updatePagination = (dispatch, incidentIds) => {
    dispatch(eventActions.pagination.filter(incidentIds[0].toString()))
    dispatch(eventActions.pagination.sort('occurred'))
}

const fetchMissingEventTypes = (props) => {
  const eventTypeIds = Object.keys(props.eventTypes)
  props.events.pageList
    .map(event => event.eventTypeId)
    .filter(eventTypeId => !eventTypeIds.includes(eventTypeId))
    .forEach(missingEventTypeId => props.dispatch(props.eventTypeActions.fetchEventType(missingEventTypeId)))
}

const mapStateToProps = (state, ownProps) => {
  const { events } = state
  return {
    ...ownProps,
    events: events,
    eventTypes: state.eventTypes.records
  }
}

export default connect(mapStateToProps)(Timeline)