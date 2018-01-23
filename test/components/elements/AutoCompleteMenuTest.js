'use strict'
import chai from 'chai'
import spies from 'chai-spies'
chai.use(spies)
const expect = chai.expect

import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

import createComponent from '../../helpers/shallowRenderHelper'
import AutoCompleteMenu, { onNewRequest } from '../../../src/components/elements/AutoCompleteMenu'
import AddMockDispatch from '../../helpers/mockDispatch'



const mockProps = {
    label: 'testLabel',
    dataConfigText: 'textInput',
    dataConfigValue: 'valueInput',
    menuOptions: ['TEST1', 'TEST2'],
    searchText: '',
    onUpdateInput: () => null,
    selectMethod: () => 42
}

const setup = (mockProps) => {

    return createComponent(AutoCompleteMenu, mockProps)
}

describe('AutoCompleteMenu', function() {
    describe('testing SPIES', function() {

        it('should spy on our method and let us know it has been called', function() {
            function callback () {
                return 42
              }

              const callbackSpy = chai.spy(callback);

              const result = onNewRequest([], callback, callbackSpy)('peep')
              expect(callbackSpy).to.have.been.called.once;
        })

    })

    describe('Component', function() {
        describe('when it receives all required information', function () {

            beforeEach(function () {
                this.output = setup(mockProps)
            })

            it('should return a div', function () {
                expect(this.output.type).to.equal('div')
            })

            it('the div should contain an AutoComplete', function () {
                expect(this.output.props.children.type).to.equal(AutoComplete)
            })

            it('the Autocomplete should have the label we passed in', function () {
                expect(this.output.props.children.props.floatingLabelText).to.equal(mockProps.label)
            })

            it('the Autocomplete should have the searchText we passed in', function () {
                expect(this.output.props.children.props.searchText).to.equal(mockProps.searchText)
            })

            it('the Autocomplete should have the menuOptions we passed in', function () {
                expect(this.output.props.children.props.dataSource).to.equal(mockProps.dataSource)
            })

            it('the Autocomplete should a data config object using info we passed in', function () {
                expect(this.output.props.children.props.dataSourceConfig).to.deep.equal({ text: mockProps.dataConfigText, value: mockProps.dataConfigValue })
            })

            it('the Autocomplete should have an onUpdateInput fx just like the fx we passed in', function () {
                expect(this.output.props.children.props.onUpdateInput()).to.equal(mockProps.onUpdateInput())
            })
        })

    })

    describe('onNewRequest', function() {
        const selectMethod = (input) => input
        const clearMethod = () => console.log('')

        context('when the input is valid', function() {
            const dataSource = [{ name: 'Kermit' }, { name: 'Fozzie' }]
            const input = 'k'
            const clearSpy = chai.spy(clearMethod)
            const selectSpy = chai.spy(selectMethod)

            const result = onNewRequest(dataSource, selectSpy, clearSpy)(input)

            it('should call the clear method once', function() {
                expect(clearSpy).to.have.been.called.once
            })

            it('should call the select method once', function() {
                expect(selectSpy).to.have.been.called.once
            })

        })

        context('when the input is invalid', function() {
            describe('when the input entered matches more than one item in the data source', function() {
                const dataSource = [{ name: 'Kermit' }, { name: 'Fozzie' }, {name: 'Fonzie'}]
                const input = 'fo'
                const clearSpy = chai.spy(clearMethod)
                const selectSpy = chai.spy(selectMethod)

                const result = onNewRequest(dataSource, selectMethod, clearMethod)(input)

                it('it should return', function () {
                    expect(result).to.be.undefined
                })
            })

            describe('when the input entered is not in the data source', function () {
                const dataSource = [{ name: 'Kermit' }, { name: 'Fozzie' }]
                const input = 'l'
                const clearSpy = chai.spy(clearMethod)
                const selectSpy = chai.spy(selectMethod)

                const result = onNewRequest(dataSource, selectMethod, clearMethod)(input)

                it('it should return', function () {
                    expect(result).to.be.undefined
                })
            })

            describe('when the data source is  empty', function () {
                const dataSource = []
                const input = 'l'
                const clearSpy = chai.spy(clearMethod)
                const selectSpy = chai.spy(selectMethod)

                it('it should return', function () {
                    onNewRequest(dataSource, undefined, clearSpy)(input)

                    expect(clearSpy).to.have.been.called.once
                })
            })
        })

    })
})
