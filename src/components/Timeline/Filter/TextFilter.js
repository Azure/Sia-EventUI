import React from 'react'
import { TextField } from 'material-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as filterActions from 'actions/filterActions'

export const TextFilter = ({text, updateDataSearch, dispatch}) => <TextField
  value={text || ''}
  hintText='Search'
  id='search-field-value'
  onChange={(event) => dispatch(updateDataSearch(event.target.value))}
/>

TextFilter.propTypes = {
  text: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  updateDataSearch: PropTypes.func.isRequired
}

export const mapStateToProps = (state, ownProps) => ({
  text: state.events.filter.dataSearch,
  updateDataSearch: filterActions.updateDataSearch
})

export default connect(mapStateToProps)(TextFilter)
