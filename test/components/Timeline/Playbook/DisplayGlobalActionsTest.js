'use strict'
import { expect } from 'chai'

import {
  mapStateToDisplayGlobalActionsProps
} from 'components/Timeline/Playbook/DisplayGlobalActions'

describe('DisplayGlobalActions', function () {
  describe('mapStateToProps', function () {
    const ownProps = {
      ticketId: 7,
      incidentId: 1
    }

    describe('Qualified Actions', function () {
      const state = {
        tickets: {
          map: {
            7: {
              id: 7
            }
          }
        },
        globalActions: {
          1: {
            name: 'ExpectedAction',
            conditionSets: []
          },
          2: {
            name: 'OtherAction',
            conditionSets: [
              {
                type: 1,
                conditions: [
                  {
                    conditionSource: {
                      name: 'testSource',
                      sourceObject: 1,
                      key: 'the key that will not be matched'
                    },
                    assertionType: 0,
                    conditionType: 2,
                    dataFormat: 0
                  }
                ]
              }
            ]
          }
        }
      }

      it('Should test actions and return qualified actions based on state.globalActions', function () {
        const result = mapStateToDisplayGlobalActionsProps(state, ownProps)
        const expectedNumberOfQualifyingActions = 1

        expect(result.actions[0].name).to.equal('ExpectedAction')
        expect(result.actions.length).to.equal(expectedNumberOfQualifyingActions)
      })
    })
  })
})
