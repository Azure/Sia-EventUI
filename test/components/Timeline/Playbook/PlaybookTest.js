'use strict'
import { expect } from 'chai'
import React from 'react'
import moment from 'moment'
import * as playbook from '../../../../src/components/Timeline/Playbook/Playbook'

describe('TestCondition', function () {
    it('Should return true when conditionType is 1 and test returns true', () => {
        expect(playbook.testableTestCondition((c) => true)({ConditionType:1})).to.be.true
    })
    it('Should return false when conditionType is 1 and test returns false', () => {
        expect(playbook.testableTestCondition((c) => false)({ConditionType:1})).to.be.false
    })
    it('Should return false when conditionType is 0 and test returns true', () => {
        expect(playbook.testableTestCondition((c) => true)({ConditionType:0})).to.be.false
    })
    it('Should return true when conditionType is 0 and test returns false', () => {
        expect(playbook.testableTestCondition((c) => false)({ConditionType:0})).to.be.true
    })
})

describe('GetComparisonValue', function () {
    it('Should return expected string when condition has string data format and comparison value', () => {
        const getComparisonValueString = ({
            comparisonValue: 'stringValue',
            dataFormat: 1
        })
        expect(playbook.GetComparisonValue(getComparisonValueString)).to.equal('stringValue')
    })

    it('Should return expected dateTime when condition has dateTime data format and comparison value', () => {
        const getComparisonValueDateTime = ({
            dateTimeComparisonValue: '19700101',
            dataFormat: 2
        })
        expect(playbook.GetComparisonValue(getComparisonValueDateTime).isSame('19700101')).to.be.true
    })

    it('Should return expected int when condition has int data format and comparison value', () => {
        const getComparisonValueInt = ({
            integerComparisonValue: 1,
            dataFormat: 0
        })
        
        expect(playbook.GetComparisonValue(getComparisonValueInt)).to.equal(1)
    })

    it('Should return undefined when no value of the expected condition type is supplied', () => {
        const failGetComparisonValueString = ({
            dataFormat: 1
        })
        
        const failGetComparisonValueInt = ({
            dataFormat: 0
        })
        
        const failGetComparisonValueDateTime = ({
            dataFormat: 2
        })
        expect(playbook.GetComparisonValue(failGetComparisonValueString)).to.be.undefined
        expect(playbook.GetComparisonValue(failGetComparisonValueInt)).to.be.undefined
        expect(playbook.GetComparisonValue(failGetComparisonValueDateTime)).to.be.undefined
    })
})

describe('Test By Condition Type', function () {
    const getComparison = (condition) => condition.comparison

    it('Should validate inclusion when condition type is 2', () => {
        const stringIncludesCondition = ({
            conditionType: 2,
            value: "StringIsIncluded",
            comparison:"IsIncluded"
        })
        
        const stringDoesNotIncludeCondition = ({
            conditionType: 2,
            value: "StringIsNotIncluded",
            comparison:"IsIncluded"
        })
        expect(playbook.testableTestByConditionType(getComparison)(stringIncludesCondition)).to.be.true
        expect(playbook.testableTestByConditionType(getComparison)(stringDoesNotIncludeCondition)).to.be.false
    })

    it('Should validate existence when condition type is 3', () => {
        const somethingExistsCondition = ({
            conditionType: 3,
            value: 1,
            comparison:"NoOp"
        })
        
        const somethingDoesNotExistCondition = ({
            conditionType: 3,
            comparison:"NoOp"
        })
        expect(playbook.testableTestByConditionType(getComparison)(somethingExistsCondition)).to.be.true
        expect(playbook.testableTestByConditionType(getComparison)(somethingDoesNotExistCondition)).to.be.false
    })

    it('Should validate value is greater than when condition type is 4', () => {
        const somethingIsGreaterThanCondition = ({
            conditionType: 4,
            value: 3,
            comparison: 2
        })
        
        const somethingIsNotGreaterThanCondition = ({
            conditionType: 4,
            value: 3,
            comparison: 4
        })
        expect(playbook.testableTestByConditionType(getComparison)(somethingIsGreaterThanCondition)).to.be.true
        expect(playbook.testableTestByConditionType(getComparison)(somethingIsNotGreaterThanCondition)).to.be.false
    })

    it('Should validate value is less than when condition type is 5', () => {
        const somethingIsNotLessThanCondition = ({
            conditionType: 5,
            value: 4,
            comparison: 3
        })
        
        const somethingIsLessThanCondition = ({
            conditionType: 5,
            value: 4,
            comparison: 5
        })
        expect(playbook.testableTestByConditionType(getComparison)(somethingIsLessThanCondition)).to.be.true
        expect(playbook.testableTestByConditionType(getComparison)(somethingIsNotLessThanCondition)).to.be.false
    })

    it('Should validate value is equal when condition type is 1 or anything not provided', () => {
        const sometingIsEqualToCondition = ({
            conditionType: 1,
            value: 1,
            comparison: 1
        })
        
        const sometingIsNotEqualToCondition = ({
            conditionType: 1,
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
    
    it('Should return true in case 1 (any of) when at least one condition is met, and false otherwise', () => {
        const anyOfConditionSet = {
            ...baseConditionSet,
            type: 1
        }
        expect(testNoneMet(anyOfConditionSet)).to.be.false
        expect(testOneMet(0)(anyOfConditionSet)).to.be.true
        expect(testAllMet(anyOfConditionSet)).to.be.true
    })

    it('Should return true in case 2 (all of) when all conditions are met, and false otherwise', () => {
        const allOfConditionSet = {
            ...baseConditionSet,
            type: 2
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

    it('Should return true in case 0 (None of) when at no conditions are met, and false otherwise', () => {
        const noneOfConditionSet = {
            ...baseConditionSet,
            type: 0
        }
        expect(testNoneMet(noneOfConditionSet)).to.be.true
        expect(testOneMet(0)(noneOfConditionSet)).to.be.false
        expect(testAllMet(noneOfConditionSet)).to.be.false
    })
})