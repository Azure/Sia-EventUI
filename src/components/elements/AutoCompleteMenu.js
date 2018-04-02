import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

const dataSourceConfig = (textInput, valueInput) => ({
  text: textInput,
  value: valueInput
})

export const AutoCompleteMenu = ({
  label,
  dataConfigText,
  dataConfigValue,
  dataSource,
  searchText,
  onUpdateInput,
  selectMethod,
  clearMethod
}) => <AutoComplete
  floatingLabelText={label}
  filter={AutoComplete.caseInsensitiveFilter}
  dataSource={[...dataSource].sort(
    (a, b) => (a[dataConfigText] < b[dataConfigText])
      ? -1
      : (a[dataConfigText] > b[dataConfigText])
        ? 1
        : 0
  )}
  searchText={searchText}
  onUpdateInput={(searchInput) => onUpdateInput(searchInput)}
  onNewRequest={(selectedItem) => onNewRequest(dataSource, selectMethod, clearMethod)(selectedItem)}
  dataSourceConfig={dataSourceConfig(dataConfigText, dataConfigValue)}
/>

export const onNewRequest = (dataSource, selectMethod, clearMethod) => (input) => {
  if (dataSource.length === 0 || input.length === 0) {
    clearMethod()
    return
  }

  let inputResult = input.name ? input.name.toLowerCase() : input.trim().toLowerCase()
  let possibleSelections = 0
  let possibleItems = []

  for (let i = 0; i < dataSource.length; i++) {
    const menuItem = dataSource[i] && dataSource[i].name ? dataSource[i].name.toLowerCase() : null
    if (inputResult === menuItem) {
      clearMethod()
      selectMethod(dataSource[i])
      return
    }
    if (menuItem && menuItem.indexOf(inputResult) > -1) {
      possibleSelections += 1
      possibleItems.push(dataSource[i])

      if (possibleSelections > 1) {
        clearMethod()
        return
      }
    }
  }
  clearMethod()
  if (possibleSelections === 0) { return }
  selectMethod(possibleItems[0])
}

export default AutoCompleteMenu
