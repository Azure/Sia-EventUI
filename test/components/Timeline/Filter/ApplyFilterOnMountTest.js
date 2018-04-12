'use strict'
import { expect } from 'chai'

import createComponent from 'test/helpers/shallowRenderHelper'
import { GetMockDispatch, GetDispatchRecorder } from 'test/helpers/mockDispatch'

import { ApplyFilterOnMount, mapStateToApplyFilterProps } from 'components/Timeline/Filter/ApplyFilterOnMount'
import { applyFilter } from 'actions/filterActions'

describe('Apply Filter On Mount', function () {
  describe('Component', function () {
    const getMockInput = (mockDispatchRecorder, style) => ({
      filters: {name: 'MockFilters', incidentId: 1},
      filterPreference: 'MockFilterPreference',
      history: {value: 'MockHistory'},
      incidentId: 10,
      dispatch: GetMockDispatch(mockDispatchRecorder),
      applyFilter: () => ({
        type: 'MOCK_APPLY_FILTER'
      }),
      children: 'MockChildren',
      style
    })
    describe('Render Output', function () {
      context('When style is provided', function () {
        const recorder = GetDispatchRecorder()
        const expectedStyle =  { key: 'value'}
        const result = createComponent(ApplyFilterOnMount, getMockInput(recorder, expectedStyle))
        it('Should be a div', function () {
          expect(result.type).to.equal('div')
        })

        it('Should have the provided style', function () {
          expect(result.props.style).to.equal(expectedStyle)
        })

        it('Should contain children', function () {
          expect(result.props.children).to.equal('MockChildren')
        })
      })

      context('When style is not provided', function () {
        const recorder = GetDispatchRecorder()
        const result = createComponent(ApplyFilterOnMount, getMockInput(recorder))
        it('Should output a div', function () {
          expect(result.type).to.equal('div')
        })

        it('Should have no style', function () {
          expect(result.props.style).to.be.undefined
        })

        it('Should contain children', function () {
          expect(result.props.children).to.equal('MockChildren')
        })
      })
    })

    describe('ComponentDidMount', function () {
      const recorder = GetDispatchRecorder()
      ApplyFilterOnMount.prototype.componentDidMount.bind({props:getMockInput(recorder)})()

      it('Should dispatch the passed in apply filter method', function () {
        expect(recorder.action.type).to.equal('MOCK_APPLY_FILTER')
      })
    })

    describe('ComponentDidUpdate', function () {
      context('When oldProps incidentId matches passed in incidentId', function () {
        const recorder = GetDispatchRecorder()
        const input = getMockInput(recorder)
        ApplyFilterOnMount.prototype.componentDidUpdate.bind({props:input})(input)

        it('Should not dispatch', function () {
          expect(recorder.action).to.be.undefined
        })
      })

      context('When oldProps incidentId does not match passed in incidentId', function () {
        const oldProps = {incidentId: 10000000}
        const recorder = GetDispatchRecorder()
        ApplyFilterOnMount.prototype.componentDidUpdate.bind({props:getMockInput(recorder)})(oldProps)

        it('Should dispatch the passed in apply filter method', function () {
          expect(recorder.action.type).to.equal('MOCK_APPLY_FILTER')
        })
      })
    })
  })

  describe('mapStateToApplyFilterProps', function () {
    const mockState = {
      events: {
        filter: 'expectedFilter'
      },
      signalR: {
        filterPreferences: {
          eventFilterType: 'expectedEventFilterType'
        }
      }
    }
    const testOwnProps = {
      style: 'mockStyle'
    }
    const result = mapStateToApplyFilterProps(mockState, testOwnProps)

    it('Should return filter from state', function () {
      expect(result.filter).to.equal('expectedFilter')
    })

    it('Should return filterPreference from state', function () {
      expect(result.filterPreference).to.equal('expectedEventFilterType')
    })

    it('Should return applyFilter from imports', function () {
      expect(result.applyFilter).to.equal(applyFilter)
    })

    it('Should pass forward ownProps (including style)', function () {
      expect(result.style).to.equal('mockStyle')
    })
  })
})