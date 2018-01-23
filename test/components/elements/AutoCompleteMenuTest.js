'use strict'
import { expect } from 'chai'
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
        describe('when given valid input and a valid data source', function() {
            const dataSource = [{ name: 'Kermit' }, { name: 'Fozzie' }]
            const selectMethod = (input) => input
            const clearMethod = () => console.log('')

            const input = 'k'

            const result = onNewRequest(dataSource, selectMethod, clearMethod)(input)

            it('should return the right item from the data source', function() {
                expect(result.name).to.equal('Kermit')
            })
        })

        describe('when the input entered is in more than one item in the data source', function() {
            const dataSource = [{ name: 'Kermit' }, { name: 'Fozzie' }, {name: 'Fonzie'}]
            const selectMethod = (input) => input
            const clearMethod = () => console.log('')
            const input = 'fo'

            const result = onNewRequest(dataSource, selectMethod, clearMethod)(input)

            it('it should return', function () {
                expect(result).to.be.undefined
            })
        })

        describe('when the input entered is not in the data source', function () {
            const dataSource = [{ name: 'Kermit' }, { name: 'Fozzie' }]
            const selectMethod = function(input) {return input}
            const clearMethod = () => console.log('')
            const input = 'l'

            const result = onNewRequest(dataSource, selectMethod, clearMethod)(input)

            it('it should return', function () {
                expect(result).to.be.undefined
            })
        })

        describe('when the data source is not valid', function () {
            const dataSource = []
            const selectMethod = (input) => input
            const clearMethod = () => console.log('')
            const input = 'l'

            const result = onNewRequest(dataSource, selectMethod, clearMethod)(input)

            it('it should return', function () {
                expect(result).to.be.undefined
            })
        })
    })
})
