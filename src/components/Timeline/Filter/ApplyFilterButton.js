import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FlatButton } from 'material-ui'

import { mapStateToApplyFilterProps } from 'components/Timeline/Filter/ApplyFilterOnMount'

export const ApplyFilterButton = ({filter, filterPreference, dispatch, history, applyFilter}) => <FlatButton
  label='ApplyFilter'
  primary
  onClick={() => dispatch(applyFilter(history, filter, filterPreference))}
/>

export default withRouter(connect(mapStateToApplyFilterProps)(ApplyFilterButton))
