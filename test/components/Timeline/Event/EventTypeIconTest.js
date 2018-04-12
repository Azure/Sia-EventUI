'use strict'
import { expect } from 'chai'
import * as Icons from 'material-ui/svg-icons'

import {
  mapStateToEventTypeIconProps
} from 'components/Timeline/Event/EventTypeIcon'

describe('EventTypeIcon', function () {
  describe('mapStateToEventTypeIconProps', function () {
    context('When eventType.Icon is a valid material icon', function () {
      const mockState = {
        eventTypes: {
          records: {
            111: {
              Icon: 'ActionThreeDRotation'
            }
          }
        }
      }
      const mockOwnProps = {
        eventTypeId: 111
      }

      const result = mapStateToEventTypeIconProps(mockState, mockOwnProps)

      it('Should return an object with the associated material icon function', function () {
        expect(result.IconType).to.equal(Icons.ActionThreeDRotation)
      })
    })

    context('When eventType.Icon is not a valid material icon', function () {
      const mockState = {
        eventTypes: {
          records: {
            111: {
              Icon: 'MaterialPleaseDontMakeThisARealIcon'
            }
          }
        }
      }
      const mockOwnProps = {
        eventTypeId: 111
      }

      const result = mapStateToEventTypeIconProps(mockState, mockOwnProps)

      it('Should return an empty object', function () {
        expect(Object.keys(result).length).to.equal(0)
      })
    })
  })
})
