import React from 'react'
import { connect } from 'react-redux'
import LoadingMessage from 'components/elements/LoadingMessage'
import ErrorMessage from 'components/elements/ErrorMessage'
import PassPropsToChildren from 'components/elements/helpers/PassPropsToChildren'

export class LoaderComponent extends React.Component {
  render () {
    return null
  }

  componentDidMount () {
    const { dispatch, loadByDispatching, dispatchProps } = this.props
    dispatch(loadByDispatching(dispatchProps))
  }
}

export const Loader = connect()(LoaderComponent)

export const LoadGate = ({
  children,
  loadByDispatching,
  isAvailable,
  isLoading,
  isError,
  loadMessage = () => 'Loading from a remote resource',
  errorMessage = () => 'Error when loading from a remote resource',
  ...props
}) => isAvailable ? PassPropsToChildren(children, props)
  : isLoading ? LoadingMessage(loadMessage(props), loadByDispatching(props))
  : isError ? ErrogMessage(errorMessage(props), loadByDispatching(props))
  : <Loader loadByDispatching={loadByDispatching} dispatchProps={props} />

export const mapStateToLoadGateProps = (state, {
  isAvailable,
  isLoading,
  isError,
  ...ownProps
}) => ({
  isAvailable: isAvailable(state, ownProps),
  isLoading: isLoading(state, ownProps),
  isError: isError(state, ownProps),
  ...ownProps
})

export default connect(mapStateToLoadGateProps)(LoadGate)