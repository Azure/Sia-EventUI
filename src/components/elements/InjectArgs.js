import { connect } from 'react-redux'

import PassPropsToChildren from 'components/elements/helpers/PassPropsToChildren'

export const InjectArgs = ({children, injectUsing, ...props}) => PassPropsToChildren(
  children,
  {
    ...props,
    ...injectUsing(props)
  }
)

export const mapStateToInjectArgsProps = (state, {pullFromState, ...props}) => ({
  ...props,
  ...pullFromState(state, props)
})

export default connect(mapStateToInjectArgsProps)(InjectArgs)