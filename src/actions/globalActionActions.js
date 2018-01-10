import { reduxBackedPromise } from './actionHelpers'

export const TRY_GET_GLOBAL_ACTIONS = 'TRY_GET_GLOBAL_ACTIONS'
export const GET_GLOBAL_ACTIONS_SUCCESS = 'GET_GLOBAL_ACTIONS_SUCCESS'
export const GET_GLOBAL_ACTIONS_FAILURE = 'GET_GLOBAL_ACTIONS_FAILURE'


export const fetchGlobalActions = () => reduxBackedPromise(
    ['globalActions/'],
    getGlobalActionsActionSet
)

export const getGlobalActionsActionSet = ({
    try: () => ({
        type: TRY_GET_GLOBAL_ACTIONS
    }),

    succeed: (globalActions) => ({
        type: GET_GLOBAL_ACTIONS_SUCCESS,
        globalActions
    }),

    fail: (failureReason) => ({
        type: GET_GLOBAL_ACTIONS_FAILURE,
        failureReason
    })
})
