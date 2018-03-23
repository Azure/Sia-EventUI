import React from 'react'
import { TextField } from 'material-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextSearchButton from 'components/elements/TextSearchButton'

import * as filterActions from 'actions/filterActions'

export function TextFilter ({filters, history, dispatch}) {
  return (
    <div>
      <br />
      <TextField
        hintText='Search'
        id='search-field-value'
        onChange={(event) => handleChange(event.target.value, dispatch)}
      />
      <TextSearchButton history={history} dispatch={dispatch} />
    </div>
  )
}

TextFilter.propTypes = {
  history: PropTypes.object.isRequired,
  filters: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function handleChange (searchData, dispatch) {
  dispatch(filterActions.updateDataSearch(searchData))
}

export const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    filters: state.events.filter
  }
}

export default connect(mapStateToProps)(TextFilter)
