[![LICENSE](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Azure/Sia-EventUI/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/Azure/Sia-EventUI.svg?branch=master)](https://travis-ci.org/Azure/Sia-EventUI)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/10fae239209f4123b8277ef78fbcd195)](https://www.codacy.com/app/SIA/Azure-Sia-EventUI?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Azure/Sia-EventUI&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/Azure/Sia-EventUI/badge.svg?branch=master)](https://coveralls.io/github/Azure/Sia-EventUI?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Azure/Sia-Root/blob/master/HOWTOCONTRIBUTE.md)

# This is the user interface for SRE Incident Assistant (SIA)
See the [Root repository](https://github.com/azure/Sia-Root) for full project information.

SIA is built using:
+ [ReactJs](https://facebook.github.io/react/)
+ [Webpack](https://webpack.js.org/)
+ [Material UI](http://www.material-ui.com/)

SIA is configured for Wepback's hot module reloading, so changes should automatically appear in your browser.

# Before You Start
You will need to add const files in config for each environment you want to use; these are not tracked in git. See <code>cfg/constExample.js</code> for more details. Const files follow the naming convention $env.const.js (localhost.const.js is the const file loaded by localhost.js, for example).

# To start
+ Have Node.js installed (the latest LTS release is preferred)
+ Create a localhost.const.js file inside the cfg folder. Use the <code>cfg/constExample.js</code> file as a template.
+ Navigate to the SIA-EventUI source directory (the directory this file is in (<code>README.md</code>)) and enter these commands:
    + `npm install`
    + `npm run serve`
+ Navigate to http://localhost:3000

# To start pointing at local API
+ Have Node.js installed (the latest LTS release is preferred)
+ Navigate to the SIA-EventUI source directory (the directory this file is in (<code>README.md</code>))
+ Start the gateway project and all dependencies by entering these commands:
    + `npm install`
    + `npm start`
+ Navigate to http://localhost:3000

# To Test
+ Enter this command:
    + `npm test`

# To create dist bundle, no server
webpack --env=dist
