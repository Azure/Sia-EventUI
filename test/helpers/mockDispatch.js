import { isObject } from "util";


export const AddMockDispatch = (state) => (mockDispatchRecorder) => {
    const dispatch = (action) => isObject(action)
    ? mockDispatchRecorder.action
        ? Array.isArray(mockDispatchRecorder.action)
            ? mockDispatchRecorder.action.push(action)
            : mockDispatchRecorder.action = [mockDispatchRecorder.action, action]
        : mockDispatchRecorder.action = action
    : action(dispatch)
    return {
        ...state,
        dispatch
    }
}

export default AddMockDispatch