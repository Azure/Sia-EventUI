
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Filter from './EventFilter'
import DropDownMenu from '../elements/DropDownMenu'
import Footer from './EventFooter'
import PropTypes from 'prop-types'
import Events from './Events'
import * as eventActions from '../../actions/eventActions'
import { FlatButtonStyled } from '../elements/FlatButtonStyled'

const filterLabels = [
  'Active',
  'Dismissed',
  'System',
  'Manual'
]

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
    const { events, dispatch, eventActions, eventTypeActions, ticketId, incidentId, eventTypes } = this.props
    return (
      <div>
        <FlatButtonStyled label='RED' onTouchTap={this.populateFilterOptions}>RED</FlatButtonStyled>
        <DropDownMenu {...filterLabels}/>
        <Filter pagination={events} dispatch={dispatch}/>
        {Events(events.pageList, eventActions, eventTypeActions, ticketId, incidentId, eventTypes)}
        <Footer pagination={events} dispatch={dispatch}/>
      </div>
    )
  }
}

const updatePagination = (dispatch, incidentIds) => {
    dispatch(eventActions.pagination.filter(setBaseFilter(incidentIds)))
}

const fetchMissingEventTypes = (props) => {
  const eventTypeIds = Object.keys(props.eventTypes)
  props.events.pageList
    .map(event => event.eventTypeId)
    .filter(eventTypeId => !eventTypeIds.includes(eventTypeId))
    .forEach(missingEventTypeId => props.dispatch(props.eventTypeActions.fetchEventType(missingEventTypeId)))
}

const setBaseFilter = (incidentIds) => {
  return incidentIds[0].toString()
}

const populateFilterOptions = (e) => {
  e.preventDefault()
  console.log('SQUEEE')
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