'use strict'
import { expect } from 'chai'
import React from 'react'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import { DateTime } from 'luxon'

import createComponent from 'test/helpers/shallowRenderHelper'
import { GetMockDispatch, GetDispatchRecorder } from 'test/helpers/mockDispatch'

import { TimeAndDatePicker, mapStateToProps } from 'components/Timeline/Filter/TimePicker'
import * as filterActions from 'actions/filterActions'

describe('TimePicker', function () {
  describe('TimeAndDatePicker Component', function () {
    const getInput = (mockDispatchRecorder) => ({
      filters: {
        startTime: '2018-01-01T12:00:00Z',
        endTime: '2018-01-02T12:00:00Z'
      },
      updateFilterStartDate: () => ({
        type: 'MOCK_UFSD'
      }),
      updateFilterStartTime: () => ({
        type: 'MOCK_UFST'
      }),
      updateFilterEndDate: () => ({
        type: 'MOCK_UFED'
      }),
      updateFilterEndTime: () => ({
        type: 'MOCK_UFET'
      }),
      dispatch: GetMockDispatch(mockDispatchRecorder)
    })

    describe('render output', function () {
      const recorder = GetDispatchRecorder()
      const result = createComponent(TimeAndDatePicker, getInput(recorder))

      it('Should be a div', function () {
        expect(result.type).to.equal('div')
      })

      const timeDisplayOptions = {
        suppressMilliseconds: true,
        includeOffset: false
      }

      describe('StartDatePicker', function () {
        const childUnderTest = result.props.children[0]
        it('Should be a DatePicker', function () {
          expect(childUnderTest.type).to.equal(DatePicker)
        })

        it('Should get value from filters.startTime', function () {
          expect(DateTime.fromJSDate(childUnderTest.props.value).toUTC().toISO(timeDisplayOptions)).to.equal('2018-01-01T12:00:00')
        })

        it('Should have hint text indicating a start date should be selected', function () {
          expect(childUnderTest.props.hintText).to.equal('Select a start date')
        })

        it('Should dispatch updateFilterStartDate', function () {
          childUnderTest.props.onChange(null, DateTime.fromISO('2018-01-01T12:00:00Z').toJSDate())
          expect(recorder.action.type).to.equal('MOCK_UFSD')
        })
      })

      describe('StartTimePicker', function () {
        const childUnderTest = result.props.children[1]
        it('Should be a TimePicker', function () {
          expect(childUnderTest.type).to.equal(TimePicker)
        })

        it('Should get value from filters.startTime', function () {
          expect(DateTime.fromJSDate(childUnderTest.props.value).toUTC().toISO(timeDisplayOptions)).to.equal('2018-01-01T12:00:00')
        })

        it('Should have hint text indicating a start time should be selected', function () {
          expect(childUnderTest.props.hintText).to.equal('Select a start time')
        })

        it('Should dispatch updateFilterStartTime', function () {
          childUnderTest.props.onChange(null, DateTime.fromISO('2018-01-01T12:00:00Z').toJSDate())
          expect(recorder.action[1].type).to.equal('MOCK_UFST')
        })
      })

      describe('EndDatePicker', function () {
        const childUnderTest = result.props.children[2]
        it('Should be a DatePicker', function () {
          expect(childUnderTest.type).to.equal(DatePicker)
        })

        it('Should get value from filters.endTime', function () {
          expect(DateTime.fromJSDate(childUnderTest.props.value).toUTC().toISO(timeDisplayOptions)).to.equal('2018-01-02T12:00:00')
        })

        it('Should have hint text indicating an end date should be selected', function () {
          expect(childUnderTest.props.hintText).to.equal('Select an end date')
        })

        it('Should dispatch updateFilterEndDate', function () {
          childUnderTest.props.onChange(null, DateTime.fromISO('2018-01-01T12:00:00Z').toJSDate())
          expect(recorder.action[2].type).to.equal('MOCK_UFED')
        })
      })

      describe('EndTimePicker', function () {
        const childUnderTest = result.props.children[3]
        it('Should be a TimePicker', function () {
          expect(childUnderTest.type).to.equal(TimePicker)
        })

        it('Should get value from filters.endTime', function () {
          expect(DateTime.fromJSDate(childUnderTest.props.value).toUTC().toISO(timeDisplayOptions)).to.equal('2018-01-02T12:00:00')
        })

        it('Should have hint text indicating an end time should be selected', function () {
          expect(childUnderTest.props.hintText).to.equal('Select an end time')
        })

        it('Should dispatch updateFilterEndTime', function () {
          childUnderTest.props.onChange(null, DateTime.fromISO('2018-01-01T12:00:00Z').toJSDate())
          expect(recorder.action[3].type).to.equal('MOCK_UFET')
        })
      })
    })
  })

  describe('mapStateToProps', function () {
    const mockState = {
      events: {
        filter: 'mockFilter'
      }
    }
    const result = mapStateToProps(mockState)

    it('Should return filters based on state', function () {
      expect(result.filters).to.equal('mockFilter')
    })

    it('Should return updateFilterStartDate based on input', function () {
      expect(result.updateFilterStartDate).to.equal(filterActions.updateFilterStartDate)
    })

    it('Should return updateFilterStartTime based on input', function () {
      expect(result.updateFilterStartTime).to.equal(filterActions.updateFilterStartTime)
    })

    it('Should return updateFilterEndDate based on input', function () {
      expect(result.updateFilterEndDate).to.equal(filterActions.updateFilterEndDate)
    })

    it('Should return updateFilterEndTime based on input', function () {
      expect(result.updateFilterEndTime).to.equal(filterActions.updateFilterEndTime)
    })
  })
})