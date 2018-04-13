'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from 'test/helpers/shallowRenderHelper'
import {
    DisplayGlobalActions,
    mapStateToDisplayGlobalActionsProps
} from 'components/Timeline/Playbook/DisplayGlobalActions'
import DisplayPlaybook from 'components/Timeline/Playbook/DisplayPlaybook'

describe('DisplayGlobalActions', function () {
  describe('Component - Display All', function () {
    it('Should output a DisplayPlaybook with a list of DisplayGlobalAction children when passed actions', function () {
      const input = {
        ticketId: 1,
        incidentId: 3,
        actions: [
          {
            name: 'testOne'
          },
          {
            name: 'testTwo'
          },
          {
            name: 'testThree'
          }
        ]
      }

      const testResult = createComponent(DisplayGlobalActions, input)
      expect(testResult.type).to.equal(DisplayPlaybook)
      expect(testResult.props.actions[0]).to.equal(input.actions[0])
      expect(testResult.props.actions[1]).to.equal(input.actions[1])
      expect(testResult.props.actions[2]).to.equal(input.actions[2])
    })

    it('Should output an empty DisplayPlaybook when passed no actions', function () {
      const input = {
        ticketId: 1,
        incidentId: 3
      }

      const testResult = createComponent(DisplayGlobalActions, input)

      expect(testResult.type).to.equal(DisplayPlaybook)
      expect(testResult.props.children).to.be.undefined
    })
  })

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
