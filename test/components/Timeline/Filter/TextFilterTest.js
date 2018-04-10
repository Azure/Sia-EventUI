'use strict'
import { expect } from 'chai'
import React from 'react'
import { TextField } from 'material-ui'

import createComponent from 'test/helpers/shallowRenderHelper'
import { GetMockDispatch, GetDispatchRecorder } from 'test/helpers/mockDispatch'

import { TextFilter, mapStateToProps } from 'components/Timeline/Filter/TextFilter'
import { updateDataSearch } from 'actions/filterActions'

describe('TextFilter', function () {
  describe('Component render output', function () {
    context('Always', function () {
      const recorder = GetDispatchRecorder()
      const input = {
        dispatch: GetMockDispatch(recorder),
        updateDataSearch: () => ({
          type: 'MOCK_UPDATE_DATASEARCH'
        })
      }
      const result = createComponent(TextFilter, input)

      it('Should be a TextField', function () {
        expect(result.type).to.equal(TextField)
      })

      it('Should have "Search" as its hint text', function () {
        expect(result.props.hintText).to.equal('Search')
      })

      it('Should have "search-field-value" as its id', function () {
        expect(result.props.id).to.equal('search-field-value')
      })

      it('Should dispatch passed in updateDataSearch action onChange', function () {
        result.props.onChange({target:{value:null}})

        expect(recorder.action.type).to.equal('MOCK_UPDATE_DATASEARCH')
      })
    })

    context('When text has value', function () {
      const recorder = GetDispatchRecorder()
      const input = {
        text: 'textValue',
        dispatch: GetMockDispatch(recorder),
        updateDataSearch: () => ({
          type: 'MOCK_UPDATE_DATASEARCH'
        })
      }
      const result = createComponent(TextFilter, input)

      it('Should have value equal to the passed in text', function () {
        expect(result.props.value).to.equal('textValue')
      })
    })

    context('When text does not have value', function () {
      const recorder = GetDispatchRecorder()
      const input = {
        dispatch: GetMockDispatch(recorder),
        updateDataSearch: () => ({
          type: 'MOCK_UPDATE_DATASEARCH'
        })
      }
      const result = createComponent(TextFilter, input)

      it('Should have an empty string as value', function () {
        expect(result.props.value).to.equal('')
      })
    })
  })

  describe('mapStateToProps', function () {
    const mockState = {
      events: {
        filter: {
          dataSearch: 'mockDataSearch'
        }
      }
    }
    const result = mapStateToProps(mockState)

    it('Should return text based on state', function () {
      expect(result.text).to.equal('mockDataSearch')
    })

    it('Should return updateDataSearch based on import', function () {
      expect(result.updateDataSearch).to.equal(updateDataSearch)
    })
  })
})