'use strict'
import { expect } from 'chai'
import React from 'react'
import { TextField } from 'material-ui'

import { GetMockDispatch, GetDispatchRecorder } from 'test/helpers/mockDispatch'
import { GetMockHistory, GetHistoryRecorder } from 'test/helpers/mockHistory'
import createComponent from 'test/helpers/shallowRenderHelper'

import { CreateIncident, mapStateToProps, onSubmit } from 'components/Search/CreateIncident'
import FlatButtonStyled from 'components/elements/FlatButtonStyled'

const setup = (input, creationError) => {
  let props = {
    dispatch: () => null,
    input,
    creationError
  }

  return createComponent(CreateIncident, props)
}

describe('CreateIncident', function testCreateIncident () {
  describe('Rendered component', function () {
    beforeEach(function createIncidentInit () {
      this.testError = 'Test Error'
      this.testInput = '10'

      this.defaultCase = setup('', '')
      this.withError = setup('', this.testError)
      this.withInput = setup(this.testInput, '')
    })

    it('Should render a form with text field and FlatButtonStyled', function createIncidentRenderForm () {
      expect(this.defaultCase.type).to.equal('form')
      expect(this.defaultCase.props.children[0].type).to.equal(TextField)
      expect(this.defaultCase.props.children[1].type).to.equal(FlatButtonStyled)
      expect(this.withError.type).to.equal('form')
      expect(this.withError.props.children[0].type).to.equal(TextField)
      expect(this.withError.props.children[1].type).to.equal(FlatButtonStyled)
      expect(this.withInput.type).to.equal('form')
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

  describe('onSubmit function', function () {
    context('When input is truthy', function () {
      const input = 'testInput'
      const historyRecord = GetHistoryRecorder()
      const history = GetMockHistory(historyRecord)
      const dispatchRecord = GetDispatchRecorder()
      const dispatch = GetMockDispatch(dispatchRecord)

      onSubmit(input, history, dispatch)()
      describe('History', function () {
        it('Should push a new url based on input', function () {
          expect(historyRecord[0]).to.equal('/tickets/testInput')
        })
      })

      describe('Dispatched actions', function () {
        it('Should dispatch an updateIncidentCreationInput action', function () {
          expect(dispatchRecord.action).to.not.be.null
          expect(dispatchRecord.action.type).to.equal('UPDATE_INCIDENT_CREATION_INPUT')
          expect(dispatchRecord.action.input).to.equal('')
        })
      })
    })

    context('When input is not truthy', function () {
      const input = ''
      const historyRecord = GetHistoryRecorder()
      const history = GetMockHistory(historyRecord)
      const dispatchRecord = GetDispatchRecorder()
      const dispatch = GetMockDispatch(dispatchRecord)

      onSubmit(input, history, dispatch)()
      describe('History', function () {
        it('Should not be changed', function () {
          expect(historyRecord.length).to.equal(0)
        })
      })

      describe('Dispatched actions', function () {
        it('Should not have dispatched any actions', function () {
          expect(dispatchRecord.action).to.be.undefined
        })
      })
    })
  })
})

const inputState = {
  tickets: {
    map: {
      1: {id: 100}
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

const expectedResult = {
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
    const result = mapStateToProps(inputState)

    expect(result.input).to.equal(expectedResult.input)
    expect(result.ticketSystem.id).to.equal(expectedResult.ticketSystem.id)
    expect(result.creationError).to.equal(expectedResult.creationError)
  })
})
