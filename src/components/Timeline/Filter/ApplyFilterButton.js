import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { FlatButton } from 'material-ui'

import { mapStateToApplyFilterProps } from 'components/Timeline/Filter/ApplyFilterOnMount'

export const ApplyFilterButton = ({
  filter,
  filterPreference,
  dispatch,
  history,
  applyFilter
}) => <FlatButton
  label='ApplyFilter'
  primary
  onClick={() => dispatch(applyFilter(history, filter, filterPreference))}
/>

ApplyFilterButton.propTypes = {
  filter: PropTypes.object.isRequired,
  filterPreference: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  applyFilter: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToApplyFilterProps)(ApplyFilterButton))
