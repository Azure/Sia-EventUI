'use strict'
import { expect } from 'chai'
import { connect } from 'react-redux'
import React from 'react'
import createComponent from '../../helpers/shallowRenderHelper'
import Checkpoint from '../../../src/components/Incident/Checkpoint'
import { Step, Stepper } from 'material-ui/Stepper'
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import StepperStyled from '../../../src/components/elements/StepperStyled'


const setup = () => createComponent(Checkpoint, null)

const expectedStepLabels = [
    'Detect',
    'Engage',
    'Notify',
    'Mitigated',
    'Resolved'
]

describe('Checkpoint', function test () {
    beforeEach( () => {
        this.output = setup()
    })

    it('Should render a StepperStyled with correct arguments', () => {
        expect(this.output.type).to.equal(StepperStyled)

        expect(this.output.props.activeStep).to.equal(1)
        expect(this.output.props.connector.type).to.equal(KeyboardArrowRight)
        expect(this.output.props.stepLabelClass).to.equal('incident-steplabel')

        let labelIndex = 0
        this.output.props.labels.map((label) => expect(label).to.equal(expectedStepLabels[labelIndex++]))
        expect(this.output.props.labels[5]).to.not.exist

    })

})
