'use strict'
import { expect } from 'chai'
import moment from 'moment'
import createComponent from 'test/helpers/shallowRenderHelper'
import ErrorMessage from 'components/elements/ErrorMessage'
import { Card, CardHeader } from 'material-ui/Card'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
import { RetryButton } from 'components/elements/Buttons'

describe('ErrorMessage', function () {
  describe('when given only a message', function() {
    const testObject = ErrorMessage('TestMessage')

    it('Should render a Card with an ErrorIcon icon and a CardHeader with the given message', function () {
      expect(testObject.type).to.equal('div')
      expect(testObject.props.children.type).to.equal(Card)
      expect(testObject.props.children.props.children[0].type).to.equal(ErrorIcon)
      expect(testObject.props.children.props.children[1].type).to.equal(CardHeader)
      expect(testObject.props.children.props.children[1].props.title).to.equal('TestMessage')
    })

    it("should render a card with a CardHeader with the subtitle 'Time unknown!", function () {
      expect(testObject.props.children.props.children[1].props.subtitle).to.equal('Time unknown!')
    })
  })

  describe('when given a message and provided an action for retry', function() {
    const testObject = ErrorMessage('TestMessage', 'TestAction')

    it('Should additionally render a retry button', function () {
      expect(testObject.props.children.props.children[2].type).to.equal(RetryButton)
      expect(testObject.props.children.props.children[2].props.actionForRetry).to.equal('TestAction')
    })
  })

  describe('when given a message, an action, and a time', function () {
    const backgroundColor = 'Purple'
    const testTime = moment()
    const testObject = ErrorMessage('TestMessage', 'TestAction', testTime)

    it('should render a card with a CardHeader with the given time as a subtitle', function () {
      expect(testObject.props.children.props.children[1].props.subtitle).to.equal(testTime.local().format('LTS'))
    })
  })

  describe('when given a message, an action, and a background color', function () {
    const backgroundColor = 'Purple'
    const testObject = ErrorMessage('TestMessage', 'TestAction', null, backgroundColor)

    it('should render a card styled with that background color', function () {
      expect(testObject.props.children.props.style).to.deep.equal({ backgroundColor: 'Purple' })
    })
  })
})
