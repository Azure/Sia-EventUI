import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import Event from './Event'
import moment from 'moment'
import Filter from './EventFilter'
import Footer from './EventFooter'
import { red50, purple50, indigo50, teal50, lime50, deepOrange50, blueGrey50 } from 'material-ui/styles/colors'



const Timeline = ({ events }) => {
  return (
  <div>
    <Filter/>
    {Array.from(events)
      .sort(chronologically)
      .map(event =>
        <Event
          key = {`${event.id} ${event.incidentId}`}
          ticketId = {event.ticketId}
          dismissed = {event.dismissed}
          text = {GenerateTextFromEventType(event.eventTypeId) }
          time = {moment(event.occurred ? event.occurred : event.Occurred)}
          backgroundColor = {event.backgroundColor}
        />
    )}
    <Footer/>
   </div>)
}


const GenerateTextFromEventType = (eventType) => {
  switch(eventType){
    case 1:
      return 'Impact Detected'
    case 2:
      return 'Impact Start'
    case 3:
      return 'Impact Mitigated'
    case 4:
      return 'Incident Resolved'
    case 5:
      return 'Incident Acknowledged'
    default:
      return 'This Event has no text'
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
  const { incidents } = state
  const { incidentIds } = ownProps
  let colorCoding = 0
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
  const sortedEvents = Array.from(unsortedEvents).sort(chronologically)
  return {
    ...ownProps,
    events: sortedEvents
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