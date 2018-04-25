import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { DateTime } from 'luxon'


import { describeSnapshot } from 'test/helpers/describeSnapshot'

import {
  TimeDisplayComponent,
  parseTime,
  mapStateToProps
} from 'components/elements/TimeDisplay'

describe('TimeDisplay', function () {
  const validTime = DateTime.fromObject({
    year: 2018,
    month: 4,
    day: 25,
    hour: 15,
    minute: 39,
    second: 22,
    zone: 'America/Los_Angeles'
  })

  describeSnapshot(function () {
    it('should match snapshot', function () {
      expect(toJson(shallow(<TimeDisplayComponent time={validTime} timezones={['UTC']} />)))
        .to.matchSnapshot()
    })
  })

  describe('when time is null', function () {
    it('should return null', function () {
      expect(toJson(shallow(<TimeDisplayComponent time={null} timezones={['UTC']} />)))
        .to.matchSnapshot()
    })
  })

  describe('parseTime', function () {
    describe('when input is valid', function () {
      it('should return value when given a DateTime', function () {
        expect(parseTime(DateTime.utc(2018, 4, 25)).isValid).to.be.true
      })

      it('should return parsed ISO string when given ISO string', function () {
        const validIsoTime = '2008-09-15T15:53:00+05:00'

        expect(parseTime(validIsoTime).isValid).to.be.true
      })
    })

    describe('when input is invalid', function () {
      it('isValid should be false when given an integer', function () {
        expect(parseTime(123).isValid).to.be.false
      })

      it('isValid should be false when given a non-ISO time string', function () {
        expect(parseTime('not an ISO string').isValid).to.be.false
      })
    })
  })

  describe('mapStateToProps', function () {
    const validStateObject = {
      timePreferences: {
        displayTimezones: ['UTC', 'America/Los_Angeles', 'other', 'timezones']
      }
    }
    const validOwnProps = {
      time: 'time object'
    }

    it('should return the correct timezones', function () {
      const testState = mapStateToProps(
        validStateObject,
        validOwnProps
      )

      expect(testState.timezones).to.be.an('array')
        .to.have.same.members(validStateObject.timePreferences.displayTimezones)
    })

    it('should get time from ownProps', function () {
      const testState = mapStateToProps(
        validStateObject,
        validOwnProps
      )

      expect(testState.time).to.equal(validOwnProps.time)
    })
  })
})
