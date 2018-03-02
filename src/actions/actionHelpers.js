import { authenticatedFetch, authenticatedPost, authenticatedPut } from 'services/authenticatedFetch'

export const testableReduxBackedPromise = (localAuthenticatedFetch, localAuthenticatedPost, localAuthenticatedPut) =>
(promiseArgs, actionSet, operation = 'GET') =>
(dispatch) => {
  validateActionSet(actionSet)

  const promiseGenerator = getPromiseGenerator(localAuthenticatedFetch, localAuthenticatedPost, localAuthenticatedPut)(operation)

  dispatch(actionSet.try())

  return promiseGenerator(dispatch, ...promiseArgs)
        .then(({json, response}) => dispatch(actionSet.succeed(json, response)),
            error => dispatch(actionSet.fail(error)))
}

export const reduxBackedPromise = testableReduxBackedPromise(authenticatedFetch, authenticatedPost, authenticatedPut)

const needOnActionSet = (prop) => `Need "${prop}" function on actionSet!`

export const validateActionSet = (actionSet) => {
  if (!actionSet.try || !(typeof actionSet.try === 'function')) { throw needOnActionSet('try') }
  if (!actionSet.succeed || !(typeof actionSet.succeed === 'function')) { throw needOnActionSet('succeed') }
  if (!actionSet.fail || !(typeof actionSet.fail === 'function')) { throw needOnActionSet('fail') }
}

export const getPromiseGenerator = (localAuthenticatedFetch, localAuthenticatedPost, localAuthenticatedPut) =>
(operation) => {
  switch (operation.toUpperCase()) {
    case 'TESTERROR':
      break // Never intended to happen in a deployed instance, just here for testing
    case 'PUT':
      return localAuthenticatedPut
    case 'POST':
      return localAuthenticatedPost
    default:
      return localAuthenticatedFetch
  }
  throw new Error('promiseGenerator not initialized. This should not be possible. Consider rolling back.')
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

/* Update pagination does nothing on its own, but activates
the default case of pagination reducers created by paginated-redux,
which forces re-evaluation of the current page; simply adding
items to the list array won't cause the contents of the current page
to change.
*/
export const UPDATE_PAGINATION = 'UPDATE_PAGINATION'
export const updatePagination = () => ({type: UPDATE_PAGINATION})
