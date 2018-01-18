'use strict'
import { expect } from 'chai'
import { AddEvent, mapStateToPropsAddEvent } from 'components/Timeline/AddEvent'
import RaisedButtonStyled from 'components/elements/RaisedButtonStyled'

describe('AddEvent', function () {
  describe('Functional Component', function () {
    var addEventWithoutInput = AddEvent({})

    it('Should render a div with correct child types', function () {
      expect(addEventWithoutInput.type).to.equal('div')
      expect(addEventWithoutInput.props.children[0].type).to.equal('label')
      expect(addEventWithoutInput.props.children[1].type).to.equal('br')
      expect(addEventWithoutInput.props.children[2].type).to.equal('label')
      expect(addEventWithoutInput.props.children[3].type).to.equal('br')
      expect(addEventWithoutInput.props.children[4].type).to.equal(RaisedButtonStyled)
    })
  })

  describe('mapStateToProps', function () {
    it('Should get incidentId from OwnProps', function () {
      const testOwnProps = { incidentId: 15 }

      expect(mapStateToPropsAddEvent(null, testOwnProps).incidentId).to.equal(15)
    })

    it('Should get eventInput and eventTypeIdInput from state.forms[AddEvents]', function () {
      const testState = {
        forms: {
          AddEvents: {
            eventInput: 'TestEventInput',
            eventTypeIdInput: 'TestEventTypeIdInput'
          }
        }
      }

      expect(mapStateToPropsAddEvent(testState, null).eventInput).to.equal('TestEventInput')
      expect(mapStateToPropsAddEvent(testState, null).eventTypeIdInput).to.equal('TestEventTypeIdInput')
    })
  })
})
