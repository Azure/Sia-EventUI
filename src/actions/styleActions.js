export const BUTTON_FONT_ENLARGE = 'BUTTON_FONT_ENLARGE'
export const SCREEN_SIZE_SMALL = 'SCREEN_SIZE_SMALL'
export const SCREEN_SIZE_MEDIUM = 'SCREEN_SIZE_MEDIUM'
export const SCREEN_SIZE_LARGE = 'SCREEN_SIZE_LARGE'
export const SCREEN_SIZE_FULL = 'SCREEN_SIZE_FULL'

export const buttonFontEnlarge = () => ({
    type: BUTTON_FONT_ENLARGE
})

export const screenSizeSmall = () => ({
    type: SCREEN_SIZE_SMALL
})

export const screenSizeMedium = () => ({
    type: SCREEN_SIZE_MEDIUM
})

export const screenSizeLarge = () => ({
    type: SCREEN_SIZE_LARGE
})

export const screenSizeFull = () => ({
    type: SCREEN_SIZE_FULL
})

const mediaQueriesToActions = [
    ['(max-width: 480px)', screenSizeSmall()],
    ['(min-width: 481px) and (max-width: 768px)', screenSizeMedium()],
    ['(min-width: 769px) and (max-width: 920px)', screenSizeLarge()],
    ['(min-width: 921px)', screenSizeFull()]
]

const CreateScreenSizeListeners = (mediaQueriesToActions) => (window, store) => {
    mediaQueriesToActions.map(mqta => CreateScreenSizeListener(mqta[0], mqta[1], window, store))
}

const CreateScreenSizeListener = (mediaQuery, action, window, store) => {
    const listener = window.matchMedia(mediaQuery)
    if( listener.matches ) { store.dispatch(action) }
    listener.onchange = ls => { if(ls.matches) { store.dispatch(action) } }
}


export const ListenForScreenSize = CreateScreenSizeListeners(mediaQueriesToActions)