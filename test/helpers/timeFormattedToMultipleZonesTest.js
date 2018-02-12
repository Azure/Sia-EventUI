'use strict'
import { expect } from 'chai'
import { DateTime } from 'luxon';
import timeFormattedToMultipleZones from 'helpers/timeFormattedToMultipleZones'

describe('timeFormattedToMultipleZones', function test () {
  let pacific = 'PT'
  let india = 'IST'
  let gmt = 'GMT'
  let yesterday = '1969-12-31'
  let today = '1970-01-01'
  let tomorrow = '1970-01-02'

  context('over yesterday and today', () => {
    let time = DateTime.utc(1970, 1, 1, 0, 0)

    it('defaults to displaying time for Pacific, India, and GMT', () => {
      expect(timeFormattedToMultipleZones(time)).to.contain(pacific, india, gmt)
    })

    it('has the days the time occured in', () => {
      expect(timeFormattedToMultipleZones(time)).to.contain(today, yesterday)
    })

    it('groups times by day', () => {
      let expected = '1969-12-31 16:00:00 PT; 1970-01-01 05:30:00 IST, 00:00:00 GMT'

      expect(timeFormattedToMultipleZones(time)).to.eql(expected)
    })
  })

  context('In a single day', () => {
    let time = DateTime.utc(1970, 1, 1, 0, 0).plus({ hours: 8 })

    it('defaults to displaying time for Pacific, India, and GMT', () => {
      expect(timeFormattedToMultipleZones(time)).to.contain(pacific, india, gmt)
    })

    it('has only the ay the time occured in', () => {
      expect(timeFormattedToMultipleZones(time)).to.contain(today)
      expect(timeFormattedToMultipleZones(time)).to.not.contain(yesterday, tomorrow)
    })

    it('groups times by day', () => {
      let expected = '1970-01-01 00:00:00 PT, 13:30:00 IST, 08:00:00 GMT'

      expect(timeFormattedToMultipleZones(time)).to.eql(expected)
    })
  })

  context('over today and tomorrow', () => {
    let time = DateTime.utc(1970, 1, 1, 0, 0).plus({ hours: 18, minutes: 30 })

    it('defaults to displaying time for Pacific, India, and GMT', () => {
      expect(timeFormattedToMultipleZones(time)).to.contain(pacific, india, gmt)
    })

    it('has the days the time occured in', () => {
      expect(timeFormattedToMultipleZones(time)).to.contain(today, tomorrow)
    })

    it('groups times by day', () => {
      let expected = '1970-01-01 10:30:00 PT, 18:30:00 GMT; 1970-01-02 00:00:00 IST'

      expect(timeFormattedToMultipleZones(time)).to.eql(expected)
    })
  })
})
