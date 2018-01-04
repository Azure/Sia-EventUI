'use strict'
import { expect } from 'chai'
import createComponent from '../../helpers/shallowRenderHelper'
import ErrorMessage from '../../../src/components/elements/ErrorMessage'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
import { RetryButton } from '../../../src/components/elements/Buttons'

describe('ErrorMessage', function () {
    it('Should render an ErrorIcon icon and a span with the given message when called with just a message', function () {
        const testObject = ErrorMessage('TestMessage')

        expect(testObject.type).to.equal('div')
        expect(testObject.props.children[0].type).to.equal(ErrorIcon)
        expect(testObject.props.children[1].type).to.equal('span')
        expect(testObject.props.children[1].props.children).to.equal('TestMessage')
        expect(testObject.props.children[2]).to.be.null
    })

    it('Should additionally render a retry button when provided an action for retry', function () {
        const testObject = ErrorMessage('TestMessage', 'TestAction')

        expect(testObject.props.children[2].type).to.equal(RetryButton)
        expect(testObject.props.children[2].props.actionForRetry).to.equal('TestAction')
    })
})