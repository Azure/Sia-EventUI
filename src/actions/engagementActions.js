import moment from 'moment'
import { authenticatedPost, authenticatedPut } from '../services/authenticatedFetch'
import { reduxBackedPromise, paginationActions } from './actionHelpers'

export const TRY_ENGAGE = 'TRY_ENGAGE'
export const ENGAGE_SUCCESS = 'ENGAGE_SUCCESS'
export const ENGAGE_FAILURE = 'ENGAGE_FAILURE'
export const TRY_DISENGAGE = 'TRY_DISENGAGE'
export const DISENGAGE_SUCCESS = 'DISENGAGE_SUCCESS'
export const DISENGAGE_FAILURE = 'DISENGAGE_FAILURE'
export const ENGAGEMENTS = 'ENGAGEMENTS'

export const engagementActions = (siaContext) => ({
    engage: (incidentId, participant, timeEngaged = moment()) =>
    reduxBackedPromise(
        authenticatedPost(siaContext),
        ['incidents/' + incidentId + '/engagements/', {participant}],
        engageActionSet(incidentId, participant, timeEngaged)
    ),
    
    disengage: (participant, engagement, timeDisengaged = moment()) =>
    reduxBackedPromise(
        authenticatedPut(siaContext),
        [
            'incidents/' + engagement.incidentId + '/engagements/' + engagement.id,
            updatedEngagement(engagement, timeDisengaged),
            null,
            false
        ],
        disengageActionSet(engagement.incidentId, participant, engagement, timeDisengaged)
    )
})

const engageActionSet = (incidentId, participant, timeEngaged) => ({
    try: () => ({
        type: TRY_ENGAGE,
        incidentId,
        participant,
        timeEngaged
    }),

    succeed: (engagement) => ({
        type: ENGAGE_SUCCESS,
        engagement
    }),

    fail: (error) => ({
        type: ENGAGE_FAILURE,
        error,
        participant,
        timeEngaged
    })
})

const updatedEngagement = (engagement, timeDisengaged) => ({
    ...engagement,
    timeDisengaged
})

const disengageActionSet = (incidentId, participant, engagement, timeDisengaged) => ({
    try: () => ({
        type: TRY_DISENGAGE,
        incidentId,
        participant,
        timeDisengaged
    }),

    succeed: () => ({
        type: DISENGAGE_SUCCESS,
        engagement: updatedEngagement(engagement, timeDisengaged)
    }),

    fail: (error) => ({
        type: DISENGAGE_FAILURE,
        error,
        participant,
        timeDisengaged
    })
})

export const pagination = paginationActions(ENGAGEMENTS)

export default engagementActions
