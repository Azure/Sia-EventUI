import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FlatButton } from 'material-ui'

import * as filterActions from 'actions/filterActions'
import { mapStateToApplyFilterProps } from 'components/Timeline/Filter/ApplyFilterOnMount'

export const ApplyFilterButton = ({filter, filterPreference, dispatch, history}) => <FlatButton
  label='ApplyFilter'
  primary
  onClick={() => dispatch(filterActions.applyFilter(history, filter, filterPreference))}
/>

export default withRouter(connect(mapStateToApplyFilterProps)(ApplyFilterButton))
