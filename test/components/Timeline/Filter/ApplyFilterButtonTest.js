'use strict'
import { expect } from 'chai'
import React from 'react'
import { FlatButton } from 'material-ui'

import createComponent from 'test/helpers/shallowRenderHelper'
import { GetMockDispatch, GetDispatchRecorder } from 'test/helpers/mockDispatch'

import { ApplyFilterButton } from 'components/Timeline/Filter/ApplyFilterButton'

describe('ApplyFilterButton', function () {
  describe('Rendered component', function () {
    const mockDispatchRecorder = GetDispatchRecorder()
    const testInput = {
      filter: 'mockFilter',
      filterPreference: 'mockPreference',
      history: 'mockhistory',
      applyFilter: (filter, filterPreference, history) => ({
        type: 'MOCK_APPLY_FILTER'
      }),
      dispatch: GetMockDispatch(mockDispatchRecorder)
    }

    const renderedComponent = createComponent(ApplyFilterButton, testInput)
    it('Should be a FlatButton', function () {
      expect(renderedComponent.type).to.equal(FlatButton)
    })

    it('Should be labeled "ApplyFilter"', function () {
      expect(renderedComponent.props.label).to.equal('ApplyFilter')
    })

    it('Should be primary', function () {
      expect(renderedComponent.props.primary).to.be.true
    })

    describe('On Click Function', function () {
      it('Should dispatch the applyFilter action when called', function () {
        renderedComponent.props.onClick()
        expect(mockDispatchRecorder.action.type).to.equal('MOCK_APPLY_FILTER')
      })
    })
  })
})