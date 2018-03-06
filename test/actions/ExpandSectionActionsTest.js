'use strict'
import { expect } from 'chai'
import * as expandSectionActions from 'actions/expandSectionActions'

describe('Expand Section Actions', function () {
  describe('toggleCollapse', function () {
    context('when passed an elementName, the returned object', function () {
      const expectedElementName = 'testElement'
      const result = expandSectionActions.toggleCollapse(expectedElementName)

      it('Should have type TOGGLE_COLLAPSE', function (){
        expect(result.type).to.equal(expandSectionActions.TOGGLE_COLLAPSE)
      })

      it('Should have property elementName with value equal to the passed in elementName', function (){
        expect(result.elementName == expectedElementName).to.be.true
      })
    })
  })
})
