'use strict'
import { expect } from 'chai'

import createComponent from 'test/helpers/shallowRenderHelper'

import {
  Events,
  ConnectedEvent,
  Event,
  DisplayEvent,
  mapStateToEventProps
} from 'components/Timeline/Event/Events'
import ErrorMessage from 'components/elements/ErrorMessage'
import LoadingMessage from 'components/elements/LoadingMessage'

describe('Events', function () {
  describe('Events functional component', function () {
    const input = {
      events: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => ({id})),
      ticketId: 2,
      incidentId: null
    }

    const result = createComponent(Events, input)

    it('Should return a div containing an array of Events', function () {
      expect(result.type).to.equal('div')
      expect(result.props.children[0].type).to.equal(ConnectedEvent)
      expect(result.props.children[10].type).to.equal(ConnectedEvent)
      expect(result.props.children[11]).to.not.exist
    })

    it('Should pass through the right ticketId', function () {
      expect(result.props.children[0].props.ticketId).to.equal(2)
    })
  })

  describe('Event functional component', function () {
    context('When event does not have valid display text', function () {
      context('When eventTypeIsFetching', function () {
        const input = {
          eventTypeIsFetching: true,
          event: {}
        }

        const result = createComponent(Event, input)

        it('Should return a LoadingMessage', function () {
          expect(result.type).to.equal(LoadingMessage)
        })
      })

      context('When eventTypeIsError and not eventTypeIsFetching', function () {
        const input = {
          eventTypeIsError: true,
          event: {}
        }

        const result = createComponent(Event, input)

        it('Should return an ErrorMessage', function () {
          expect(result.type).to.equal(ErrorMessage)
        })
      })

      context('When not eventTypeIsError and not eventTypeIsFetching', function () {
        const result = createComponent(Event, {event: {}})

        it('Should return an DisplayEvent', function () {
          expect(result.type).to.equal(DisplayEvent)
        })
      })
    })

    context('When event has valid display text', function () {
      const input = {
        event: {
          data: {
            DisplayText: 'ValidText'
          }
        },
        eventTypeIsFetching: true,
        eventTypeIsError: true
      }

      const result = createComponent(Event, input)

      it('Should be a DisplayEvent', function () {
        expect(result.type).to.equal(DisplayEvent)
      })
    })
  })

  describe('mapStateToEventProps', function () {
    context('When state includes the event type as both fetching and error', function () {
      const mockState = {
        eventTypes: {
          fetching: [1],
          error: [1]
        }
      }
      const mockOwnProps = {
        event: {
          eventTypeId: 1
        },
        ticketId: 2
      }

      const result = mapStateToEventProps(mockState, mockOwnProps)

      it('Should pass forward eventTypeId and ticketId from ownProps', function () {
        expect(result.event).to.equal(mockOwnProps.event)
        expect(result.ticketId).to.equal(2)
      })

      it('Should return true for eventTypeIsFetching and eventTypeIsError', function () {
        expect(result.eventTypeIsError).to.be.true
        expect(result.eventTypeIsFetching).to.be.true
      })
    })

    context('When state includes the event type as neither fetching nor error', function () {
      const mockState = {
        eventTypes: {
          fetching: [1],
          error: [1]
        }
      }
      const mockOwnProps = {
        event: {
          eventTypeId: 3
        },
        ticketId: 2
      }

      const result = mapStateToEventProps(mockState, mockOwnProps)

      it('Should pass forward eventTypeId and ticketId from ownProps', function () {
        expect(result.event).to.equal(mockOwnProps.event)
        expect(result.ticketId).to.equal(2)
      })

      it('Should return false for eventTypeIsFetching and eventTypeIsError', function () {
        expect(result.eventTypeIsError).to.be.false
        expect(result.eventTypeIsFetching).to.be.false
      })
    })
  })
})
