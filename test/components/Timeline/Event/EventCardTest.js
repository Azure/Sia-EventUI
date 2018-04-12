'use strict'
import { expect } from 'chai'
import * as Icons from 'material-ui/svg-icons'

import {
  mapStateToEventCardProps
} from 'components/Timeline/Event/EventCard'

describe('EventCard', function () {
  describe('mapStateToEventCardProps', function () {
    context('When eventType.Icon is a valid material icon', function () {
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

    context('When eventType.Icon is not a valid material icon', function () {
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
})
