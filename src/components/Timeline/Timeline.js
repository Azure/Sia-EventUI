import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Events from './Events'
import moment from 'moment'
import Filter from './EventFilter'
import Footer from './EventFooter'
import { red50, purple50, indigo50, teal50, lime50, deepOrange50, blueGrey50 } from 'material-ui/styles/colors'
import * as eventActions from '../../actions/eventActions'


class Timeline extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.dispatch(eventActions.pagination.filter(this.props.incidentIds[0].toString()))
    this.props.dispatch(eventActions.pagination.sort('occurred'))
  }

  render() {
    const { events } = this.props
    return (
      <div>
        <Filter/>
        {Events(events)}
        <Footer/>
      </div>
    )
  }
}

Timeline.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isReqired,
    dismissed: PropTypes.bool,
    text: PropTypes.string
  }).isRequired).isRequired
}


const mapStateToProps = (state, ownProps) => {
  const { events } = state
  const { incidentIds } = ownProps
  /*let colorCoding = 0
  const incidentIdArray = Array.from(incidentIds)
  const unsortedEvents = incidentIdArray.map(incidentId => {
    const thisIncident = incidents.map[incidentId]
    const backgroundColor = (
      colorCoding < incidents.map.size && incidentIdArray.length > 1
      ? colorRotation[colorCoding]
      : blueGrey50
    )
    const colorCodedEvents = thisIncident.events
      .map(event => Object.assign(
        {},
        event,
        {
          incidentId,
          ticketId: thisIncident.primaryTicket.originId,
          backgroundColor
        })
      )
    colorCoding++
    return colorCodedEvents
  }).reduce( (a, b) => a.concat(b), [] )
  const sortedEvents = Array.from(unsortedEvents).sort(chronologically)*/
  return {
    ...ownProps,
    events: events.pageList
  }
}

const chronologically = (a,b) => moment(b.occurred ? b.occurred : b.Occurred).isBefore(moment(a.occurred ? a.occurred : a.Occurred))

const colorRotation = [
  red50,
  teal50,
  deepOrange50,
  indigo50,
  lime50,
  purple50
]

export default connect(mapStateToProps)(Timeline)