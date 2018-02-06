'use strict'
import { expect } from 'chai'
import moment from 'moment'
import createComponent from 'test/helpers/shallowRenderHelper'
import ErrorMessage from 'components/elements/ErrorMessage'
import { Card, CardHeader } from 'material-ui/Card'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
import { RetryButton } from 'components/elements/Buttons'

describe.only('ErrorMessage', function () {
  context('when inputs are valid', function() {
    describe('when given only a message', function () {
      const testObject = ErrorMessage('TestMessage')

      it('Should render a Card with an ErrorIcon icon and a CardHeader with the given message', function () {
        expect(testObject.type).to.equal('div')
        expect(testObject.props.children.type).to.equal(Card)
        expect(testObject.props.children.props.children[0].type).to.equal(ErrorIcon)
        expect(testObject.props.children.props.children[1].type).to.equal(CardHeader)
        expect(testObject.props.children.props.children[1].props.title).to.equal('TestMessage')
      })

      it('should render a card with a CardHeader with a null subtitle', function () {
        expect(testObject.props.children.props.children[1].props.subtitle).to.be.null
      })
    })

    describe('when given a message and provided an action for retry', function () {
      const testObject = ErrorMessage('TestMessage', 'TestAction')

      it('Should additionally render a retry button', function () {
        expect(testObject.props.children.props.children[2].type).to.equal(RetryButton)
        expect(testObject.props.children.props.children[2].props.actionForRetry).to.equal('TestAction')
      })
    })

    describe('when given a time', function () {
      const backgroundColor = 'Purple'
      const testTime = moment()
      const testObject = ErrorMessage(null, null, testTime)

      it('should render a card with a CardHeader with the given time as a subtitle', function () {
        expect(testObject.props.children.props.children[1].props.subtitle).to.equal(testTime.local().format('LTS'))
      })
    })

    describe('when given a background color', function () {
      const backgroundColor = 'Purple'
      const testObject = ErrorMessage(null, null, null, backgroundColor)

      it('should render a card styled with that background color', function () {
        expect(testObject.props.children.props.style).to.deep.equal({ backgroundColor: 'Purple' })
      })
    })
  })

  context('when inputs are not valid', function() {
    describe('when time is undefined', function() {
      const testTime = undefined
      const testObject = ErrorMessage(null, null, testTime)

      it('should return a null subtitle', function() {
        expect(testObject.props.children.props.children[1].props.subtitle).to.be.null
      })
    })

    describe('when time is null', function () {
      const testTime = undefined
      const testObject = ErrorMessage(null, null, null)

      it('should return a null subtitle', function () {
        expect(testObject.props.children.props.children[1].props.subtitle).to.be.null
      })
    })
  })

})
