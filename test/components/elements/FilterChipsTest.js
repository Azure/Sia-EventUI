'use strict'
import { expect } from 'chai'
import React from 'react'
import Chip from 'material-ui/Chip'
import createComponent from 'test/helpers/shallowRenderHelper'
import { FilterChips, mapStateToProps, renderChip, hydrateChip } from 'components/elements/FilterChips'
import AddMockDispatch from 'test/helpers/mockDispatch'

describe('FilterChips', function () {
  describe('mapStateToProps', function () {
    let mockState = {
      records: 1,
      filter: 2
    }

    it('should pass the props through', function () {
      expect(mapStateToProps(mockState, { foo: 'baz' })).to.include({foo: 'baz'})
    })

    it('should retrieve the value of filter based on ownProps.lookupFilterObject', function () {
      expect(mapStateToProps(mockState, { lookupFilterObject: 'filter' }).filter).to.equal(2)
    })

    it('should retrieve the value of records based on ownProps.recordLookup', function () {
      expect(mapStateToProps(mockState, { recordLookup: 'records' }).records).to.equal(1)
    })
  })

  describe('renderChip', function () {
    it('should render a Chip with the correct id as an argument and the correct name as its only child', function () {
      let mockId = 42
      let mockName = 'Douglas'
      let mockFx = () => null

      let result = renderChip(mockId, mockName, mockFx)

      expect(result.type).to.equal(Chip)
      expect(result.props.children).to.equal('Douglas')
      expect(result.props.onRequestDelete).to.be.a('function')
    })
  })

  describe('hydrateChip', function () {
    let mockRecords = {
      1: {name: 'Sue'}
    }

    describe('when passed a valid record id', function () {
      it('should return the name of the record', function () {
        expect(hydrateChip(1, mockRecords).name).to.equal('Sue')
      })
    })

    describe('when passed an invalid record id', function () {
      it('should return unknown as the name of the record', function () {
        expect(hydrateChip(2, mockRecords).name).to.equal('unknown')
      })
    })
  })

  describe('Component', function () {
    context('when state has all required information', function () {
      describe('when given a valid id', function () {
        it('should return an array of Chips with the correct name, id, and fx', function () {
          let mockProps = {
            records: {
              1: { name: 'Sue' }
            },
            filter: { filterItems: [1] },
            onRequestDelete: (filter, id) => id,
            selectSpecificFilter: 'filterItems'
          }

          let result = FilterChips(mockProps)

          expect(result[0].type).to.equal(Chip)
          expect(result[0].props.children).to.equal('Sue')
          expect(result[0].props.onRequestDelete).to.equal(1)
        })
      })

      describe('when given an invalid id', function () {
        it('should return an array of Chips with the correct name, id, and fx', function () {
          let mockProps = {
            records: { 1: { name: 'Sue' } },
            filter: { filterItems: [2] },
            onRequestDelete: (filter, id) => id,
            selectSpecificFilter: 'filterItems'
          }

          let result = FilterChips(mockProps)

          expect(result[0].type).to.equal(Chip)
          expect(result[0].props.children).to.equal('unknown')
          expect(result[0].props.onRequestDelete).to.equal(2)
          expect(result[0].onRequestDelete).to.not.equal(3)
        })
      })
    })

    context('describe when state is missing required information', function () {
      it('should return an empty div', function () {
        let mockProps = {
          records: { 1: { name: 'Sue' } },
          filter: { filterItems: [1] },
          onRequestDelete: (filter, id) => id,
          selectSpecificFilter: 'NOT_filterItems'
        }

        let result = FilterChips(mockProps)

        expect(result.type).to.equal('div')
        expect(result.props.children).to.be.undefined
      })
    })
  })
})
