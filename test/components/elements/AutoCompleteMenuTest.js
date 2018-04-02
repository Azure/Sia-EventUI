'use strict'
import chai from 'chai'
import spies from 'chai-spies'
chai.use(spies)
const expect = chai.expect

import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

import createComponent from 'test/helpers/shallowRenderHelper'
import { AutoCompleteMenu, onNewRequest } from 'components/elements/AutoCompleteMenu'


const mockProps = {
  label: 'testLabel',
  dataConfigText: 'textInput',
  dataConfigValue: 'valueInput',
  dataSource: [
    {textInput:'TEST1', valueInput: 1},
    {textInput:'TEST2', valueInput: 2},
    {textInput:'A', valueInput: 3}
  ], // Not Alphabetically Ordered
  searchText: '',
  onUpdateInput: () => null,
  selectMethod: () => 42
}

const setup = (mockProps) => {
  return createComponent(AutoCompleteMenu, mockProps)
}

describe('AutoCompleteMenu', function() {
  describe('Component', function() {
    describe('when it receives all required information', function () {
      const result = setup(mockProps)

      it('Should return an autoComplete', function () {
          expect(result.type).to.equal(AutoComplete)
      })

      describe('AutoComplete', function() {
        it('should have the label we passed in', function () {
          expect(result.props.floatingLabelText).to.equal(mockProps.label)
        })

        it('should have the searchText we passed in', function () {
          expect(result.props.searchText).to.equal(mockProps.searchText)
        })

        it('should have a dataSource with the dataSource records we passed in', function () {
          mockProps.dataSource.forEach(
            (expectedOption) => expect(result.props.dataSource).to.include(expectedOption)
          )
        })

        it('Should display the menu options in alphabetical order by text', function () {
          const alphabetizedMenuOptions = [
            {textInput:'A', valueInput: 3},
            {textInput:'TEST1', valueInput: 1},
            {textInput:'TEST2', valueInput: 2}
          ]
          let i = 0
          alphabetizedMenuOptions.forEach(
            (expectedOption) => {
              expect(result.props.dataSource[i]).to.deep.equal(expectedOption)
              i++
            }
          )
        })

        it('should a data config object using info we passed in', function () {
          expect(result.props.dataSourceConfig).to.deep.equal({ text: mockProps.dataConfigText, value: mockProps.dataConfigValue })
        })

        it('should have an onUpdateInput fx just like the fx we passed in', function () {
          expect(result.props.onUpdateInput()).to.equal(mockProps.onUpdateInput())
        })
      })
    })
  })

  describe('onNewRequest', function() {
    const selectMethod = (input) => input
    const clearMethod = () => null

    context('when a clear autocomplete match can be found', function() {
      const dataSource = [{ name: 'Kermit' }, { name: 'Fozzie' }]
      const input = 'k'
      const clearSpy = chai.spy(clearMethod)
      const selectSpy = chai.spy(selectMethod)

      onNewRequest(dataSource, selectSpy, clearSpy)(input)

      it('should call the clear method once', function() {
        expect(clearSpy).to.have.been.called.once
      })

      it('should call the select method once', function() {
        expect(selectSpy).to.have.been.called.once
      })

      describe('when the input has trailing spaces but matches an item in the data source', function() {
        const dataSource = [{ name: 'Kermit' }, { name: 'Fozzie' }]
        const input = 'Kermit   '
        const clearSpy = chai.spy(clearMethod)
        const selectSpy = chai.spy(selectMethod)

        onNewRequest(dataSource, selectSpy, clearSpy)(input)

        it('should call the clear method once', function () {
          expect(clearSpy).to.have.been.called.once
        })

        it('should call the select method once', function () {
          expect(selectSpy).to.have.been.called.once
        })
      })

      describe('when the input is a different case but matches an item in the data source', function () {
        const dataSource = [{ name: 'Kermit' }, { name: 'Fozzie' }]
        const input = 'KERMIT'
        const clearSpy = chai.spy(clearMethod)
        const selectSpy = chai.spy(selectMethod)

        onNewRequest(dataSource, selectSpy, clearSpy)(input)

        it('should call the clear method once', function () {
          expect(clearSpy).to.have.been.called.once
        })

        it('should call the select method once', function () {
          expect(selectSpy).to.have.been.called.once
        })
      })

      describe('when the input exactly matches an item in the data source', function() {
        const dataSource = [{ name: 'Kermit' }, { name: 'Fozzie' }]
        const input = 'Kermit'
        const clearSpy = chai.spy(clearMethod)
        const selectSpy = chai.spy(selectMethod)

        onNewRequest(dataSource, selectSpy, clearSpy)(input)

        it('should call the clear method once', function () {
          expect(clearSpy).to.have.been.called.once
        })

        it('should call the select method once', function () {
          expect(selectSpy).to.have.been.called.once
        })
      })

    })

    context('when a clear autocomplete match cannot be found', function() {
      describe('when the input is an empty string', function () {
        const dataSource = [{ title: 'Kermit' }, { title: 'Fozzie' }]
        const input = ''
        const clearSpy = chai.spy(clearMethod)
        const selectSpy = chai.spy(selectMethod)

        onNewRequest(dataSource, selectSpy, clearSpy)(input)

        it('it should call the clear method once', function () {
          expect(clearSpy).to.have.been.called.once
        })

        it('should not call the select method', function () {
          expect(selectSpy).to.not.have.been.called
        })
      })

      describe('when the input entered matches more than one item in the data source', function() {
        const dataSource = [{ name: 'Kermit' }, { name: 'Fozzie' }, {name: 'Fonzie'}]
        const input = 'fo'
        const clearSpy = chai.spy(clearMethod)
        const selectSpy = chai.spy(selectMethod)

        onNewRequest(dataSource, selectSpy, clearSpy)(input)

        it('should call the clear method once', function () {
          expect(clearSpy).to.have.been.called.once
        })

        it('should not call the select method', function () {
          expect(selectSpy).to.not.have.been.called
        })
      })

      describe('when the input entered is not in the data source', function () {
        const dataSource = [{ name: 'Kermit' }, { name: 'Fozzie' }]
        const input = 'l'
        const clearSpy = chai.spy(clearMethod)
        const selectSpy = chai.spy(selectMethod)

        onNewRequest(dataSource, selectSpy, clearSpy)(input)

        it('should call the clear method once', function () {
          expect(clearSpy).to.have.been.called.once
        })

        it('should not call the select method', function () {
          expect(selectSpy).to.not.have.been.called
        })
      })

      describe('when the data source is empty', function () {
        const dataSource = []
        const input = 'l'
        const clearSpy = chai.spy(clearMethod)
        const selectSpy = chai.spy(selectMethod)

        onNewRequest(dataSource, selectSpy, clearSpy)(input)

        it('it should call the clear method once', function () {
          expect(clearSpy).to.have.been.called.once
        })

        it('should not call the select method', function () {
          expect(selectSpy).to.not.have.been.called
        })
      })

      describe('when the data source objects do not have an id property', function () {
        const dataSource = [{ title: 'Kermit' }, { title: 'Fozzie' }]
        const input = 'k'
        const clearSpy = chai.spy(clearMethod)
        const selectSpy = chai.spy(selectMethod)

        onNewRequest(dataSource, selectSpy, clearSpy)(input)

        it('it should call the clear method once', function () {
          expect(clearSpy).to.have.been.called.once
        })

        it('should not call the select method', function () {
          expect(selectSpy).to.not.have.been.called
        })
      })
    })
  })
})
