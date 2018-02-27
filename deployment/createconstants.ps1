# Powershell script for VSTS build that accesses build environment variables to create config file.

[CmdletBinding()]
  
param(
[parameter(Mandatory=$true,ParameterSetName = "Set 1")]
[ValidateNotNullOrEmpty()]
[String]$ProjectPath,

[parameter(Mandatory=$true,ParameterSetName = "Set 1")]
[ValidateSet('localhost','dist')]
[String]$Environment,

[parameter(Mandatory=$true,ParameterSetName = "Set 1")]
[ValidateNotNullOrEmpty()]
[String]$BaseUrl,

[parameter(Mandatory=$true,ParameterSetName = "Set 1")]
[ValidateNotNullOrEmpty()]
[String]$AuthRedirectUri
)

$s = "let baseConstants = require('./defaultConstants')

module.exports = Object.assign({}, baseConstants, {
  appEnv: '$Environment',
  aadInstance: '${env:aadInstance}',
  aadTenant: '$env:aadTenant',
  clientId: '$env:clientId',
  baseUrl: '$BaseUrl',
  authRedirectUri: '$AuthRedirectUri',
  authVersion: 'ADAL',
  ticketSystems: {
    1: {
      id: 1,
      name: 'Default Ticket System',
      ticketUriPrefix: '$env:ticketUriPrefix',
      ticketUriSuffix: '$env:ticketUriSuffix'
    }
  }
})"

$outputFile = "$ProjectPath/cfg/$Environment.const.js"
Write-Host "write --->`n$s`n<--- to $outputFile"

$s | out-file $outputFile -Encoding utf8
