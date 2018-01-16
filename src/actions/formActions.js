
export const UPDATE_INPUT = 'UPDATE_INPUT'
export const CLEAR_INPUT = 'CLEAR_INPUT'
export const CLEAR_FORM = 'CLEAR_FORM'

export const updateInput = (form, field, value) => ({
  type: UPDATE_INPUT,
  form,
  field,
  value
})

export const clearInput = (form, field) => ({
  type: CLEAR_INPUT,
  form,
  field
})

export const clearForm = (form) => ({
  type: CLEAR_FORM,
  form
})
