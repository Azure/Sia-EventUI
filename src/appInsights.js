import config from 'config'
/*
To collect end-user usage analytics about your application, 
insert the following script into each page you want to track.
Place this code immediately before the closing </head> tag,
and before any other scripts. Your first data will appear 
automatically in just a few seconds.
Please find more info here: https://docs.microsoft.com/en-us/azure/application-insights/app-insights-javascript
*/
// eslint-disable-next-line no-undef
var appInsights=config.useAppInsights
    ?window.appInsights||function(a){
    function b(a){c[a]=function(){var b=arguments;c.queue.push(function(){c[a].apply(c,b)})}}var c={config:a},d=document,e=window;setTimeout(function(){var b=d.createElement("script");b.src=a.url||"https://az416426.vo.msecnd.net/scripts/a/ai.0.js",d.getElementsByTagName("script")[0].parentNode.appendChild(b)});try{c.cookie=d.cookie}catch(a){}c.queue=[];for(var f=["Event","Exception","Metric","PageView","Trace","Dependency"];f.length;)b("track"+f.pop());if(b("setAuthenticatedUserContext"),b("clearAuthenticatedUserContext"),b("startTrackEvent"),b("stopTrackEvent"),b("startTrackPage"),b("stopTrackPage"),b("flush"),!a.disableExceptionTracking){f="onerror",b("_"+f);var g=e[f];e[f]=function(a,b,d,e,h){var i=g&&g(a,b,d,e,h);return!0!==i&&c["_"+f](a,b,d,e,h),i}}return c
    }({
        instrumentationKey: config.instrumentationKey
    })
    :{
        trackPageView: () => null,
        trackDependency: () => null,
        trackEvent: () => null,
        setAuthenticatedUserContext: () => null
    }
window.appInsights=appInsights,appInsights.queue&&0===appInsights.queue.length&&appInsights.trackPageView()&&appInsights.trackDependency()&&appInsights.setAuthenticatedUserContext();
export default appInsights