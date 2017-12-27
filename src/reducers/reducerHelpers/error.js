export const buildError = (actions, defaultErrorList = [], getId = action => action.id)  =>
    (state = defaultErrorList, action) => {
        switch(action.type){
            case actions.fail:
                return state.includes(getId(action))
                    ? state
                    : state.concat([getId(action)])
            case actions.try: // fallthrough to the next case
            case actions.succeed:
                return state.includes(getId(action))
                    ? state.filter(id => id !== getId(action))
                    : state
            default:
                return state
        }
    }

export default buildError