import React from 'react'
import { connect } from 'react-redux'
import { fetchGlobalActions } from 'actions/globalActionActions'
import LoadingMessage from 'components/elements/LoadingMessage'

export class BootstrapGlobalActions extends React.Component {
  componentDidMount () {
    this.props.dispatch(this.props.fetchGlobalActions())
  }

  render () {
    return <LoadingMessage
      message={'Loading incident actions'}
      actionForRetry={this.props.fetchGlobalActions()}
    />
  }
}

export default connect(() => ({ fetchGlobalActions }))(BootstrapGlobalActions)
