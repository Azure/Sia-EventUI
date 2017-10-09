'use strict'
import { expect } from 'chai'
import { connect } from 'react-redux'
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import Checkpoint from '../../../src/components/Incident/Checkpoint'
import { Step, Stepper } from 'material-ui/Stepper'
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import StepperStyled from '../../../src/components/elements/StepperStyled'


function setup() {

    let renderer = TestUtils.createRenderer()
    renderer.render(<Checkpoint />)
    let output = renderer.getRenderOutput()

    return {
        output,
        renderer
    }
}

const expectedStepLabels = [
    'Detect',
    'Engage',
    'Notify',
    'Mitigated',
    'Resolved'
]

describe('Checkpoint', function test () {
    beforeEach( () => {
        const {output} = setup()
        this.output = output
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
