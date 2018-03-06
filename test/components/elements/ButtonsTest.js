'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from 'test/helpers/shallowRenderHelper'
import { DisplayRetryButton } from 'components/elements/Buttons'
import FlatButtonStyled from 'components/elements/FlatButtonStyled'
import { GetMockDispatch, GetDispatchRecorder } from 'test/helpers/mockDispatch'

const setup = (props, children) => createComponent(DisplayRetryButton, props, children)

const dummyState = {
  actionForRetry: {
    type: 'ActionForRetry'
  }
}

describe('DisplayRetryButton', function () {
  beforeEach(() => {
    this.mockDispatchRecorder = GetDispatchRecorder()
    this.singleState = setup({ ...dummyState, dispatch: GetMockDispatch(this.mockDispatchRecorder)}, null)
  })

  it('Should render a FlatButtonStyled with a Retry label', () => {
    expect(this.singleState.type).to.equal(FlatButtonStyled)
    expect(this.singleState.props.label).to.equal('Retry')
  })

  it('Should dispatch the action for retry onTouchTap', () => {
    expect(this.mockDispatchRecorder.action).to.be.null

    this.singleState.props.onTouchTap()

    expect(this.mockDispatchRecorder.action.type).to.equal('ActionForRetry')
  })
})
