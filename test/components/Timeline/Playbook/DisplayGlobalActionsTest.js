'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from 'test/helpers/shallowRenderHelper'
import {
    DisplayGlobalActions,
    DisplayGlobalAction,
    mapStateToDisplayGlobalActionsProps
} from 'components/Timeline/Playbook/DisplayGlobalActions'
import Play from 'components/Timeline/Playbook/Play'

describe('DisplayGlobalActions', function () {
  describe('Component - Display All', function () {
    it('Should output a div with a list of DisplayGlobalAction children when passed actions', function () {
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

      expect(testResult.type).to.equal('div')
      expect(testResult.props.children[0].type).to.equal('div')
      expect(testResult.props.children[2].type).to.equal('div')
      expect(testResult.props.children.length).to.equal(input.actions.length)
    })

    it('Should output an empty div when passed no actions', function () {
      const input = {
        ticketId: 1,
        incidentId: 3
      }

      const testResult = createComponent(DisplayGlobalActions, input)

      expect(testResult.type).to.equal('div')
      expect(testResult.props.children).to.be.null
    })
  })

  describe('Component - Display Single', function () {
    const testAction = {
      name: 'test'
    }
    it('Should output a div with a span child for the action name, a line break for spacing, and a Play to render the link', function () {
      const testResult = DisplayGlobalAction(testAction, 1, 2, 3, 4)
      const expectedChildTypes = ['span', 'br', Play]

      expect(testResult.type).to.equal('div')
      for (let childIndex = 0; childIndex < 3; childIndex++) {
        expect(testResult.props.children[childIndex].type).to.equal(expectedChildTypes[childIndex])
      }
      expect(testResult.props.children.length).to.equal(3)
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
