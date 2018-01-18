import React from 'react'
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import StepperStyled from 'components/elements/StepperStyled'

const stepLabels = [
  'Detect',
  'Engage',
  'Notify',
  'Mitigated',
  'Resolved'
]

const Checkpoint = () => {
  return (
    <StepperStyled
      activeStep={1}
      connector={<KeyboardArrowRight />}
      labels={stepLabels}
      stepLabelClass={'incident-steplabel'}
        />
  )
}

export default Checkpoint
