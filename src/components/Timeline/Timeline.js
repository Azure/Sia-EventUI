
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
  }

  componentDidUpdate() {
    updatePagination(this.props.dispatch, this.props.incidentIds)
  }

  render() {
    const { events, dispatch, ticketId, incidentId, eventTypes } = this.props
    return (
      <div>
        <Filter pagination={events} dispatch={dispatch}/>
        {Events(events.pageList, ticketId, incidentId, eventTypes)}
        <Footer pagination={events} dispatch={dispatch}/>
      </div>
    )
  }
}

const updatePagination = (dispatch, incidentIds) => {
    dispatch(eventActions.pagination.filter(incidentIds[0].toString()))
    dispatch(eventActions.pagination.sort('occurred'))
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