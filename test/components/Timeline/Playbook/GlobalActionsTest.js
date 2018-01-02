'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from '../../../helpers/shallowRenderHelper'
import {
    GlobalActions,
    mapStateToGlobalActionsProps
} from '../../../../src/components/Timeline/Playbook/GlobalActions'
import DisplayGlobalActions from '../../../../src/components/Timeline/Playbook/DisplayGlobalActions'
import BootstrapGlobalActions from '../../../../src/components/Timeline/Playbook/BootstrapGlobalActions'

describe('GlobalActions', function () {
    describe('Component', function () {
        const expectedIncidentId = 1
        const expectedTicketId = 2

        it('Should output DisplayGlobalActions and pass incidentId and ticketId when any actions are provided', function () {
            const input = {
                incidentId: expectedIncidentId,
                ticketId: 2,
                actions: [{}, {}]
            }

            const testResult = createComponent(GlobalActions, input)

            expect(testResult.type).to.equal(DisplayGlobalActions)
            expect(testResult.props.incidentId).to.equal(expectedIncidentId)
            expect(testResult.props.ticketId).to.equal(expectedTicketId)
        })

        it('Should output BootstrapPlaybook when no actions are present', function () {
            const input = {
                incidentId: expectedIncidentId,
                ticketId: expectedTicketId
            }

            const testResult = createComponent(GlobalActions, input)

            expect(testResult.type).to.equal(BootstrapGlobalActions)
        })
    })

    describe('MapStateToProps', function () {
        const state = {
            globalActions: {
                1: {
                    name: 'testOne'
                },
                2: {
                    name: 'testTwo'
                }
            }
        }
        it('Should pull all GlobalActions out of state', function () {
            const testResult = mapStateToGlobalActionsProps(state)

            expect(testResult.actions.length).to.equal(2)
        })
    })
})