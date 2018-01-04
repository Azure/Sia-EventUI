import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import * as formActions from '../../actions/formActions'
import * as filterActions from '../../actions/filterActions'

const dataSourceConfig = {
    text: 'name',
    value: 'id'
}

const AutoCompleteMenu = ({dispatch, history, label, menuOptions, filter, filterSearchField, menuFilterSearchForm}) => {
    let filterSearchForm = menuFilterSearchForm
    return filter? (
        <div>
            <AutoComplete
                floatingLabelText={label}
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={menuOptions}
                searchText={filterSearchField}
                onUpdateInput={(searchText) => dispatch(formActions.updateInput(filterSearchForm.name, filterSearchForm.field, searchText))}
                onNewRequest={
                    (eventType) => {
                        dispatch(filterActions.addFilter(history)(filter, eventType))
                        dispatch(formActions.clearInput(filterSearchForm.name, filterSearchForm.field))
                    }
                }
                dataSourceConfig={dataSourceConfig}
            />
        </div>
    )
    : (
        <div></div>
    )
}
export default AutoCompleteMenu
