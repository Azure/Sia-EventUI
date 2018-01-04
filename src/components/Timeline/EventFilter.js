import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import IconButtonStyled from '../elements/IconButtonStyled'
import FilterChips from '../elements/FilterChips'
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward'
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward'
import AutoComplete from 'material-ui/AutoComplete'
import * as formActions from '../../actions/formActions'
import * as eventActions from '../../actions/eventActions'
import * as filterActions from '../../actions/filterActions'

export const dataSourceConfig = {
  text: 'name',
  value: 'id'
}

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



const EventFilter = (props) =>  {
  const { pagination, filter, filterSearchField, filterSearchForm, eventTypes, dispatch, history } = this.props
  let filterTypes = eventTypes ? Object.values(ownProps.eventTypes) : []

  return  (
    <div className="incident-EventFilter">
      <FilterChips
        selectSpecificFilter={'eventTypes'}
        lookupFilterObject={'events.filter'}
        recordLookup={'eventTypes.records'}
        onRequestDelete={(filter, id) => () => dispatch(filterActions.removeFilter(history, 'eventTypes')(filter,id))}
      />
      <AutoCompleteMenu
        label={'Filter by event type'}
        dataConfigText={'name'}
        dataConfigValue={'id'}
        menuOptions={filterTypes}
        searchText={filterSearchField || ''}
        onUpdateInput={(searchText) => formActions.updateInput(filterSearchForm.name, filterSearchForm.field, searchText)}
        onNewRequest={(menuSelection) => {
          dispatch(filterActions.addFilter(history)(filter, menuSelection))
          dispatch(formActions.clearInput(filterSearchForm.name, filterSearchForm.field))
        }}
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

  const mapStateToProps = (state, ownProps) => {
  const { events } = state
  return {
    ...ownProps,
    pagination: events.pages,
    filter: events.filter,
    filterSearchField: state.forms[filterSearchForm.name] ? state.forms[filterSearchForm.name][filterSearchForm.field] : ''
  }
}

export default withRouter(connect(mapStateToProps)(EventFilter))
