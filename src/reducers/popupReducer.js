import * as popupActions from '../actions/popupActions'

const defaultState = null

export const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case popupActions.HIDE_POPUP:
            return null
        case popupActions.SHOW_POPUP:
            return {
                popupName: action.popupName,
                args: action.args
            }
        default:
            return state
    }
}


export default reducer
