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
    this.props.dispatch(eventActions.pagination.filter(this.props.incidentIds[0].toString()))
  }

  render() {
    const { events, dispatch, ticketId, incidentId, eventTypes } = this.props
    return (
      <div>
        <Filter pagination={events} dispatch={dispatch}/>
        <Events events={events.pageList} ticketId={ticketId} incidentId={incidentId} />
        <Footer pagination={events} dispatch={dispatch}/>
      </div>
    )
  }
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
