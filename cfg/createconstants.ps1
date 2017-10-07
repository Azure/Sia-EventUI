# Powershell script for VSTS build that accesses build environment variables to create config file.

$s = "let baseConstants = require('./defaultConstants')
module.exports = Object.assign({}, baseConstants, {    
    aadTenant: ""$env:aadTenant"",    
    clientId: ""$env:clientId"",
baseUrl: JSON.stringify(""$env:baseUrl""),

    authRedirectUri: JSON.stringify(""$env:authRedirectUri""),})"

$s | out-file ".\dist.const.js" -Encoding utf8
