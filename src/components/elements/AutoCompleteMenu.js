import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

const dataSourceConfig = (textInput, valueInput) => ({
    text: textInput,
    value: valueInput
})

const AutoCompleteMenu = ({label, dataConfigText, dataConfigValue, dataSource, searchText, onUpdateInput, selectMethod, clearMethod}) => {
    return (
        <div>
            <AutoComplete
                floatingLabelText={label}
                filter={AutoComplete.caseInsensitiveFilter}
                dataSource={dataSource}
                searchText={searchText}
                onUpdateInput={(searchInput) => onUpdateInput(searchInput)}
                onNewRequest={(selectedItem) => onNewRequest(dataSource, selectMethod, clearMethod)(selectedItem)}
                dataSourceConfig={dataSourceConfig(dataConfigText, dataConfigValue)}
            />
        </div>
    )
}

export const onNewRequest = (dataSource, selectMethod, clearMethod) => (input) => {
    const numMenuOptions = dataSource.length
    if (numMenuOptions === 0 || input.length === 0) {
        clearMethod()
        return
    }

    let inputResult = input.name ? input.name.toLowerCase() : input.trim().toLowerCase()
    let possibleSelections = 0
    let possibleItems = []

    for (let i = 0; i < numMenuOptions; i++) {
        const menuItem = dataSource[i] && dataSource[i].name ? dataSource[i].name.toLowerCase() : null
        if (inputResult === menuItem) {
            clearMethod()
            selectMethod(dataSource[i])
        }
        if (menuItem && menuItem.indexOf(inputResult) > -1) {
            possibleSelections += 1
            possibleItems.push(dataSource[i])
        }
    }
    clearMethod()

    if (possibleSelections !== 1) {
        return
    }
    else {
       selectMethod(possibleItems[0])
    }
}

export default AutoCompleteMenu
