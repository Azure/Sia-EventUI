export const SHOW_POPUP = 'SHOW_POPUP'
export const HIDE_POPUP = 'HIDE_POPUP'

export const showPopup = (popupName, args = {}) => ({
    type: SHOW_POPUP,
    popupName,
    args
})

export const hidePopup = () => ({
    type: HIDE_POPUP
})