
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Filter from './EventFilter'
import {DropDownFilter} from '../elements/DropDownMenu'
// import { DropDownMenu } from 'material-ui'
import { mockEventTypes } from '../elements/mockEventTypes'
import Footer from './EventFooter'
import PropTypes from 'prop-types'
import Events from './Events'
import * as eventActions from '../../actions/eventActions'
import { FlatButtonStyled } from '../elements/FlatButtonStyled'
// import {AutoCompleteFilter}  from '../elements/AutoCompleteFilter'
import AutoComplete from 'material-ui/AutoComplete'

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
    const types = mockEventTypes.types.map(t=> t.name)
    const menuTypes = mockEventTypes.types
    
    const dataSourceConfig = {
      text: 'name',
      value: 'id',
    }
    
    
    return (
      <div>
          <AutoComplete
                    floatingLabelText="Filter by event type"
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={menuTypes}
                    onNewRequest={(s,i)=>dispatch(eventActions.addFilterOnEventType(s))}
                    dataSourceConfig={dataSourceConfig}
          />
            
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

const fetchAllEventTypes = (eventTypes) => {
  const types = mockEventTypes.types.map(t=> t.name)
  return types
}

const setBaseFilter = (incidentIds) => {
  return incidentIds[0].toString()
}

const mapStateToProps = (state, ownProps) => {
  const { events } = state
  return {
    ...ownProps,
    events: events.pages,
    eventTypes: state.eventTypes.records
  }
}

const dataSourceConfig = {
  text: 'id',
  value: 'name',
}

const testText = (input) => {
  debugger
  console.log('wooooooo')
  console.log(value.code)
  
}

export default connect(mapStateToProps)(Timeline)