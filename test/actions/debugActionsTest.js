'use strict'
import { expect } from 'chai'
import * as debugActions from 'actions/debugActions'

describe('Debug Actions', function () {
  describe('rawHttpResponse', function() {
    const mockResponse = {
      bodyUsed: 'expectedBodyUsed',
      ok: 'expectedOk',
      redirected: 'expectedRedirected',
      status: 'expectedStatus',
      statusText: 'expectedStatusText',
      type: 'expectedResponseType',
      url: 'expectedUrl',
      mockUnusedField: '!!!expect undefined, not this!!!'
    }

    const mockResult = debugActions.rawHttpResponse(mockResponse)
    const nullResult = debugActions.rawHttpResponse(null)
    const undefinedResult = debugActions.rawHttpResponse(undefined)

    context('When passed a null or undefined response object', function () {
      it('Should return an object with a null response', function () {
        expect(nullResult.response).to.be.null
        expect(undefinedResult.response).to.be.null
      })
    })

    context('When passed a valid response object', function () {
      it('Should copy a specific subset of the object property values to the result.response object', function () {
        expect(mockResult.response.bodyUsed).to.equal(mockResponse.bodyUsed)
        expect(mockResult.response.ok).to.equal(mockResponse.ok)
        expect(mockResult.response.redirected).to.equal(mockResponse.redirected)
        expect(mockResult.response.status).to.equal(mockResponse.status)
        expect(mockResult.response.statusText).to.equal(mockResponse.statusText)
        expect(mockResult.response.type).to.equal(mockResponse.type)
        expect(mockResult.response.url).to.equal(mockResponse.url)

        expect(mockResult.response.mockUnusedField).to.be.undefined
      })

      it('Should not return the passed in object as its response property', function () {
        expect(mockResult.response == mockResponse).to.be.false
      })
    })

    context('Whenever the function is called', function () {
      it('Should return an object with a type property equal to RAW_HTTP_RESPONSE', function () {
        expect(nullResult.type).to.equal(debugActions.RAW_HTTP_RESPONSE)
        expect(undefinedResult.type).to.equal(debugActions.RAW_HTTP_RESPONSE)
        expect(mockResult.type).to.equal(debugActions.RAW_HTTP_RESPONSE)
      })
    })
  })

  describe('jsonResult', function () {
    const mock = {}
    const result = debugActions.jsonResult(mock)
    context('The returned object', function () {
      it('Should have type debugActions.JSON_RESULT', function () {
        expect(result.type).to.equal(debugActions.JSON_RESULT)
      })

      it('Should have json with value the same as the passed in object', function () {
        expect(result.json == mock).to.be.true
      })
    })
  })
})
