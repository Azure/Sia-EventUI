'use strict'
import { expect } from 'chai'
import React from 'react'
import moment from 'moment'
import createComponent from '../../../helpers/shallowRenderHelper'
import {
    DisplayGlobalActions,
    DisplayGlobalAction,
    mapStateToDisplayGlobalActionsProps
} from '../../../../src/components/Timeline/Playbook/DisplayGlobalActions'
import Play from '../../../../src/components/Timeline/Playbook/Play'

describe('DisplayGlobalActions', function () {
    describe('Component - Display All', function () {
        it('Should output a div with a list of DisplayGlobalAction children when passed actions', function () {
            const input = {
                ticketId: 1,
                engagementId: 2,
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
            expect(testResult.props.children[3]).to.not.exist
        })

        it('Should output an empty div when passed no actions', function () {
            const input = {
                ticketId: 1,
                engagementId: 2,
                incidentId: 3
            }

            const testResult = createComponent(DisplayGlobalActions, input)

            expect(testResult.type).to.equal('div')
            expect(testResult.props.children).to.not.exist
        })
    })

    describe('Component - Display Single', function () {
        const testAction = {
            name: 'test'
        }
        it('Should output a div with a span child, a line break, and a Play', function () {
            const testResult = DisplayGlobalAction(testAction, 1, 2, 3, 4)

            expect(testResult.type).to.equal('div')
            expect(testResult.props.children[0].type).to.equal('span')
            expect(testResult.props.children[1].type).to.equal('br')
            expect(testResult.props.children[2].type).to.equal(Play)
            expect(testResult.props.children[3]).to.not.exist
        })
    })

    describe('mapStateToProps', function () {
        const state = {
            auth: {
                userAlias: 'testAlias',
                userTeam: 'testTeam',
                userRole: 'testRole'
            },
            engagements: {
                list: [
                    {
                        id: 3,
                        incidentId: 1,
                        participant: {
                            alias: 'testAlias',
                            team: 'testTeam',
                            role: 'testRole'
                        }
                    },
                    {
                        id: 4,
                        incidentId: 2,
                        participant: {
                            alias: 'otherAlias',
                            team: 'otherTeam',
                            role: 'otherRole'
                        }
                    }
                ]
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
            },
            tickets: {
                map: {
                    7: {
                        id: 7
                    }
                }
            }
        }

        const ownProps = {
            ticketId: 7,
            incidentId: 1
        }

        it('Should find engagementId based on state.auth and state.engagements', function () {
            const result = mapStateToDisplayGlobalActionsProps(state, ownProps)

            expect(result.engagementId).to.equal(3)
        })

        it('Should test actions and return qualified actions based on state.globalActions', function () {
            const result = mapStateToDisplayGlobalActionsProps(state, ownProps)

            expect(result.actions[0].name).to.equal('ExpectedAction')
            expect(result.actions[1]).to.not.exist
        })
    })
})