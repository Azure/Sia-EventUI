'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from 'test/helpers/shallowRenderHelper'
import Debug from 'components/Debug'
import FlatButtonStyled from 'components/elements/FlatButtonStyled'

const setup = (props) => createComponent(Debug, props)

const initialState = ({
  authContext: null
})

describe('Debug', function test () {
  beforeEach(() => {
    this.singleState = setup(initialState)
  })

  it('Should render a div with a child flatbutton', () => {
    expect(this.singleState.type).to.equal('div')
    expect(this.singleState.props.children.type).to.equal(FlatButtonStyled)
  })
})
