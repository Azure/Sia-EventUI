'use strict'
import { expect } from 'chai'
import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

import createComponent from '../../helpers/shallowRenderHelper'
import AutoCompleteMenu from '../../../src/components/elements/AutoCompleteMenu'
import AddMockDispatch from '../../helpers/mockDispatch'

const mockProps = {
    label: 'testLabel',
    dataConfigText: 'textInput',
    dataConfigValue: 'valueInput',
    menuOptions: ['TEST1', 'TEST2'],
    searchText: '',
    onUpdateInput: () => null,
    onNewRequest: () => 42
}

const setup = (mockProps) => {

    return createComponent(AutoCompleteMenu, mockProps)
}

describe('AutoCompleteMenu', function() {
    describe('when it receives all required information', function() {

        beforeEach(function() {
            this.output = setup(mockProps)
        })
        
        it('should return a div', function() {
            expect(this.output.type).to.equal('div')
        })

        it('the div should contain an AutoComplete', function () {
            expect(this.output.props.children.type).to.equal(AutoComplete)
        })

        it('the Autocomplete should have the label we passed in', function() {
            expect(this.output.props.children.props.floatingLabelText).to.equal(mockProps.label)
        })

        it('the Autocomplete should have the searchText we passed in', function () {
            expect(this.output.props.children.props.searchText).to.equal(mockProps.searchText)
        })

        it('the Autocomplete should have the menuOptions we passed in', function () {
            expect(this.output.props.children.props.dataSource).to.equal(mockProps.menuOptions)
        })

        it('the Autocomplete should a data config object using info we passed in', function () {
            expect(this.output.props.children.props.dataSourceConfig).to.deep.equal({text: mockProps.dataConfigText, value: mockProps.dataConfigValue})
        })

        it('the Autocomplete should have an onUpdateInput fx just like the fx we passed in', function () {
            expect(this.output.props.children.props.onUpdateInput()).to.equal(mockProps.onUpdateInput())
        })

        it('the Autocomplete should have an onNewRequest fx just like the fx we passed in', function () {
            expect(this.output.props.children.props.onNewRequest()).to.equal(mockProps.onNewRequest())
        })
    })
})
