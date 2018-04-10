'use strict'
import { expect } from 'chai'
import React from 'react'

import { GetMockDispatch, GetDispatchRecorder } from 'test/helpers/mockDispatch'

import { sortEvents } from 'components/Timeline/EventFilter'

describe('EventFilter', function () {
  describe('Button actions', function () {
    describe('sortEvents', function () {
      const dispatchRecorder = GetDispatchRecorder()
      const dispatch = GetMockDispatch(dispatchRecorder)

      sortEvents(dispatch)

      describe('dispatched actions', function () {
        it('Should dispatch a sort action first', function () {
          expect(dispatchRecorder.action[0].type).to.equal('SORT_EVENTS')
          expect(dispatchRecorder.action[0].by).to.equal('occurred')
        })

        it('Should dispatch a page change action second to return to the first page', function () {
          expect(dispatchRecorder.action[1].type).to.equal('GOTO_EVENTS_PAGE')
          expect(dispatchRecorder.action[1].page).to.equal(1)
        })
      })
    })
  })
})