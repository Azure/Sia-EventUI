'use strict'
import { expect } from 'chai'

import * as signalRActions from 'actions/signalRActions'
import * as signalRReducer from 'reducers/signalRReducer'

describe('SignalR Reducer', function () {
  describe('ConnectionReducer', function () {
    context('When passed default state or null', function () {
      const defaultState = {
        status: signalRReducer.connectionStatuses.notEstablished
      }

      describe('When passed action of type ESTABLISH_CONNECTION_TRY', function () {
        const result = signalRReducer.connectionReducer(defaultState, { type: signalRActions.ESTABLISH_CONNECTION_TRY })

        it('Should be connecting with undefined error values', function () {
          expect(result.status).to.equal(signalRReducer.connectionStatuses.connecting)
          expect(result.connectionError).to.be.undefined
          expect(result.disconnectReason).to.be.undefined
        })
      })

      describe('When passed action of type ESTABLISH_CONNECTION_FAIL', function () {
        const action = {
          type: signalRActions.ESTABLISH_CONNECTION_FAIL,
          error: 'testValue'
        }
        const result = signalRReducer.connectionReducer(defaultState, action)

        it('Should be in error state with the most recent connectionError', function () {
          expect(result.status).to.equal(signalRReducer.connectionStatuses.error)
          expect(result.connectionError).to.equal('testValue')
          expect(result.disconnectReason).to.be.undefined
        })
      })

      describe('When passed action of type ESTABLISH_CONNECTION_SUCCEED', function () {
        const result = signalRReducer.connectionReducer(defaultState, { type: signalRActions.ESTABLISH_CONNECTION_SUCCEED })

        it('Should be in connected state with null error values', function () {
          expect(result.status).to.equal(signalRReducer.connectionStatuses.connected)
          expect(result.connectionError).to.be.null
          expect(result.disconnectReason).to.be.null
        })
      })

      describe('When passed action of type CONNECTION_CLOSED', function () {
        const action = {
          type: signalRActions.CONNECTION_CLOSED,
          error: 'testValue'
        }
        const result = signalRReducer.connectionReducer(defaultState, action)

        it('Should be in disconnected state with the most recent error as disconnectReason', function () {
          expect(result.status).to.equal(signalRReducer.connectionStatuses.disconnected)
          expect(result.connectionError).to.be.undefined
          expect(result.disconnectReason).to.equal('testValue')
        })
      })
    })

    context('When passed error state', function () {
      const errorState = {
        connectionError: 'error',
        disconnectReason: 'error'
      }

      describe('When passed action of type ESTABLISH_CONNECTION_TRY', function () {
        const result = signalRReducer.connectionReducer(errorState, { type: signalRActions.ESTABLISH_CONNECTION_TRY })

        it('Should be connecting with the existing error values', function () {
          expect(result.status).to.equal(signalRReducer.connectionStatuses.connecting)
          expect(result.connectionError).to.equal('error')
          expect(result.disconnectReason).to.equal('error')
        })
      })

      describe('When passed action of type ESTABLISH_CONNECTION_FAIL', function () {
        const action = {
          type: signalRActions.ESTABLISH_CONNECTION_FAIL,
          error: 'testValue'
        }
        const result = signalRReducer.connectionReducer(errorState, action)

        it('Should be in error state with the most recent connectionError', function () {
          expect(result.status).to.equal(signalRReducer.connectionStatuses.error)
          expect(result.connectionError).to.equal('testValue')
          expect(result.disconnectReason).to.equal('error')
        })
      })

      describe('When passed action of type ESTABLISH_CONNECTION_SUCCEED', function () {
        const result = signalRReducer.connectionReducer(errorState, { type: signalRActions.ESTABLISH_CONNECTION_SUCCEED })

        it('Should be in connected state with null error values', function () {
          expect(result.status).to.equal(signalRReducer.connectionStatuses.connected)
          expect(result.connectionError).to.be.null
          expect(result.disconnectReason).to.be.null
        })
      })

      describe('When passed action of type CONNECTION_CLOSED', function () {
        const action = {
          type: signalRActions.CONNECTION_CLOSED,
          error: 'testValue'
        }
        const result = signalRReducer.connectionReducer(errorState, action)

        it('Should be in disconnected state with the most recent error as disconnectReason', function () {
          expect(result.status).to.equal(signalRReducer.connectionStatuses.disconnected)
          expect(result.connectionError).to.equal('error')
          expect(result.disconnectReason).to.equal('testValue')
        })
      })
    })

    it('Should return state when action has an uncaught type', function () {
      const state = {}
      const result = signalRReducer.connectionReducer(state, { type: 'IGNOREME' })

      expect(result).to.equal(state)
    })
  })

  describe('Message Status Reducer', function () {
    describe('From default state', function () {
      const messageStatusDefault = {
        pendingMessageCount: 0
      }
      it('Should return with 1 more pending message when passed RECEIVE_MESSAGE', function () {
        const result = signalRReducer.messageStatusReducer(messageStatusDefault, { type: signalRActions.RECEIVE_MESSAGE })

        expect(result.pendingMessageCount).to.equal(1)
      })

      it('Should return with 0 pending message when passed ACKNOWLEDGE_MESSAGES', function () {
        const result = signalRReducer.messageStatusReducer(messageStatusDefault, { type: signalRActions.ACKNOWLEDGE_MESSAGES })

        expect(result.pendingMessageCount).to.equal(0)
      })
    })

    describe('From state with one message pending', function () {
      const messageStatusOnePending = {
        pendingMessageCount: 1
      }
      it('Should return with 1 more pending message when passed RECEIVE_MESSAGE', function () {
        const result = signalRReducer.messageStatusReducer(messageStatusOnePending, { type: signalRActions.RECEIVE_MESSAGE })

        expect(result.pendingMessageCount).to.equal(2)
      })

      it('Should return with 0 pending message when passed ACKNOWLEDGE_MESSAGES', function () {
        const result = signalRReducer.messageStatusReducer(messageStatusOnePending, { type: signalRActions.ACKNOWLEDGE_MESSAGES })

        expect(result.pendingMessageCount).to.equal(0)
      })
    })

    it('Should return state when action has an uncaught type', function () {
      const state = {}
      const result = signalRReducer.messageStatusReducer(state, { type: 'IGNOREME' })

      expect(result).to.equal(state)
    })
  })

  describe('Filter Preferences Reducer', function () {
    context('when action is UPDATE_FILTER_PREFERENCE_EVENTS', function () {
      context('from default state', function () {
        const defaultState = {
          eventFilterType: 'sync'
        }

        const getAction = (filterType) => ({
          type: signalRActions.UPDATE_FILTER_PREFERENCE_EVENTS,
          filterType
        })

        describe('when action.filterType is the same as the existing filter type', function () {
          const result = signalRReducer.filterPreferencesReducer(null)(defaultState, getAction('sync'))

          it('should return state', function () {
            expect(result).to.equal(defaultState)
          })
        })

        describe('when action.filterType is an invalid filter type', function () {
          const result = signalRReducer.filterPreferencesReducer(null)(defaultState, getAction('pool'))

          it('should return state', function () {
            expect(result).to.equal(defaultState)
          })
        })

        describe('when action.filterType is a valid type different from the existing filter type', function () {
          const result = signalRReducer.filterPreferencesReducer(null)(defaultState, getAction('none'))

          it('should return a new state object with the action\'s eventFilterType', function () {
            expect(result.eventFilterType).to.equal('none')
          })
        })
      })
    })

    it('Should return state when action has an uncaught type', function () {
      const state = { eventFilterType: 'unimportant' }
      const result = signalRReducer.filterPreferencesReducer(undefined)(state, { type: 'IGNOREME' })

      expect(result).to.equal(state)
    })
  })
})