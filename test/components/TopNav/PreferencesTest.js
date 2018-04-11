'use strict'
import { expect } from 'chai'
import { RadioButtonGroup } from 'material-ui/RadioButton'

import createComponent from 'test/helpers/shallowRenderHelper'
import { GetMockDispatch, GetDispatchRecorder } from 'test/helpers/mockDispatch'

import {
  EventFilterPreferences,
  mapStateToEventFilterPreferencesProps,
  ConnectedEventFilterPreferences,
  SelectEventFilterPreference,
  Preferences
} from 'components/TopNav/Preferences'

describe('Preferences', function () {
  describe('Preferences functional component', function () {
    const result = createComponent(Preferences, {})

    it('Should be a div', function () {
      expect(result.type).to.equal('div')
    })

    it('Should have a child ConnectedEventFilterPreferences', function () {
      expect(result.props.children.type).to.equal(ConnectedEventFilterPreferences)
    })
  })

  describe('EventFilterPreferences functional component', function () {
    const input = {
      dispatch: () => null,
      currentEventFilterObject: {},
      currentEventFilterPreference: 'mockPreference'
    }
    const result = createComponent(EventFilterPreferences, input)

    it('Should be a div with padding', function () {
      expect(result.type).to.equal('div')
      expect(result.props.style.padding).to.equal('16px')
    })

    it('Should have a child header', function () {
      expect(result.props.children[0].type).to.equal('h3')
    })

    it('Should have a child RadioButtonGroup with an onChange function and the passed in default selection value', function () {
      expect(result.props.children[1].type).to.equal(RadioButtonGroup)
      expect(result.props.children[1].props.onChange).to.be.a('function')
      expect(result.props.children[1].props.defaultSelected).to.equal('mockPreference')
    })
  })

  describe('mapStateToEventFilterPreferencesProps', function () {
    const expectedFilter = {}
    const expectedFilterType = 'mockFilterType'
    const mockState = {
      events: {
        filter: expectedFilter
      },
      signalR: {
        filterPreferences: {
          eventFilterType: expectedFilterType
        }
      }
    }

    const result = mapStateToEventFilterPreferencesProps(mockState)

    it('Should pull the currentEventFilterObject out of state', function () {
      expect(result.currentEventFilterObject).to.equal(expectedFilter)
    })

    it('Should pull the currentEventFilterPreference out of state', function () {
      expect(result.currentEventFilterPreference).to.equal(expectedFilterType)
    })
  })

  describe('SelectEventFilterPreference', function () {
    const dispatchRecorder = GetDispatchRecorder()
    const mockDispatch = GetMockDispatch(dispatchRecorder)

    const inputValue = 'mockValue'

    SelectEventFilterPreference(mockDispatch, null)(null, inputValue)

    it('Should dispatch an updateEventFilterPreference action', function () {
      expect(dispatchRecorder.action.type).to.equal('UPDATE_FILTER_PREFERENCE_EVENTS')
      expect(dispatchRecorder.action.filterType).to.equal(inputValue)
    })
  })
})
