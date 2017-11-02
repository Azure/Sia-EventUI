'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from '../helpers/shallowRenderHelper'
import {RetryButton} from '../../src/components/Buttons'
import FlatButtonStyled from '../../src/components/elements/FlatButtonStyled'
const setup = (props, children) => createComponent(RetryButton, props, children)

const dummyState = ({
    actionForRetry: null,
    dispatch: null
})

describe('Retry Button', function test () {
    beforeEach(() =>{
        this.singleState = setup(dummyState, null)
    })

    it('Should render a FlatButtonStyled with a Retry label', () => {
        expect(this.singleState.type).to.equal(FlatButtonStyled)
        expect(this.singleState.props.label).to.equal('Retry')
    })
})