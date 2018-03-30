import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import EventFilter from 'components/Timeline/EventFilter'
import Footer from 'components/Timeline/EventFooter'
import Events from 'components/Timeline/Events'
import TimeAndDatePicker from 'components/Timeline/Filter/TimePicker'
import * as filterActions from 'actions/filterActions'
import TextFilter from 'components/Timeline/Filter/TextFilter'
import LoadWhenFilterIsApplied from 'components/Timeline/Filter/'

class UncorrelatedEvents extends Component {
  static propTypes = {
    events: PropTypes.object.isRequired,
    filters: PropTypes.object,
    eventTypes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(filterActions.clearFilterIncidentId())
  }

  render () {
    const { events, dispatch, eventTypes, history } = this.props
    return (
      <div style={{padding: '16px'}}>
        <TimeAndDatePicker history={history} />
        <TextFilter history={history} dispatch={dispatch} />
        <EventFilter history={history} eventTypes={eventTypes} />
        <Events events={events.pageList} ticketId={null} incidentId={null} />
        <Footer pagination={events} dispatch={dispatch} />
      </div>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { events } = state
  return {
    ...ownProps,
    events: events.pages,
    filters: events.filter,
    eventTypes: state.eventTypes.records,
    dispatch: state.dispatch
  }
}

export default connect(mapStateToProps)(UncorrelatedEvents)
