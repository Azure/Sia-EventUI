import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import EventFilter from 'components/Timeline/EventFilter'
import Footer from 'components/Timeline/EventFooter'
import Events from 'components/Timeline/Events'
import TimeAndDatePicker from 'components/elements/TimePicker'
import * as filterActions from 'actions/filterActions'
import TextFilter from 'components/Timeline/Playbook/TextFilter'

class UncorrelatedEvents extends Component {
  static propTypes = {
    events: PropTypes.object.isRequired,
    filters: PropTypes.object,
    eventTypes: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { filters, dispatch } = this.props
    const newFilter = Object.assign({}, filters, {incidentId: null})
    dispatch(filterActions.clearFilterIncidentId(newFilter))
  }

  render () {
    const { events, dispatch, eventTypes, history } = this.props
    return (
      <div >
        <TimeAndDatePicker history={history} />
        <EventFilter history={history} eventTypes={eventTypes} />
        <TextFilter/>
        <Events events={events.pageList} ticketId={null} incidentId={null} />
        <Footer pagination={events} dispatch={dispatch} />
      </div >
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
