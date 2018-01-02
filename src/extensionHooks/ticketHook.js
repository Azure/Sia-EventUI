let banner = document.createElement('div')
banner.id = 'trackInSia'
let track = document.createElement('h3')
track.innerHTML = '<a>Set SIA to this ticket!</a>'
track.onclick = sendMessage
let close = document.createElement('h3')
close.innerHTML = '<a>X</a>'
close.onclick = closeBanner
banner.appendChild(track)
banner.appendChild(close)


document.body.insertBefore(banner, document.body.firstChild)


function sendMessage(){
    chrome.runtime.sendMessage({ticketUrl: location.href}, (resp)=>{
        track.innerHTML = resp.message
        setTimeout(closeBanner, 2000)
    })
}

function closeBanner(){
    banner.remove()
}