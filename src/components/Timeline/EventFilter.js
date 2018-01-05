import React from 'react'
import { connect } from 'react-redux'
import IconButtonStyled from '../elements/IconButtonStyled'
import AutoCompleteMenu from '../elements/AutoCompleteMenu'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward'
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward'
import Chip from 'material-ui/Chip'
import * as eventActions from '../../actions/eventActions'
import * as filterActions from '../../actions/filterActions'

export const chipStyles = {
  chip: {
    margin: 4
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

export const filterSearchForm = {
  name: 'filter selection',
  field: 'input'
}

const EventFilter = ({pagination, filter, filterSearchField, eventTypes, filterTypes, dispatch, history}) =>  {
  const filterChips = filter && filter.eventTypes && eventTypes ? renderChips(history, filter, eventTypes, dispatch): null
  // debugger
  return  (
    <div className="incident-EventFilter">
      {filterChips}
      <AutoCompleteMenu
        dispatch={dispatch}
        history={history}
        label={'Filter by event type'}
        menuOptions={filterTypes}
        filter={filter}
        filterSearchField={filterSearchField || ''}
        menuFilterSearchForm={filterSearchForm}
      />
      <IconButtonStyled
        tooltip='order'
        onTouchTap={() => dispatch(eventActions.pagination.sort('occurred'))}
      >
        {
          pagination && pagination.order === 'desc'
          ? <ArrowDown/>
          : <ArrowUp/>
        }
      </IconButtonStyled>
    </div>
  )
}
  
  
const renderChips = (history, filter, eventTypes, dispatch) => {
  return (
    <div style={chipStyles.wrapper}>
      {filter.eventTypes.map((passedEventType) => renderChip(history, filter, eventTypes, passedEventType, dispatch))}
    </div>
  )
}

const renderChip = (history, filter, eventTypes, passedEventType, dispatch) => {
  const eventType = filterActions.findEventTypeInRef(passedEventType, eventTypes)
  return (
    <Chip
      key={eventType.id}
      onRequestDelete={() => dispatch(filterActions.removeFilter(history)(filter, eventType))}
      style={chipStyles.chip}
    >
      {eventType.name}
    </Chip>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { events } = state
  return {
    ...ownProps,
    pagination: events.pages,
    filter: events.filter,
    filterSearchField: state.forms[filterSearchForm.name] ? state.forms[filterSearchForm.name][filterSearchForm.field] : '',
    eventTypes: ownProps.eventTypes ? ownProps.eventTypes : null,
    filterTypes: ownProps.eventTypes ? Object.values(ownProps.eventTypes) : []
  }
}

export default connect(mapStateToProps)(EventFilter)
