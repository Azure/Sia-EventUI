'use strict'
import { expect } from 'chai'
import React from 'react'
import createComponent from 'test/helpers/shallowRenderHelper'
import { LoginError, mapStateToProps } from 'components/Auth/LoginError'

function setup () {
  let props = {
    error: 'Test Error'
  }

  return createComponent(LoginError, props)
}

describe('LoginError', function test () {
  beforeEach(() => {
    this.output = setup()
  })

  it('Should render a div with error message', () => {
    expect(this.output.type).to.equal('div')
  })
})

const inputState = {
  auth: {
    error: 'Test Error'
  }
}

const expectedResult = {
  error: 'Test Error'
}

describe('LoginErrorMapStateToProps', function test () {
  it('Should correctly generate an args object from state', () => {
    const result = mapStateToProps(inputState)

    expect(result.error).to.equal(expectedResult.error)
  })
})
