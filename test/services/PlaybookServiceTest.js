'use strict'
import { expect } from 'chai'
import moment from 'moment'
import * as playbook from '../../src/services/playbookService'

describe('Playbook Service', function () {
    describe('TestCondition', function () {
        it('Should return true when AssertionType is 1 and test returns true', () => {
            expect(playbook.testableTestCondition((c) => true)({AssertionType:1})).to.be.true
        })
        it('Should return false when AssertionType is 1 and test returns false', () => {
            expect(playbook.testableTestCondition((c) => false)({AssertionType:1})).to.be.false
        })
        it('Should return false when AssertionType is 0 and test returns true', () => {
            expect(playbook.testableTestCondition((c) => true)({AssertionType:0})).to.be.false
        })
        it('Should return true when AssertionType is 0 and test returns false', () => {
            expect(playbook.testableTestCondition((c) => false)({AssertionType:0})).to.be.true
        })
    })

    describe('GetComparisonValue', function () {
        const stringDataFormatValue = 0
        const dateTimeDataFormatValue = 1
        const intDataFormatValue = 2

        it('Should return expected string when condition has string data format and comparison value', () => {
            const getComparisonValueString = ({
                comparisonValue: 'stringValue',
                dataFormat: stringDataFormatValue
            })
            expect(playbook.GetComparisonValue(getComparisonValueString)).to.equal('stringValue')
        })

        it('Should return expected dateTime when condition has dateTime data format and comparison value', () => {
            const getComparisonValueDateTime = ({
                dateTimeComparisonValue: '19700101',
                dataFormat: dateTimeDataFormatValue
            })
            expect(playbook.GetComparisonValue(getComparisonValueDateTime).isSame('19700101')).to.be.true
        })

        it('Should return expected int when condition has int data format and comparison value', () => {
            const getComparisonValueInt = ({
                integerComparisonValue: 1,
                dataFormat: intDataFormatValue
            })
            
            expect(playbook.GetComparisonValue(getComparisonValueInt)).to.equal(1)
        })

        it('Should return undefined when no value of the expected condition type is supplied', () => {
            const failGetComparisonValueString = ({
                dataFormat: stringDataFormatValue
            })
            
            const failGetComparisonValueInt = ({
                dataFormat: intDataFormatValue
            })
            
            const failGetComparisonValueDateTime = ({
                dataFormat: dateTimeDataFormatValue
            })
            expect(playbook.GetComparisonValue(failGetComparisonValueString)).to.be.undefined
            expect(playbook.GetComparisonValue(failGetComparisonValueInt)).to.be.undefined
            expect(playbook.GetComparisonValue(failGetComparisonValueDateTime)).to.be.undefined
        })
    })

    describe('Test By Condition Type', function () {
        const getComparison = (condition) => condition.comparison

        it('Should validate inclusion when condition type is 1', () => {
            const stringIncludesCondition = ({
                conditionType: 1,
                value: "StringIsIncluded",
                comparison:"IsIncluded"
            })
            
            const stringDoesNotIncludeCondition = ({
                conditionType: 1,
                value: "StringIsNotIncluded",
                comparison:"IsIncluded"
            })
            expect(playbook.testableTestByConditionType(getComparison)(stringIncludesCondition)).to.be.true
            expect(playbook.testableTestByConditionType(getComparison)(stringDoesNotIncludeCondition)).to.be.false
        })

        it('Should validate existence when condition type is 2', () => {
            const somethingExistsCondition = ({
                conditionType: 2,
                value: 1,
                comparison:"NoOp"
            })
            
            const somethingDoesNotExistCondition = ({
                conditionType: 2,
                comparison:"NoOp"
            })
            expect(playbook.testableTestByConditionType(getComparison)(somethingExistsCondition)).to.be.true
            expect(playbook.testableTestByConditionType(getComparison)(somethingDoesNotExistCondition)).to.be.false
        })

        it('Should validate value is greater than when condition type is 3', () => {
            const somethingIsGreaterThanCondition = ({
                conditionType: 3,
                value: 2,
                comparison: 1
            })
            
            const somethingIsNotGreaterThanCondition = ({
                conditionType: 3,
                value: 1,
                comparison: 2
            })
            expect(playbook.testableTestByConditionType(getComparison)(somethingIsGreaterThanCondition)).to.be.true
            expect(playbook.testableTestByConditionType(getComparison)(somethingIsNotGreaterThanCondition)).to.be.false
        })

        it('Should validate value is less than when condition type is 4', () => {
            const somethingIsNotLessThanCondition = ({
                conditionType: 4,
                value: 2,
                comparison: 1
            })
            
            const somethingIsLessThanCondition = ({
                conditionType: 4,
                value: 2,
                comparison: 3
            })
            expect(playbook.testableTestByConditionType(getComparison)(somethingIsLessThanCondition)).to.be.true
            expect(playbook.testableTestByConditionType(getComparison)(somethingIsNotLessThanCondition)).to.be.false
        })

        it('Should validate value is equal when condition type is 0', () => {
            const sometingIsEqualToCondition = ({
                conditionType: 0,
                value: 1,
                comparison: 1
            })
            
            const sometingIsNotEqualToCondition = ({
                conditionType: 0,
                value: 2,
                comparison: 1
            })
            expect(playbook.testableTestByConditionType(getComparison)(sometingIsEqualToCondition)).to.be.true
            expect(playbook.testableTestByConditionType(getComparison)(sometingIsNotEqualToCondition)).to.be.false
        })
    })

    describe('Test Condition Set', function () {
        const noneMetTestCondition = v => false
        const allMetTestCondition = v => true
        const oneMetTestCondition = (initInt = 0) => v => !initInt++

        const selectReturnEvent = (source, event) => event

        const eventWithSomeValueAtExpectedKey = {
            key: 1
        }

        const baseConditionSet = {
            conditions: [
                {
                    conditionSource: {
                        key: 'key',
                        sourceObject: 'Does not matter here'
                    }
                },
                {
                    conditionSource: {
                        key: 'key',
                        sourceObject: 'Does not matter here'
                    }
                }
            ]
        }

        const testNoneMet = playbook.testableTestConditionSet(selectReturnEvent, noneMetTestCondition)(eventWithSomeValueAtExpectedKey)
        const testOneMet = tracker => playbook.testableTestConditionSet(selectReturnEvent, oneMetTestCondition(tracker))(eventWithSomeValueAtExpectedKey)
        const testAllMet = playbook.testableTestConditionSet(selectReturnEvent, allMetTestCondition)(eventWithSomeValueAtExpectedKey)
        
        it('Should return true in case 0 (any of) when at least one condition is met, and false otherwise', () => {
            const anyOfConditionSet = {
                ...baseConditionSet,
                type: 0
            }
            expect(testNoneMet(anyOfConditionSet)).to.be.false
            expect(testOneMet(0)(anyOfConditionSet)).to.be.true
            expect(testAllMet(anyOfConditionSet)).to.be.true
        })

        it('Should return true in case 1 (all of) when all conditions are met, and false otherwise', () => {
            const allOfConditionSet = {
                ...baseConditionSet,
                type: 1
            }

            expect(testNoneMet(allOfConditionSet)).to.be.false
            expect(testOneMet(0)(allOfConditionSet)).to.be.false
            expect(testAllMet(allOfConditionSet)).to.be.true
        })

        it('Should return true in case 3 (Not All Of) when at least one condition is not met, and false otherwise', () => {
            const notAllOfConditionSet = {
                ...baseConditionSet,
                type: 3
            }
            expect(testNoneMet(notAllOfConditionSet)).to.be.true
            expect(testOneMet(0)(notAllOfConditionSet)).to.be.true
            expect(testAllMet(notAllOfConditionSet)).to.be.false
        })

        it('Should return true in case 2 (None of) when at no conditions are met, and false otherwise', () => {
            const noneOfConditionSet = {
                ...baseConditionSet,
                type: 2
            }
            expect(testNoneMet(noneOfConditionSet)).to.be.true
            expect(testOneMet(0)(noneOfConditionSet)).to.be.false
            expect(testAllMet(noneOfConditionSet)).to.be.false
        })
    })

    describe('Fill Template', function () {
        const fillTemplate = playbook.testableFillTemplate((sourceObjectenum, event) => event)

        it('Should return an empty string when no template or no template pattern', function () {
            expect(fillTemplate(null)).to.equal('')
            expect(fillTemplate({})).to.equal('')
        })

        it('Should return the unmodified pattern when pattern is valid but no sources are available', function () {
            expect(fillTemplate({pattern:'ExpectedValue'})).to.equal('ExpectedValue')
        })

        it('Should return populated template when template has valid sources', function () {
            const eventTypeNegativeOne = {
                name: 'Everything is set up with sources',
                displayTemplate: {
                    pattern: 'Valid displayTemplate.pattern filled from sources such as ${testData}',
                    sources: [
                        {
                            name: 'testData',
                            sourceObject: 0,
                            key: 'data.test'
                        }
                    ]
                }
            }

            const eventNegativeOne = {
                data: {
                    test: 'this data from the event'
                }
            }

            expect(fillTemplate(eventTypeNegativeOne.displayTemplate, eventNegativeOne)).to.equal('Valid displayTemplate.pattern filled from sources such as this data from the event')
        })
    })

    describe('LoadTextFromEvent', function () {
        const eventTypeNegativeOne = {
            name: 'Everything is set up with sources',
            displayTemplate: {
                pattern: 'Valid displayTemplate.pattern filled from sources such as ${testData}',
                sources: [
                    {
                        name: 'testData',
                        sourceObject: 0,
                        key: 'data.test'
                    }
                ]
            }
        }
        
        const eventTypeZero = {
            name: 'Everything is set up',
            displayTemplate: {
                pattern: 'Valid displayTemplate.pattern'
            }
        }
        const eventTypeOne = {
            name: 'No displayTemplate.pattern',
            displayTemplate: {
            }
        }
        const eventTypeTwo = {
            name: 'Invalid displayTemplate.pattern',
            displayTemplate: {
                pattern: ''
            }
        }
        const eventTypeThree = {
            name: 'eventType.name'
        }

        it('Should return populated eventType.displayTemplate.pattern if valid', () => {
            const eventNegativeOne = {
                data: {
                    test: 'this data from the event'
                }
            }

            expect(playbook.LoadTextFromEvent(eventNegativeOne, eventTypeZero)).to.equal('Valid displayTemplate.pattern')
            expect(playbook.LoadTextFromEvent(eventNegativeOne, eventTypeNegativeOne)).to.equal('Valid displayTemplate.pattern filled from sources such as this data from the event')
        })

        it('Should return the DisplayText if no valid eventType or displayTemplate and displayText is valid', () => {
            const eventTwo = {
                eventTypeId: 100,
                data: {
                    DisplayText: 'User displayText',
                    SomeField: ''
                }
            }
            
            expect(playbook.LoadTextFromEvent(eventTwo, null)).to.equal('User displayText')
            expect(playbook.LoadTextFromEvent(eventTwo, eventTypeOne)).to.equal('User displayText')        
            expect(playbook.LoadTextFromEvent(eventTwo, eventTypeTwo)).to.equal('User displayText')
            expect(playbook.LoadTextFromEvent(eventTwo, eventTypeThree)).to.equal('User displayText')        
        })

        it('Should return the eventType.name if no valid displayTemplate and displayText is not valid', () => {
            const eventFive = {
                eventTypeId: 3
            }
            
            expect(playbook.LoadTextFromEvent(eventFive, eventTypeOne)).to.equal('No displayTemplate.pattern')        
            expect(playbook.LoadTextFromEvent(eventFive, eventTypeTwo)).to.equal('Invalid displayTemplate.pattern')
            expect(playbook.LoadTextFromEvent(eventFive, eventTypeThree)).to.equal('eventType.name')        
        })


        it('Should return stringified event.data if no valid display template, display text, or event type name', () => {      
            const eventNine = {
                eventTypeId: 100,
                data: {
                    DisplayText: '',
                    SomeField: 'User data here'
                }
            }
            
            expect(playbook.LoadTextFromEvent(eventNine, null)).to.equal('{"DisplayText":"","SomeField":"User data here"}')
        })


        it('Should return events with error message when no eventType and no data', () => {
            const eventTen = {
                eventTypeId: 100
            }
            
            expect(playbook.LoadTextFromEvent(eventTen, null)).to.equal('This event has no text')
        })
    })
})