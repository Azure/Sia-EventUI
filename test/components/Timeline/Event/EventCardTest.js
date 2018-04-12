'use strict'
import { expect } from 'chai'
import * as Icons from 'material-ui/svg-icons'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import createComponent from 'test/helpers/shallowRenderHelper'

import {
  mapStateToEventCardProps,
  EventCard
} from 'components/Timeline/Event/EventCard'
import Playbook from 'components/Timeline/Playbook/Playbook'

describe('EventCard', function () {
  describe('mapStateToEventCardProps', function () {
    context('When eventType.icon is a valid material icon', function () {
      const mockState = {
        eventTypes: {
          records: {
            111: {
              icon: 'ActionThreeDRotation'
            }
          }
        },
        tickets: {
          map: {
            222: {}
          }
        }
      }
      const mockOwnProps = {
        event: {
          eventTypeId: 111
        },
        ticketId: 222
      }

      const result = mapStateToEventCardProps(mockState, mockOwnProps)

      it('Should return an object with the associated material icon function', function () {
        expect(result.IconType).to.equal(Icons.ActionThreeDRotation)
      })
    })

    context('When eventType.icon is not a valid material icon', function () {
      const mockState = {
        eventTypes: {
          records: {
            111: {
              icon: 'MaterialPleaseDontMakeThisARealIcon'
            }
          }
        },
        tickets: {
          map: {
            222: {}
          }
        }
      }
      const mockOwnProps = {
        event: {
          eventTypeId: 111
        },
        ticketId: 222
      }

      const result = mapStateToEventCardProps(mockState, mockOwnProps)

      it('Should return an object with a null IconType', function () {
        expect(result.IconType).to.be.null
      })
    })
  })

  describe('EventCard functional component', function () {
    context('Always', function () {
      const testArgs = {
        event: {
          backgroundColor: 'expectedColor',
          occurred: '19700101',
          id: 1,
          eventTypeId: 2
        },
        titleText: 'expectedText',
        ticketId: 10
      }

      const result = createComponent(EventCard, testArgs)

      it('Should be a card with style that matches the event.backgroundColor', function () {
        expect(result.type).to.equal(Card)
        expect(result.props.style.backgroundColor).to.equal('expectedColor')
      })

      it('Should have a child card header with the passed in title text', function () {
        expect(result.props.children[0].type).to.equal(CardHeader)
        expect(result.props.children[0].props.title).to.equal('expectedText')
      })

      it('Should have a child card text that contains only the Playbook component', function () {
        expect(result.props.children[1].type).to.equal(CardText)
        expect(result.props.children[1].props.children.type).to.equal(Playbook)
      })
    })

    context('When IconType is valid', function () {
      const expectedIconType = () => null
      const testArgs = {
        event: {},
        IconType: expectedIconType
      }

      const result = createComponent(EventCard, testArgs)

      it('Should have a child cardheader with an avatar whose icon matches IconType', function () {
        expect(result.props.children[0].props.avatar.props.icon.type).to.equal(expectedIconType)
      })
    })

    context('When IconType is not valid', function () {
      const testArgs = {
        event: {},
        IconType: null
      }

      const result = createComponent(EventCard, testArgs)

      it('Should have a child cardheader with a null avatar', function () {
        expect(result.props.children[0].props.avatar).to.equal(null)
      })
    })
  })
})
