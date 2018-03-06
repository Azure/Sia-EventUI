#!/bin/bash

# Bash script to create cfg/$environment.const.js file for VSTS build

ProjectRoot=
Environment=
AadInstance=
AadTenant=
ClientId=
BaseUrl=
AuthRedirectUri=
AuthVersion=
TicketUriPrefix=
TicketUriSuffix=

Usage () {
  usage="Usage: $0"
  usage+=" --projectRoot projectRootPath"
  usage+=" --environment localhost|dist"
  usage+=" --aadInstance yourAadInstance"
  usage+=" --aadTenant yourAadTenant"
  usage+=" --clientId youClientId"
  usage+=" --baseUrl baseUrl"
  usage+=" --authRedirectUri authRedirectUri"
  usage+=" --authVersion authVersion"
  usage+=" --ticketUriPrefix ticketUriPrefix"
  usage+=" --ticketUriSuffix ticketUriSuffix"
  echo $usage
}

ThisScript="$0"

if [ $# -ne 20 ]
then
  Usage $ThisScript
  exit 1
fi

while [ $# -gt 0 ]
do
option="$1"

case $option in
  --projectRoot)
    ProjectRoot="$2"
	;;
  --environment)
    Environment="$2"
	;;
  --aadInstance)
    AadInstance="$2"
	;;
  --aadTenant)
    AadTenant="$2"
	;;
  --clientId)
    ClientId="$2"
	;;
  --baseUrl)
    BaseUrl="$2"
	;;
  --authRedirectUri)
    AuthRedirectUri="$2"
	;;
  --authVersion)
    AuthVersion="$2"
	;;
  --ticketUriPrefix)
    TicketUriPrefix="$2"
	;;
  --ticketUriSuffix)
    TicketUriSuffix="$2"
	;;
  -*)
    echo
    echo "bad option: $option"
    echo
    Usage $ThisScript
	exit 2
esac
shift
shift
done

content="
let baseConstants = require('./defaultConstants')
module.exports = Object.assign({}, baseConstants, {
  appEnv: '$Environment',
  aadInstance: '$AadInstance',
  aadTenant: '$AadTenant',
  clientId: '$ClientId',
  baseUrl: '$BaseUrl',
  authRedirectUri: '$AuthRedirectUri',
  authVersion: '$AuthVersion',
  ticketSystems: {
    1: {
      id: 1,
      name: 'Default Ticket System',
      ticketUriPrefix: '$TicketUriPrefix',
      ticketUriSuffix: '$TicketUriSuffix'
   }
  }
})
"

echo
echo "$content"

outputFile="$ProjectRoot/cfg/$Environment.const.js"
echo "$content" > $outputFile
