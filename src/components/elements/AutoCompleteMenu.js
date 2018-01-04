import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

const dataSourceConfig = (textInput, valueInput) => ({
    text: textInput,
    value: valueInput
})

const AutoCompleteMenu = ({label, dataConfigText, dataConfigValue, menuOptions, searchText, onUpdateInput, onNewRequest}) => { 
    return (
        <div>
            <AutoComplete
                floatingLabelText={label}
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={menuOptions}
                searchText={searchText}
                onUpdateInput={(searchInput) => onUpdateInput(searchInput)}
                onNewRequest={(selectedItem) => onNewRequest(selectedItem)}
                dataSourceConfig={dataSourceConfig(dataConfigText, dataConfigValue)}
            />
        </div>
    )
}
export default AutoCompleteMenu
