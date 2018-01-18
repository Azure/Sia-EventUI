import React from 'react'
import { Stepper, Step, StepLabel } from 'material-ui/Stepper'

export const styles = {
  steplabel: {
    fontSize: 12,
    height: 36,
    padding: 3,
    margin: 3
  }
}

export const StepperStyled = ({activeStep, connector, labels, stepLabelClass}) => {
  return (
    <Stepper
      activeStep={activeStep}
      connector={connector}
      style={styles.steplabel}
        >
      {labels.map(label =>
        <Step key={label}>
          <StepLabel
            className={stepLabelClass}
            style={styles.steplabel}
                    >
            {label}
          </StepLabel>
        </Step>
            )}
    </Stepper>
  )
}

export default StepperStyled
