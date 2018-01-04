export const buildFetching = (actions, defaultFetchList = [], getId = action => action.id)  =>
     (state = defaultFetchList, action) => {
        switch(action.type){
            case actions.try:
                return state.includes(getId(action))
                    ? state
                    : state.concat([getId(action)])
            case actions.fail: // fallthrough to the next case
            case actions.succeed:
                return state.includes(getId(action))
                    ? state.filter(id => id !== getId(action))
                    : state
            default:
                return state
        }
    }

export default buildFetching
