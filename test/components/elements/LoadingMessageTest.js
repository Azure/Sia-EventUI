'use strict'
import { expect } from 'chai'
import createComponent from 'test/helpers/shallowRenderHelper'
import LoadingMessage from 'components/elements/LoadingMessage'
import CircularProgress from 'material-ui/CircularProgress'
import { RetryButton } from 'components/elements/Buttons'

describe('LoadingMessage', function () {
  it('Should render a CircularProgress icon and a span with the given message when called with just a message', function () {
    const testObject = LoadingMessage('TestMessage')

    expect(testObject.type).to.equal('div')
    expect(testObject.props.children[0].type).to.equal(CircularProgress)
    expect(testObject.props.children[1].type).to.equal('span')
    expect(testObject.props.children[1].props.children).to.equal('TestMessage')
    expect(testObject.props.children[2]).to.be.null
  })

  it('Should additionally render a retry button when provided an action for retry', function () {
    const testObject = LoadingMessage('TestMessage', 'TestAction')

    expect(testObject.props.children[2].type).to.equal(RetryButton)
    expect(testObject.props.children[2].props.actionForRetry).to.equal('TestAction')
  })
})
