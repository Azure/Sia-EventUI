import React from 'react'
import PassPropsToChildren from 'components/elements/helpers/PassPropsToChildren'

const Passthrough = ({children, ...props}) => PassPropsToChildren(children, props)

export default Passthrough