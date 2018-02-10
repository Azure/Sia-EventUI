'use strict'
import { expect } from 'chai'
import { DateTime } from 'luxon';
import timeFormattedToMultipleZones from 'helpers/timeFormattedToMultipleZones'


describe.only('timeFormattedToMultipleZones', function test () {
  let time = DateTime.utc(1970, 1, 1, 0, 0)
  let yesterday = '1969-12-31'
  let today = '1970-1-1'
  let pacific = '16:00:00 PT'
  let india = '05:30:00 IST'
  let gmt = '00:00:00 GMT'

  it('defaults to displaying time for Pacific, India, and GMT', () => {
    expect(timeFormattedToMultipleZones(time)).to.contain(pacific, india, gmt)
  })

  it('has both days the time occured in', () => {
    expect(timeFormattedToMultipleZones(time)).to.contain(yesterday, today)
  })

  it('groups times by day', () => {
    let expected = '1969-12-31 16:00:00 PT; 1970-1-1 05:30:00 IST, 00:00:00 GMT'

    expect(timeFormattedToMultipleZones(time)).to.eql(expected)
  })
})
