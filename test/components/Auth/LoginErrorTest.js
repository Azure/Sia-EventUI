'use strict'
import { expect } from 'chai'
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import { LoginError, mapStateToProps } from '../../../src/components/Auth/LoginError'

function setup() {
    let props = {
        error: 'Test Error'
    }

    let renderer = TestUtils.createRenderer()
    renderer.render(<LoginError {...props}/>)
    let output = renderer.getRenderOutput()

    return {
        output,
        renderer
    }
}

describe('LoginError', function test () {
    beforeEach( () => {
        const {output} = setup()
        this.output = output
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
