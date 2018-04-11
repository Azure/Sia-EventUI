import { expect } from 'chai'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MenuItem from 'material-ui/MenuItem'
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever'

import { GetMockDispatch, GetDispatchRecorder } from 'test/helpers/mockDispatch'
import createComponent from 'test/helpers/shallowRenderHelper'

import {
  clearRecentTicketsButtonAction,
  ClearRecentTicketsButton,
  mapStateToClearRecentTicketsProps,
  ConnectedClearRecentTicketsButton,
  ClearRecentTickets
} from 'components/TopNav/ClearRecentTickets'
import { removePreviousTicketsFromRecent } from 'actions/ticketActions'


describe('ClearRecentTickets', function () {
  describe('clearRecentTicketsButtonAction', function () {
    context('When currentTicketId is undefined', function () {
      const dispatchRecorder = GetDispatchRecorder()
      const dispatch = GetMockDispatch(dispatchRecorder)
      const initializedAction = clearRecentTicketsButtonAction(dispatch)

      it('Should return a function', function () {
        expect(initializedAction).to.be.a('function')
      })

      initializedAction()

      it('Should dispatch removePreviousTicketsFromRecent with no current value', function () {
        expect(dispatchRecorder.action.type).to.equal('REMOVE_PREVIOUS_TICKETS')
        expect(dispatchRecorder.action.current).to.be.undefined
      })
    })

    context('When currentTicketId has value', function () {
      const dispatchRecorder = GetDispatchRecorder()
      const dispatch = GetMockDispatch(dispatchRecorder)
      const inputTicketId = 100
      const initializedAction = clearRecentTicketsButtonAction(dispatch, inputTicketId)

      it('Should return a function', function () {
        expect(initializedAction).to.be.a('function')
      })

      initializedAction()

      it('Should dispatch removePreviousTicketsFromRecent with the passed in current value', function () {
        expect(dispatchRecorder.action.type).to.equal('REMOVE_PREVIOUS_TICKETS')
        expect(dispatchRecorder.action.currentId).to.equal(inputTicketId)
      })
    })
  })

  describe('ClearRecentTicketsButton', function () {
    describe('render output', function () {
      const input = 100
      const result = createComponent(
        ClearRecentTicketsButton,
        {dispatch: null, clearRecentTickets: clearRecentTicketsButtonAction, currentTicketId: input}
      )

      it('Should be a MenuItem', function () {
        expect(result.type).to.equal(MenuItem)
      })

      it('Should have Clear Recent Tickets as primaryText', function () {
        expect(result.props.primaryText).to.equal('Clear Recent Tickets')
      })

      it('Should have a rightIcon of type ActionDeleteForever with an onClick function', function () {
        expect(result.props.rightIcon.type).to.equal(ActionDeleteForever)
        expect(result.props.rightIcon.props.onClick).to.be.a('function')
      })

      it('Should have an onClick function', function () {
        expect(result.props.onClick).to.be.a('function')
      })
    })

    describe('OnClick functions', function () {
      const mockClearRecentTickets = (dispatch, input) => () => dispatch({type: 'TEST_SUCCESS', input})
      describe('Primary menuItem onClick', function () {
        const dispatchRecorder = GetDispatchRecorder()
        const dispatch = GetMockDispatch(dispatchRecorder)
        const input = 100
        const testObject = createComponent(
          ClearRecentTicketsButton,
          {dispatch, clearRecentTickets: mockClearRecentTickets, currentTicketId: input}
        )

        testObject.props.onClick()

        it('Should call the passed in function to dispatch the expected action and value', function () {
          expect(dispatchRecorder.action.type).to.equal('TEST_SUCCESS')
          expect(dispatchRecorder.action.input).to.equal(input)
        })

      })

      describe('RightIcon onClick', function () {
        const dispatchRecorder = GetDispatchRecorder()
        const dispatch = GetMockDispatch(dispatchRecorder)
        const input = 100
        const testObject = createComponent(
          ClearRecentTicketsButton,
          {dispatch, clearRecentTickets: mockClearRecentTickets, currentTicketId: input}
        )

        testObject.props.rightIcon.props.onClick()

        it('Should call the passed in function to dispatch the expected action and value', function () {
          expect(dispatchRecorder.action.type).to.equal('TEST_SUCCESS')
          expect(dispatchRecorder.action.input).to.equal(input)
        })
      })
    })
  })

  describe('mapStateToClearRecentTicketsProps', function () {
    const expectedCurrentTicketId = 100
    const mockOwnProps = {
      match: {
        params: {
          ticketId: expectedCurrentTicketId
        }
      }
    }
    const result = mapStateToClearRecentTicketsProps(null, mockOwnProps)

    it('Should have currentTicketId matching the passed in match.params.ticketId', function () {
      expect(result.currentTicketId).to.equal(expectedCurrentTicketId)
    })

    it('Should return clearRecentTicketsButtonAction as clearRecentTickets', function () {
      expect(result.clearRecentTickets).to.equal(clearRecentTicketsButtonAction)
    })
  })

  describe('ClearRecentTickets render output', function () {
    const result = createComponent(ClearRecentTickets, {})

    it('Should be a Switch', function () {
      expect(result.type).to.equal(Switch)
    })

    describe('Child routes', function () {
      describe('First Route', function () {
        it('Should be a Route', function () {
          expect(result.props.children[0].type).to.equal(Route)
        })

        it('Should match the tickets route and parse a ticketId from the URL', function () {
          expect(result.props.children[0].props.path).to.equal('/tickets/:ticketId')
        })

        it('Should use the connected version of ClearRecentTicketsButton as its component', function () {
          expect(result.props.children[0].props.component).to.equal(ConnectedClearRecentTicketsButton)
        })
      })

      describe('Second Route', function () {
        it('Should be a Route', function () {
          expect(result.props.children[1].type).to.equal(Route)
        })

        it('Should match any route as a default case', function () {
          expect(result.props.children[1].props.path).to.equal('/')
        })

        it('Should use the connected version of ClearRecentTicketsButton as its component', function () {
          expect(result.props.children[1].props.component).to.equal(ConnectedClearRecentTicketsButton)
        })
      })
    })
  })
})
