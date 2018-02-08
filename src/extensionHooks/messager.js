import { store } from '../configureStore'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.ticketUrl) {
    store.dispatch()
    sendResponse({message: `Tracking ticket ${request.ticketUrl}` })
  }
})
