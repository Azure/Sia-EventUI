'use strict'
import { expect } from 'chai'
import { CreateIncident, mapStateToProps } from '../../../src/components/Search/CreateIncident'
import FlatButtonStyled from '../../../src/components/elements/FlatButtonStyled'
import React from 'react'
import createComponent from '../../helpers/shallowRenderHelper'
import { TextField } from 'material-ui'

function mockDispatch (object) { }

const setup = (input, creationError) => {
    let props = {
        dispatch: mockDispatch,
        input,
        creationError
    }

    return createComponent(CreateIncident, props)
}

describe('CreateIncident', function testCreateIncident () {
    beforeEach(function createIncidentInit () {
        this.testError = 'Test Error'
        this.testInput = '10'

        this.defaultCase = setup('','')
        this.withError = setup('',this.testError)
        this.withInput = setup(this.testInput, '')
    })

    it('Should render a div with text field and FlatButtonStyled', function createIncidentRenderDiv () {
        expect(this.defaultCase.type).to.equal('div')
        expect(this.defaultCase.props.children[0].type).to.equal(TextField)
        expect(this.defaultCase.props.children[1].type).to.equal(FlatButtonStyled)
        expect(this.withError.type).to.equal('div')
        expect(this.withError.props.children[0].type).to.equal(TextField)
        expect(this.withError.props.children[1].type).to.equal(FlatButtonStyled)
        expect(this.withInput.type).to.equal('div')
        expect(this.withInput.props.children[0].type).to.equal(TextField)
        expect(this.withInput.props.children[1].type).to.equal(FlatButtonStyled)
    })

    it('Should pass props.input to TextField value', function createIncidentDisplayInput () {
        expect(this.defaultCase.props.children[0].props.value).to.equal('')
        expect(this.withInput.props.children[0].props.value).to.equal(this.testInput)
    })

    it('Should pass props.creationError to TextField errorText', function createIncidentDisplayCreationError () {
        expect(this.defaultCase.props.children[0].props.errorText).to.equal('')
        expect(this.withError.props.children[0].props.errorText).to.equal(this.testError)
    })
})

const inputState = {
    tickets: {
        map: {
            1: {id:100}
        },
        systems: {
            1: {id: 1},
            2: {id: 2}
        }
    },
    incidents: {
        creation: {
            input: 'test input',
            error: {
                message: 'test error message'
            }
        }
    }
}

const inputOwnProps = {
    incidentActions: {
        TestKey: 'TestValue'
    }
}

const expectedResult = {
    ticketLookup: {1: {id:100}},
    input: 'test input',
    ticketSystem: {
        id: 1
    },
    creationError: 'test error message',
    incidentActions: {
        TestKey: 'TestValue'
    }
}

describe('CreateIncidentMapStateToProps', () => {
    it('Should correctly generate an args object from state', () => {
        const result = mapStateToProps(inputState, inputOwnProps)

        expect(result.ticketLookup[1].id).to.equal(expectedResult.ticketLookup[1].id)
        expect(result.input).to.equal(expectedResult.input)
        expect(result.ticketSystem.id).to.equal(expectedResult.ticketSystem.id)
        expect(result.creationError).to.equal(expectedResult.creationError)
        expect(result.incidentActions.TestKey).to.equal(expectedResult.incidentActions.TestKey)
    })
})
