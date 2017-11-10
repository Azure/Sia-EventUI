'use strict'
import { expect } from 'chai'
import React from 'react'
import moment from 'moment'
import * as playbook from '../../../../src/components/Timeline/Playbook/Playbook'

describe('TestCondition', function test () {
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
} )

const getComparisonValueString = ({
    comparisonValue: 'stringValue',
    dataFormat: 1
})

const getComparisonValueInt = ({
    integerComparisonValue: 1,
    dataFormat: 0
})

const getComparisonValueDateTime = ({
    dateTimeComparisonValue: '19700101',
    dataFormat: 2
})

const failGetComparisonValueString = ({
    dataFormat: 1
})

const failGetComparisonValueInt = ({
    dataFormat: 0
})

const failGetComparisonValueDateTime = ({
    dataFormat: 2
})

describe('GetComparisonValue', function test () {
    it('Should return expected string when condition has string data format and comparison value', () => {
        expect(playbook.GetComparisonValue(getComparisonValueString)).to.equal('stringValue')
    })

    it('Should return expected dateTime when condition has dateTime data format and comparison value', () => {
        expect(playbook.GetComparisonValue(getComparisonValueDateTime).isSame('19700101')).to.be.true
    })

    it('Should return expected int when condition has int data format and comparison value', () => {
        expect(playbook.GetComparisonValue(getComparisonValueInt)).to.equal(1)
    })

    it('Should return undefined when no value of the expected condition type is supplied', () => {
        expect(playbook.GetComparisonValue(failGetComparisonValueString)).to.be.undefined
        expect(playbook.GetComparisonValue(failGetComparisonValueInt)).to.be.undefined
        expect(playbook.GetComparisonValue(failGetComparisonValueDateTime)).to.be.undefined
    })
})