import React from 'react'
import { FlatButton } from 'material-ui'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as filterActions from 'actions/filterActions'

export function TextSearchButton ({filter, dispatch, history}) {
  return (
    <div>
      <FlatButton
        label='Search'
        primary
        onClick={() => submitSearch(filter, dispatch, history)}
            />
    </div>
  )
}

TextSearchButton.propTypes = {
  filter: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    filter: state.events.filter
  }
}

export function submitSearch (filter, dispatch, history) {
  dispatch(filterActions.synchronizeFilters(filter, null, null, history))
}

export default connect(mapStateToProps)(TextSearchButton)
