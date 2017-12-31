chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    if(request.ticketUrl) {
        sendResponse({message: `Tracking ticket ${request.ticketUrl}` })
    }
})