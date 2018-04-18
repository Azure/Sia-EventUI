'use strict'
import { expect } from 'chai'
import { DateTime } from 'luxon'

import createComponent from 'test/helpers/shallowRenderHelper'

import ErrorMessage from 'components/elements/ErrorMessage'
import { Card, CardHeader } from 'material-ui/Card'
import ErrorIcon from 'material-ui/svg-icons/alert/error'
import { RetryButton } from 'components/elements/Buttons'

describe('ErrorMessage', function () {
  context('when inputs are valid', function () {
    describe('when given only a message', function () {
      const testObject = createComponent(ErrorMessage, {message: 'TestMessage'})

      it('Should render a Card with an ErrorIcon icon and a CardHeader with the given message', function () {
        expect(testObject.type).to.equal(Card)
        expect(testObject.props.children[0].type).to.equal(ErrorIcon)
        expect(testObject.props.children[1].type).to.equal(CardHeader)
        expect(testObject.props.children[1].props.title).to.equal('TestMessage')
      })

      it('should render a card with a CardHeader with an empty subtitle', function () {
        expect(testObject.props.children[1].props.subtitle).to.be.empty
      })
    })

    describe('when given a message and provided an action for retry', function () {
      const testObject = createComponent(ErrorMessage, {message: 'TestMessage', actionForRetry: 'TestAction'})

      it('Should additionally render a retry button', function () {
        expect(testObject.props.children[2].type).to.equal(RetryButton)
        expect(testObject.props.children[2].props.actionForRetry).to.equal('TestAction')
      })
    })

    describe('when given a time', function () {
      const testTime = DateTime.utc()
      const testObject = createComponent(ErrorMessage, {time: testTime})

      it('should render a card with a CardHeader with the given time as a subtitle', function () {
        expect(testObject.props.children[1].props.subtitle).to.equal(testTime.toLocal().toFormat(DateTime.TIME_WITH_SECONDS))
      })
    })

    describe('when given a background color', function () {
      const backgroundColor = 'Purple'
      const testObject = createComponent(ErrorMessage, {backgroundColor})

      it('should render a card styled with that background color', function () {
        expect(testObject.props.style).to.deep.equal({ backgroundColor: 'Purple' })
      })
    })
  })

  context('when inputs are not valid', function () {
    describe('when time is undefined', function () {
      const testTime = undefined
      const testObject = createComponent(ErrorMessage, {time: testTime})

      it('should return an empty subtitle', function () {
        expect(testObject.props.children[1].props.subtitle).to.be.empty
      })
    })

    describe('when time is null', function () {
      const testTime = undefined
      const testObject = createComponent(ErrorMessage, {time: testTime})

      it('should return an empty subtitle', function () {
        expect(testObject.props.children[1].props.subtitle).to.be.empty
      })
    })
  })

})
