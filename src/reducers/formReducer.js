import * as formActions from '../actions/formActions'

const defaultForms = {}

const updateInput = (state, form, field, value = null) => {
    var newState = {...state}
    const oldForm = state[form]
    var newForm =  {...oldForm}

    newForm[field] = value
    newState[form] = newForm
    return newState
}

const clearInput = (state, form, field) => updateInput(state, form, field)

const clearForm = (state, form) => {
    var newState = {...state}
    newState[form] = null
    return newState
}

export const reducer = (state = defaultForms, action) => {
    switch(action.type) {
        case formActions.UPDATE_INPUT:
            return updateInput(state, action.form, action.field, action.value)
        case formActions.CLEAR_INPUT:
            return clearInput(state, action.form, action.field)
        case formActions.CLEAR_FORM:
            return clearForm(state, action.form)
        default:
            return state
    }
}

export default reducer