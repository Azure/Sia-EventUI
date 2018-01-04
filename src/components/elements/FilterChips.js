import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip'
import { removeFilter, findEventTypeInRef  } from '../../actions/filterActions'

const FilterChips = ({dispatch, filter, filterType, filterOptions, history}) => {
    if (readyToRender(filter, filterOptions)) {
        let selectedFilters = extractWantedFilter(filterType, filter)
        return (
            <div style={chipStyles.wrapper}>
                {selectedFilters.filters.map((selectedFilter) => renderChip(dispatch, history, filter, selectedFilter, filterOptions, selectedFilters.lookupMethod))
                }
            </div>
        )
    }
    else {
        return <div></div>
    }

}

const renderChip = (dispatch, history, filter, filterOptions, selectedFilterType, lookupMethod) => {
    let filterType= lookupMethod(selectedFilterType)(filterOptions)
    return (
            <Chip
                key={filterType.id}
                onRequestDelete={() => dispatch(removeFilter(history)(filter, filterType))}
                style={chipStyles.chip}
            >
                {filterType.name}
            </Chip>
        )
}

const readyToRender = (filter, filterTypes) => {
    return filter && filter.eventTypes && filterTypes
}

const extractWantedFilter = (selectedFilterType, filter) => {
    return selectedFilterType === 'eventType' ? {filters: filter.eventTypes, lookupMethod: findEventTypeInRef} : {filters: null, lookupMethod: null}
}


const chipStyles = {
    chip: {
        margin: 4
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    }
}

FilterChips.propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.object,
    filter: PropTypes.object,
    filterType: PropTypes.string,
    filterOptions: PropTypes.object
}

export const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        filter: state.events.filter ? state.events.filter : {},
        filterOptions: state.eventTypes && state.eventTypes.records ? state.eventTypes.records : {},
        history: ownProps.history,
        filterType: ownProps.filterType
    }
}

export default connect(mapStateToProps)(FilterChips)