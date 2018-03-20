import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import IconButtonStyled from 'components/elements/IconButtonStyled'
import FilterChips from 'components/elements/FilterChips'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward'
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward'

import AutoCompleteMenu from 'components/elements/AutoCompleteMenu'
import * as formActions from 'actions/formActions'
import * as eventActions from 'actions/eventActions'
import * as filterActions from 'actions/filterActions'

export const dataSourceConfig = {
  text: 'name',
  value: 'id'
}

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

const EventFilter = (props) => {
  const { pagination, filter, filterSearchField, eventTypes, dispatch, history, signalRFilterType } = props
  const filterTypes = eventTypes ? Object.values(props.eventTypes) : []
  return (
    <div className='incident-EventFilter'>
      <FilterChips
        selectSpecificFilter={'eventTypes'}
        lookupFilterObject={'events.filter'}
        recordLookup={'eventTypes.records'}
        onRequestDelete={(filter, id) => () => dispatch(filterActions.removeFilter(history, 'eventTypes')(filter, id))}
      />
      <AutoCompleteMenu
        label={'Filter by event type'}
        dataConfigText={'name'}
        dataConfigValue={'id'}
        dataSource={filterTypes}
        searchText={filterSearchField || ''}
        onUpdateInput={(searchText) => dispatch(formActions.updateInput(filterSearchForm.name, filterSearchForm.field, searchText))}
        selectMethod={(menuSelection) => dispatch(filterActions.addFilter(history)(filter, signalRFilterType)(menuSelection))}
        clearMethod={() => dispatch(formActions.clearInput(filterSearchForm.name, filterSearchForm.field))}
      />
      <IconButtonStyled
        tooltip='order'
        onTouchTap={() => dispatch(eventActions.pagination.sort('occurred'))}
      >
        {
          pagination && pagination.order === 'desc'
          ? <ArrowDown />
          : <ArrowUp />
        }
      </IconButtonStyled>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { events, signalR } = state
  let filterFormField = state.forms[filterSearchForm.name] ? state.forms[filterSearchForm.name][filterSearchForm.field] : ''
  return {
    ...ownProps,
    pagination: events.pages,
    filter: events.filter,
    filterSearchField: filterFormField,
    signalRFilterType: signalR.filterPreferences.eventFilterType
  }
}

export default withRouter(connect(mapStateToProps)(EventFilter))
