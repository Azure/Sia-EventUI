!function(n){var e={};function t(l){if(e[l])return e[l].exports;var i=e[l]={i:l,l:!1,exports:{}};return n[l].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=n,t.c=e,t.d=function(n,e,l){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:l})},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="/assets/",t(t.s=249)}({199:function(n,e,t){"use strict";n.exports={appEnv:"test",baseUrl:"http://localhost:50000/",authRedirectUri:"http://localhost:3000/",retries:2,retryExponentialBackoffFactor:2,retryMinTimeoutInMiliseconds:50,retryMaxTimeoutInMiliseconds:1500,ticketRefreshIntervalInSeconds:300,authVersion:"TEST",aadInstance:"https://login.microsoftonline.com/",aadTenant:"Your Azure Active Directory tenant here",clientId:"Your EventUI Azure Active Directory app registration client ID here",ticketSystems:{1:{id:1,name:"Example1",ticketUriPrefix:"http://example1/ticket/",ticketUriSuffix:""},2:{id:2,name:"Example2",ticketUriPrefix:"http://example2/ticketId=",ticketUriSuffix:"&edit=false"}},instrumentationKey:"APP INSIGHT GOES HERE"}},249:function(n,e,t){"use strict";var l,i,c,o,a,s,r,u=(l="C:\\Users\\yizha\\source\\repos\\SIA\\sia\\Sia-EventUI\\src\\appInsights.js",i="2944988936a895e098410d8cfd9f5cb8e3a4c8ec",c=new Function("return this")(),a={path:"C:\\Users\\yizha\\source\\repos\\SIA\\sia\\Sia-EventUI\\src\\appInsights.js",statementMap:{0:{start:{line:3,column:16},end:{line:7,column:6}},1:{start:{line:4,column:18},end:{line:4,column:92}},2:{start:{line:4,column:40},end:{line:4,column:49}},3:{start:{line:4,column:50},end:{line:4,column:91}},4:{start:{line:4,column:74},end:{line:4,column:89}},5:{start:{line:4,column:99},end:{line:4,column:109}},6:{start:{line:4,column:112},end:{line:4,column:120}},7:{start:{line:4,column:123},end:{line:4,column:129}},8:{start:{line:4,column:130},end:{line:4,column:312}},9:{start:{line:4,column:158},end:{line:4,column:183}},10:{start:{line:4,column:184},end:{line:4,column:309}},11:{start:{line:4,column:312},end:{line:4,column:344}},12:{start:{line:4,column:316},end:{line:4,column:333}},13:{start:{line:4,column:344},end:{line:4,column:355}},14:{start:{line:4,column:355},end:{line:4,column:457}},15:{start:{line:4,column:438},end:{line:4,column:457}},16:{start:{line:4,column:457},end:{line:4,column:764}},17:{start:{line:4,column:648},end:{line:4,column:669}},18:{start:{line:4,column:675},end:{line:4,column:679}},19:{start:{line:4,column:680},end:{line:4,column:763}},20:{start:{line:4,column:711},end:{line:4,column:726}},21:{start:{line:4,column:727},end:{line:4,column:762}},22:{start:{line:4,column:764},end:{line:4,column:772}},23:{start:{line:9,column:2},end:{line:9,column:184}}},fnMap:{0:{name:"(anonymous_0)",decl:{start:{line:3,column:36},end:{line:3,column:37}},loc:{start:{line:3,column:47},end:{line:5,column:5}},line:3},1:{name:"b",decl:{start:{line:4,column:13},end:{line:4,column:14}},loc:{start:{line:4,column:17},end:{line:4,column:93}},line:4},2:{name:"(anonymous_2)",decl:{start:{line:4,column:23},end:{line:4,column:24}},loc:{start:{line:4,column:33},end:{line:4,column:92}},line:4},3:{name:"(anonymous_3)",decl:{start:{line:4,column:63},end:{line:4,column:64}},loc:{start:{line:4,column:73},end:{line:4,column:90}},line:4},4:{name:"(anonymous_4)",decl:{start:{line:4,column:141},end:{line:4,column:142}},loc:{start:{line:4,column:151},end:{line:4,column:310}},line:4},5:{name:"(anonymous_5)",decl:{start:{line:4,column:685},end:{line:4,column:686}},loc:{start:{line:4,column:704},end:{line:4,column:763}},line:4}},branchMap:{0:{loc:{start:{line:3,column:16},end:{line:7,column:6}},type:"binary-expr",locations:[{start:{line:3,column:16},end:{line:3,column:34}},{start:{line:3,column:36},end:{line:7,column:6}}],line:3},1:{loc:{start:{line:4,column:190},end:{line:4,column:247}},type:"binary-expr",locations:[{start:{line:4,column:190},end:{line:4,column:195}},{start:{line:4,column:197},end:{line:4,column:247}}],line:4},2:{loc:{start:{line:4,column:457},end:{line:4,column:764}},type:"if",locations:[{start:{line:4,column:457},end:{line:4,column:764}},{start:{line:4,column:457},end:{line:4,column:764}}],line:4},3:{loc:{start:{line:4,column:711},end:{line:4,column:726}},type:"binary-expr",locations:[{start:{line:4,column:711},end:{line:4,column:712}},{start:{line:4,column:714},end:{line:4,column:726}}],line:4},4:{loc:{start:{line:4,column:733},end:{line:4,column:760}},type:"binary-expr",locations:[{start:{line:4,column:733},end:{line:4,column:739}},{start:{line:4,column:741},end:{line:4,column:760}}],line:4},5:{loc:{start:{line:9,column:33},end:{line:9,column:183}},type:"binary-expr",locations:[{start:{line:9,column:33},end:{line:9,column:50}},{start:{line:9,column:52},end:{line:9,column:80}},{start:{line:9,column:82},end:{line:9,column:109}},{start:{line:9,column:111},end:{line:9,column:140}},{start:{line:9,column:142},end:{line:9,column:183}}],line:9}},s:{0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0,19:0,20:0,21:0,22:0,23:0},f:{0:0,1:0,2:0,3:0,4:0,5:0},b:{0:[0,0],1:[0,0],2:[0,0],3:[0,0],4:[0,0],5:[0,0,0,0,0]},_coverageSchema:"332fd63041d2c1bcb487cc26dd0d5f7d97098a6c"},(s=c[o="__coverage__"]||(c[o]={}))[l]&&s[l].hash===i?s[l]:(a.hash=i,s[l]=a)),m=t(57),d=(r=m)&&r.__esModule?r:{default:r};var p=(u.s[0]++,u.b[0][0]++,window.appInsights||(u.b[0][1]++,function(n){function e(n){u.f[1]++,u.s[1]++,t[n]=function(){u.f[2]++;var e=(u.s[2]++,arguments);u.s[3]++,t.queue.push(function(){u.f[3]++,u.s[4]++,t[n].apply(t,e)})}}u.f[0]++;var t=(u.s[5]++,{config:n}),l=(u.s[6]++,document),i=(u.s[7]++,window);u.s[8]++,setTimeout(function(){u.f[4]++;var e=(u.s[9]++,l.createElement("script"));u.s[10]++,e.src=(u.b[1][0]++,n.url||(u.b[1][1]++,"https://az416426.vo.msecnd.net/scripts/a/ai.0.js")),l.getElementsByTagName("script")[0].parentNode.appendChild(e)}),u.s[11]++;try{u.s[12]++,t.cookie=l.cookie}catch(n){}u.s[13]++,t.queue=[],u.s[14]++;for(var c=["Event","Exception","Metric","PageView","Trace","Dependency"];c.length;)u.s[15]++,e("track"+c.pop());if(u.s[16]++,e("setAuthenticatedUserContext"),e("clearAuthenticatedUserContext"),e("startTrackEvent"),e("stopTrackEvent"),e("startTrackPage"),e("stopTrackPage"),e("flush"),n.disableExceptionTracking)u.b[2][1]++;else{u.b[2][0]++,u.s[17]++,e("_"+(c="onerror"));var o=(u.s[18]++,i[c]);u.s[19]++,i[c]=function(n,e,l,i,a){u.f[5]++;var s=(u.s[20]++,u.b[3][0]++,o&&(u.b[3][1]++,o(n,e,l,i,a)));return u.s[21]++,u.b[4][0]++,!0!==s&&(u.b[4][1]++,t["_"+c](n,e,l,i,a)),s}}return u.s[22]++,t}({instrumentationKey:d.default.instrumentationKey})));u.s[23]++,window.appInsights=p,u.b[5][0]++,p.queue&&(u.b[5][1]++,0===p.queue.length)&&(u.b[5][2]++,p.trackPageView())&&(u.b[5][3]++,p.trackDependency())&&(u.b[5][4]++,p.setAuthenticatedUserContext());"undefined"!=typeof __REACT_HOT_LOADER__&&__REACT_HOT_LOADER__.register(p,"appInsights","C:/Users/yizha/source/repos/SIA/sia/Sia-EventUI/src/appInsights.js")},57:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l,i,c,o,a,s,r=(l="C:\\Users\\yizha\\source\\repos\\SIA\\sia\\Sia-EventUI\\src\\config\\index.js",i="c105aba684a66d5484e276dad3d427b2562d69e3",c=new Function("return this")(),a={path:"C:\\Users\\yizha\\source\\repos\\SIA\\sia\\Sia-EventUI\\src\\config\\index.js",statementMap:{0:{start:{line:2,column:0},end:{line:14,column:1}},1:{start:{line:5,column:2},end:{line:5,column:20}},2:{start:{line:7,column:2},end:{line:13,column:3}},3:{start:{line:8,column:26},end:{line:8,column:60}},4:{start:{line:9,column:4},end:{line:9,column:51}},5:{start:{line:11,column:29},end:{line:11,column:66}},6:{start:{line:12,column:4},end:{line:12,column:57}}},fnMap:{},branchMap:{0:{loc:{start:{line:9,column:13},end:{line:9,column:51}},type:"binary-expr",locations:[{start:{line:9,column:13},end:{line:9,column:34}},{start:{line:9,column:38},end:{line:9,column:51}}],line:9},1:{loc:{start:{line:12,column:13},end:{line:12,column:57}},type:"binary-expr",locations:[{start:{line:12,column:13},end:{line:12,column:37}},{start:{line:12,column:41},end:{line:12,column:57}}],line:12}},s:{0:0,1:0,2:0,3:0,4:0,5:0,6:0},f:{},b:{0:[0,0],1:[0,0]},_coverageSchema:"332fd63041d2c1bcb487cc26dd0d5f7d97098a6c"},(s=c[o="__coverage__"]||(c[o]={}))[l]&&s[l].hash===i?s[l]:(a.hash=i,s[l]=a)),u=void 0;r.s[0]++;try{r.s[1]++,u={appEnv:"test",baseUrl:"http://localhost:50000/",authRedirectUri:"http://localhost:3000/",retries:2,retryExponentialBackoffFactor:2,retryMinTimeoutInMiliseconds:50,retryMaxTimeoutInMiliseconds:1500,ticketRefreshIntervalInSeconds:300,authVersion:"ADAL",aadInstance:"https://login.microsoftonline.com/",aadTenant:"microsoft.onmicrosoft.com",clientId:"d4c7b0fe-1256-4ba4-921b-8cbb09262dbb",ticketSystems:{1:{id:1,name:"Example1",ticketUriPrefix:"http://example1/ticket/",ticketUriSuffix:""},2:{id:2,name:"Example2",ticketUriPrefix:"http://example2/ticketId=",ticketUriSuffix:"&edit=false"}},instrumentationKey:"025ecaef-af40-45cd-9301-5a2814a342ce"}}catch(n){r.s[2]++;try{var m=(r.s[3]++,t(!function(){var n=new Error('Cannot find module "../../cfg/test.const.js"');throw n.code="MODULE_NOT_FOUND",n}()));r.s[4]++,r.b[0][0]++,u=m.default||(r.b[0][1]++,m)}catch(n){var d=(r.s[5]++,t(199));r.s[6]++,r.b[1][0]++,u=d.default||(r.b[1][1]++,d)}}var p=u;e.default=p;"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(u,"config","C:/Users/yizha/source/repos/SIA/sia/Sia-EventUI/src/config/index.js"),__REACT_HOT_LOADER__.register(p,"default","C:/Users/yizha/source/repos/SIA/sia/Sia-EventUI/src/config/index.js"))}});
//# sourceMappingURL=appInsights.js.map