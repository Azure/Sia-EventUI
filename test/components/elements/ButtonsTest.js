'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from '../../helpers/shallowRenderHelper'
import { DisplayRetryButton } from '../../../src/components/elements/Buttons'
import FlatButtonStyled from '../../../src/components/elements/FlatButtonStyled'
import AddMockDispatch from '../../helpers/mockDispatch'

const setup = (props, children) => createComponent(DisplayRetryButton, props, children)



const dummyState = AddMockDispatch({
    actionForRetry: {
        type: 'ActionForRetry'
    }
})

describe('DisplayRetryButton', function () {
    beforeEach(() =>{
        this.mockDispatchRecorder = {
            action: null
        }
        this.singleState = setup(dummyState(this.mockDispatchRecorder), null)
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
