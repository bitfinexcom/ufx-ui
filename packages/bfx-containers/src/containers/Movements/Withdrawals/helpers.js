export const SET_FORM_FIELD_ACTION = 'set'

export const withdrawalFormReducer = (state, action) => {
  switch (action.type) {
    case SET_FORM_FIELD_ACTION: {
      const { field, value } = action.payload
      return {
        ...state,
        [field]: value,
      }
    }
    default:
      throw new Error()
  }
}

export const removeWhitespace = (string) => string.replace(/\s/g, '')
