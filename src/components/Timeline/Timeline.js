import { connect } from 'react-redux'
import React, { Component } from 'react'
import Filter from './EventFilter'
import Footer from './EventFooter'
import AddEventCard from './AddEventCard'
import PropTypes from 'prop-types'
import Events from './Events'
import * as eventActions from '../../actions/eventActions'

class Timeline extends Component {
  static propTypes = {
    events: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    ticketId: PropTypes.string.isRequired,
    incidentId: PropTypes.number.isRequired
  }

  componentDidMount() {
    this.props.dispatch(eventActions.pagination.filter(this.props.incidentId.toString()))
  }

  render() {
    const { events, dispatch, ticketId, incidentId } = this.props
    return (
      <div>
        {AddEventCard(incidentId)}
        <Filter pagination={events} dispatch={dispatch}/>
        <Events events={events.pageList} ticketId={ticketId} incidentId={incidentId} />
        <Footer pagination={events} dispatch={dispatch}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  events: state.events
})


export default connect(mapStateToProps)(Timeline)
