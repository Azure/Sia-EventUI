'use strict'
import { expect } from 'chai'
import React from 'react'
import CreateComponent from '../../helpers/shallowRenderHelper'
import { Search, mapStateToProps } from '../../../src/components/Search/Search'
import GetMockStore from '../../helpers/mockReduxStore'

import CreateIncident from '../../../src/components/Search/CreateIncident'
import SearchResults from '../../../src/components/Search/SearchResults'
import FlatButtonStyled from '../../../src/components/elements/FlatButtonStyled'
import AutoComplete from 'material-ui/AutoComplete'

const input = (mockStore) => ({
    dispatch: mockStore.dispatch,
    queryString: 'TestQueryString',
    dataSource: [],
    filteredDataSource: []
})

describe('Search', function test () {
    beforeEach( () => {
        this.mockStore = GetMockStore()

        this.output = CreateComponent(Search, input(this.mockStore))
    })

    it('Should render a div with particular child components', () => {
        expect(this.output.type).to.equal('div')

        expect(this.output.props.children[0].type).to.equal(CreateIncident)
        expect(this.output.props.children[1].type).to.equal(FlatButtonStyled)
        expect(this.output.props.children[2].type).to.equal('br')
        expect(this.output.props.children[3].type).to.equal(AutoComplete)
        expect(this.output.props.children[4].type).to.equal('br')
        expect(this.output.props.children[5].type).to.equal('p')
        expect(this.output.props.children[6].type).to.equal(SearchResults)
    })
})

const testTicketList = {
    1: {
        originId: 1,
        title: 'First test ticket z'
    },
    2: {
        originId: 2,
        title: 'Second test ticket'
    },
    3: {
        originId: 3,
        title: 'Third test ticket z'
    }
}

const noFilterState = {
    tickets: {
        map: testTicketList,
        systems: {1: {id:1}}
    }
}

const withFilterState = {
    tickets: {
        map: testTicketList,
        systems: {1: {id:1}},
        query: 'z'
    }
}


describe('Search mapStateToProps', function test () {
    beforeEach( () => {
        this.noFilterResult = mapStateToProps(noFilterState)
        this.withFilterResult = mapStateToProps(withFilterState)
    })

    it('Should return the full list when no filter is applied', () => {
        expect(this.noFilterResult.filteredDataSource.length).to.equal(this.noFilterResult.dataSource.length)
    })

    it('Should return a filtered list when filter is applied', () => {
        expect(this.withFilterResult.filteredDataSource.length).to.equal(2)
        expect(this.withFilterResult.filteredDataSource.length).to.be.lessThan(this.withFilterResult.dataSource.length)
    })
})