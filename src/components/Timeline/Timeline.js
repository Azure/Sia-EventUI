import { connect } from 'react-redux'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import EventFilter from './EventFilter'
import Footer from './EventFooter'
import PropTypes from 'prop-types'
import Events from './Events'
import * as eventActions from '../../actions/eventActions'
import * as eventTypeActions from '../../actions/eventTypeActions'
import { FlatButtonStyled } from '../elements/FlatButtonStyled'

class Timeline extends Component {
  static propTypes = {
    events: PropTypes.object.isRequired,
    eventTypes: PropTypes.object.isRequired,
    filter: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { incidentIds, eventTypes, events, ticketId, incidentId, filter, history, dispatch } = this.props
    updatePagination(incidentIds, dispatch)
    fetchMissingEventTypes(eventTypes, events, dispatch)
    if (incidentId)
    {
      synchronizeFilters(filter, incidentId, ticketId, history, dispatch)
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   const { oldFilter, eventTypes, history, dispatch } = nextProps
  //   updateFilterEventTypes(oldFilter, eventTypes, history, dispatch)

  // }

  render() {
    const { events, dispatch, ticketId, incidentId, eventTypes, history } = this.props
    return (
      <div>
        <EventFilter history={history} eventTypes={eventTypes}/>
        <Events events={events.pageList} ticketId={ticketId} incidentId={incidentId} />
        <Footer pagination={events} dispatch={dispatch}/>
      </div>
    )
  }
}
 
const updatePagination = (incidentIds, dispatch) => {
    dispatch(eventActions.pagination.filter(setBaseFilter(incidentIds)))
}

const fetchMissingEventTypes = (eventTypes, events, dispatch) => {
  const eventTypeIds = Object.keys(eventTypes)
  events.pageList
    .map(event => event.eventTypeId)
    .filter(eventTypeId => !eventTypeIds.includes(eventTypeId))
    .forEach(missingEventTypeId => dispatch(eventTypeActions.fetchEventType(missingEventTypeId)))
}

const updateFilterEventTypes = (oldFilter, stateEventTypes, history, dispatch) => {
  if (oldFilter && oldFilter.validated === false && Object.keys(eventTypes).length > 0 && oldFilter && oldFilter.eventTypes) {
    const newFilter = {
      ...oldFilter,
      validated: true,
      eventTypes: getFilterDataFromReferenceData(oldFilter.eventTypes, stateEventTypes)
    }
    dispatch(applyFilter(history)(oldFilter, newFilter))
  }
  return
}

const setBaseFilter = (incidentIds) => {
  return incidentIds[0].toString()
}

export const synchronizeFilters = (filter, incidentId, ticketId, history, dispatch) => {
  const newFilter = Object.assign({incidentId: incidentId, ticketId: ticketId}, filter)
  dispatch(eventActions.applyFilter(history)(filter, newFilter))
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
