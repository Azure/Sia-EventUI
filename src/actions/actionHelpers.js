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