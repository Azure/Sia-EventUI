'use strict'
import { expect } from 'chai'

import * as signalRActions from 'actions/signalRActions'
import * as signalRService from 'services/signalRService'

import { GetMockDispatch, GetDispatchRecorder } from 'test/helpers/mockDispatch'

describe('signalR Actions', function (){
  describe('updateEventFilterPreference', function () {
    context('when passed filterType "sync"', function () {
      const signalRSpy = signalRService.getEchoConnectionForTesting()
      const dispatchSpy = GetDispatchRecorder()

      const result = signalRActions.updateEventFilterPreference(signalRActions.filterTypes.sync.value, 'testEventFilter')(GetMockDispatch(dispatchSpy))

      it('should call signalRService.updateEventFilter passing the given eventFilter', function () {
        expect(signalRSpy[0][0]).to.equal('updateFilter')
        expect(signalRSpy[0][1]).to.equal('testEventFilter')
      })

      it('should dispatch the update event', function () {
        expect(dispatchSpy.action.type).to.equal(signalRActions.UPDATE_FILTER_PREFERENCE_EVENTS)
        expect(dispatchSpy.action.filterType).to.equal(signalRActions.filterTypes.sync.value)
      })
    })

    context('when passed filterType "none"', function () {
      const signalRSpy = signalRService.getEchoConnectionForTesting()
      const dispatchSpy = GetDispatchRecorder()

      const result = signalRActions.updateEventFilterPreference(signalRActions.filterTypes.none.value, 'testEventFilter')(GetMockDispatch(dispatchSpy))

      it('should call signalRService.clearEventFilter', function () {
        expect(signalRSpy[0][0]).to.equal('clearFilter')
      })

      it('should dispatch the update event', function () {
        expect(dispatchSpy.action.type).to.equal(signalRActions.UPDATE_FILTER_PREFERENCE_EVENTS)
        expect(dispatchSpy.action.filterType).to.equal(signalRActions.filterTypes.none.value)
      })
    })
  })
})