'use strict'
import { expect } from 'chai'
import React from 'react'

import createComponent from 'test/helpers/shallowRenderHelper'
import { GetMockDispatch, GetDispatchRecorder } from 'test/helpers/mockDispatch'

import { BootstrapGlobalActions } from 'components/Timeline/Playbook/BootstrapGlobalActions'
import LoadingMessage from 'components/elements/LoadingMessage'

describe('BootStrapGlobalActions Component', function () {
  const mockDispatchRecorder = GetDispatchRecorder()
  const testInput = {
    dispatch: GetMockDispatch(mockDispatchRecorder),
    fetchGlobalActions: () => ({ type: 'MOCK_FETCH_GLOBAL_ACTIONS' })
  }
  const testResult = createComponent(BootstrapGlobalActions, testInput)

  describe('render result', function () {
    it('Should be a LoadingMessage', function () {
      expect(testResult.type).to.equal(LoadingMessage)
    })

    it('Should have message value "Loading incident actions"', function () {
      expect(testResult.props.message).to.equal('Loading incident actions')
    })

    it('Should have an actionForRetry matching props.fetchGlobalActions', function () {
      console.log(testResult.props)
      expect(testResult.props.actionForRetry.type).to.equal('MOCK_FETCH_GLOBAL_ACTIONS')
    })
  })

  describe('componentDidMount', function () {
    it('Should dispatch props.fetchGlobalActions', function () {
      BootstrapGlobalActions.prototype.componentDidMount.bind({props: testInput})()
      expect(mockDispatchRecorder.action.type).to.equal('MOCK_FETCH_GLOBAL_ACTIONS')
    })
  })
})