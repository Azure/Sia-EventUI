const needOnActionSet = (prop) => `Need "${prop}" function on actionSet!`

export const reduxBackedPromise = (promiseGenerator, promiseArgs, actionSet) => (dispatch) => {
    if(!actionSet.try) { throw needOnActionSet('try')}
    if(!actionSet.succeed) { throw needOnActionSet('succeed')}
    if(!actionSet.fail) { throw needOnActionSet('fail')}

    dispatch(actionSet.try())

    return promiseGenerator(dispatch, ...promiseArgs)
        .then(success => dispatch(actionSet.succeed(success)),
            error => dispatch(actionSet.fail(error)))
}

const goToPageActionType = (BASE_NAME) => 'GOTO_' + BASE_NAME + '_PAGE'
const nextPageActionType = (BASE_NAME) => 'NEXT_' + BASE_NAME + '_PAGE'
const prevPageActionType = (BASE_NAME) => 'PREV_' + BASE_NAME + '_PAGE'
const sortActionType = (BASE_NAME) => 'SORT_' + BASE_NAME
const filterActionType = (BASE_NAME) => 'FILTER_' + BASE_NAME

export const paginationActions = (BASE_NAME) => ({
    types: {
        GOTO_PAGE: goToPageActionType(BASE_NAME),
        NEXT_PAGE: nextPageActionType(BASE_NAME),
        PREV_PAGE: prevPageActionType(BASE_NAME),
        SORT: sortActionType(BASE_NAME),
        FILTER: filterActionType(BASE_NAME)
    },

    goToPage: (page) => ({
        type: goToPageActionType(BASE_NAME),
        page
    }),

    nextPage: () => ({
        type: nextPageActionType(BASE_NAME)
    }),

    sort: (by) => ({
        type: sortActionType(BASE_NAME),
        by
    }),

    filter: (filter) => ({
        type: filterActionType(BASE_NAME),
        filter
    })
})