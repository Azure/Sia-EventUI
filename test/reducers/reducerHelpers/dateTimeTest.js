'use strict'
import { expect } from 'chai'

import buildDateTimeReducer from 'reducers/reducerHelpers/dateTime'

describe('build dateTimeReducer', function () {
  context('When provided mock initialization', function () {
    const dateTimeReducer = buildDateTimeReducer(
      'mocktime',
      'mockdate',
      'MOCK_TIME_ACTION',
      'MOCK_DATE_ACTION'
    )

    context('From uninitialized state when action does not match timeAction or dateAction', function () {
      const result = dateTimeReducer(undefined, { type: 'IGNORE_ME' })

      it('Should return a string built from the date and time passed during initialization', function () {
        expect(result).to.equal('mockdateTmocktime')
      })
    })

    context('From initialized state', function () {
      const state = '1980-10-01T12:00:00Z'

      describe('When action type matches initialized timeAction', function () {
        const result = dateTimeReducer(state, { type: 'MOCK_TIME_ACTION', time: 'mockTime'})

        it('Should replace the time portion of state with the passed in action.time', function () {
          expect(result).to.equal('1980-10-01TmockTime')
        })
      })

      describe('When action type matches initialized dateAction', function () {
        const result = dateTimeReducer(state, { type: 'MOCK_DATE_ACTION', date: 'mockDate'})

        it('Should replace the time portion of state with the passed in action.time', function () {
          expect(result).to.equal('mockDateT12:00:00Z')
        })
      })

      describe('When action type does not match timeAction or dateAction', function () {
        const result = dateTimeReducer(state, {type:'IGNORE_ME'})

        it('Should return the existing state object', function () {
          expect(result).to.equal(state)
        })
      })
    })
  })
})