'use strict'
import { expect } from 'chai'
import React from 'react'
import { TextField } from 'material-ui'
import Paper from 'material-ui/Paper'

import { GetMockDispatch, GetDispatchRecorder } from 'test/helpers/mockDispatch'
import { GetMockHistory, GetHistoryRecorder } from 'test/helpers/mockHistory'
import createComponent from 'test/helpers/shallowRenderHelper'

import {
  GoToTicketForm,
  mapStateToProps,
  onSubmit,
  ConnectedGoToTicketForm,
  GoToTicket
} from 'components/Incident/GoToTicket'
import FlatButtonStyled from 'components/elements/FlatButtonStyled'

describe('GoToTicket', function () {
  describe('GoToTicketForm render output', function () {
    const setup = (input, creationError) => {
      let props = {
        dispatch: () => null,
        input,
        creationError
      }

      return createComponent(GoToTicketForm, props)
    }

    beforeEach(function () {
      this.testError = 'Test Error'
      this.testInput = '10'

      this.defaultCase = setup('', '')
      this.withError = setup('', this.testError)
      this.withInput = setup(this.testInput, '')
    })

    it('Should render a form with text field and FlatButtonStyled', function () {
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

    it('Should pass props.input to TextField value', function () {
      expect(this.defaultCase.props.children[0].props.value).to.equal('')
      expect(this.withInput.props.children[0].props.value).to.equal(this.testInput)
    })

    it('Should pass props.creationError to TextField errorText', function () {
      expect(this.defaultCase.props.children[0].props.errorText).to.equal('')
      expect(this.withError.props.children[0].props.errorText).to.equal(this.testError)
    })
  })

  describe('onSubmit function', function () {
    context('When input is truthy', function () {
      const input = 'testInput'
      const historyRecord = GetHistoryRecorder()
      const history = GetMockHistory(historyRecord)

      onSubmit(input, history)()
      describe('History', function () {
        it('Should push a new url based on input', function () {
          expect(historyRecord[0]).to.equal('/tickets/testInput')
        })
      })
    })

    context('When input is not truthy', function () {
      const input = ''
      const historyRecord = GetHistoryRecorder()
      const history = GetMockHistory(historyRecord)
      const dispatchRecord = GetDispatchRecorder()
      const dispatch = GetMockDispatch(dispatchRecord)

      onSubmit(input, history)()
      describe('History', function () {
        it('Should not be changed', function () {
          expect(historyRecord.length).to.equal(0)
        })
      })
    })
  })

  describe('mapStateToProps', function () {
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

    const result = mapStateToProps(inputState)

    it('Should correctly generate an args object from state', () => {
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

      expect(result.input).to.equal(expectedResult.input)
      expect(result.ticketSystem.id).to.equal(expectedResult.ticketSystem.id)
      expect(result.creationError).to.equal(expectedResult.creationError)
    })
  })

  describe('GoToTicket render output', function () {
    const result = createComponent(GoToTicket)

    it('Should be a Paper', function () {
      expect(result.type).to.equal(Paper)
    })

    it('Should have a label span as its first child', function () {
      expect(result.props.children[0].type).to.equal('span')
    })

    it('Should have ConnectedGoToTicketForm as its second child', function () {
      expect(result.props.children[1].type).to.equal(ConnectedGoToTicketForm)
    })
  })
})





