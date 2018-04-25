'use strict'
import React from 'react'
import { expect } from 'chai'
import { DateTime } from 'luxon'
import { shallow } from 'enzyme'
import 'test/helpers/configureEnzyme'
import toJson from 'enzyme-to-json'
import { describeSnapshot } from 'test/helpers/describeSnapshot'

import ErrorMessage from 'components/elements/ErrorMessage'

describe('ErrorMessage', function () {
  context('when inputs are valid', function () {
    describe('when given only a message', function () {
      const testObject = shallow(<ErrorMessage message={'TestMessage'} />)

      describeSnapshot(function () {
        it('should match snapshot', function () {
          expect(toJson(testObject)).to.matchSnapshot()
        })
      })
    })

    describe('when given a message and provided an action for retry', function () {
      const testObject = shallow(<ErrorMessage message={'TestMessage'} actionForRetry={'TestAction'} />)

      describeSnapshot(function () {
        it('should match snapshot', function () {
          expect(toJson(testObject)).to.matchSnapshot()
        })
      })
    })

    describe('when given a time', function () {
      const testTime = DateTime.fromObject({
        year: 2018,
        month: 4,
        day: 25,
        hour: 15,
        minute: 39,
        second: 22,
        zone: 'America/Los_Angeles'
      })

      const testObject = shallow(<ErrorMessage time={testTime} />)

      describeSnapshot(function () {
        it('should match snapshot', function () {
          expect(toJson(testObject)).to.matchSnapshot()
        })
      })
    })

    describe('when given a background color', function () {
      const backgroundColor = 'Purple'
      const testObject = shallow(<ErrorMessage backgroundColor={backgroundColor} />)
      describeSnapshot(function () {
        it('should match snapshot', function () {
          expect(toJson(testObject)).to.matchSnapshot()
        })
      })
    })
  })
})
