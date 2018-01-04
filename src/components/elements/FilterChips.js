import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Chip from 'material-ui/Chip'
import ByPath from 'object-path'

export const FilterChips = ({filter, selectSpecificFilter, records, onRequestDelete}) => {
    let selectedFilters = ByPath.get(filter, selectSpecificFilter)
    return selectedFilters? selectedFilters.map((selectedFilter) => hydrateChip(selectedFilter, records))
        .map(chip => renderChip(chip.id, chip.name, onRequestDelete(filter, chip.id)))
        :
        <div></div>
}

export const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        filter: ByPath.get(state, ownProps.lookupFilterObject),
        records: ByPath.get(state, ownProps.recordLookup)
    }
}

export const renderChip = (id, name, onRequestDelete) => (
    <Chip
        key={id}
        onRequestDelete={onRequestDelete}
        style={chipStyles.chip}
    >
        {name}
    </Chip>
)

export const hydrateChip = (id, records) => ({
    id: id,
    name: records[id] ? records[id].name : 'unknown'

})

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
    selectSpecificFilter: PropTypes.string,
    lookupFilterObject: PropTypes.string,
    recordLookup: PropTypes.string,
    onRequestDelete: PropTypes.func
}



export default connect(mapStateToProps)(FilterChips)