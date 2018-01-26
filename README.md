[![LICENSE](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Azure/Sia-EventUI/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/Azure/Sia-EventUI.svg?branch=master)](https://travis-ci.org/Azure/Sia-EventUI)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/10fae239209f4123b8277ef78fbcd195)](https://www.codacy.com/app/SIA/Azure-Sia-EventUI?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Azure/Sia-EventUI&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/Azure/Sia-EventUI/badge.svg?branch=master)](https://coveralls.io/github/Azure/Sia-EventUI?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Azure/Sia-Root/blob/master/HOWTOCONTRIBUTE.md)

# This is the user interface for SRE Incident Assistant (SIA)
See the [Root repository](https://github.com/azure/Sia-Root) for full project information and an overview of how services fit together.

SIA is built using:
+ [ReactJs](https://facebook.github.io/react/)
+ [Webpack](https://webpack.js.org/)
+ [Material UI](http://www.material-ui.com/)

SIA is configured for Wepback's hot module reloading, so changes should automatically appear in your browser.

# Requirements
+ Node.js (latest LTS is preferred)

# Before You Start
You will need to add const files in config for each environment you want to use; these are not tracked in git. See <code>cfg/constExample.js</code> for more details. Const files follow the naming convention $env.const.js (`localhost.const.js` is the const file loaded by localhost.js, for example).

# Launch UI pointing at a local Gateway API
Use these steps to launch if you're hosting your Gateway API locally. 
+ Navigate to the SIA-EventUI source directory root
+ Ensure your local copy of the gateway API is running on http://localhost:50000 (or the base URL you configured)
+ Enter these commands to launch the Event UI:
    ```
    npm install
    npm start
    ```
+ Navigate to http://localhost:3000

# Launch UI pointing at a remote dev Gateway API
Use these steps if you're working on the Event UI and do not need to run a local copy of the gateway. 

+ Create a localhost.const.js file inside the cfg folder. Use the <code>cfg/constExample.js</code> file as a template.
+ Navigate to the SIA-EventUI source directory root 
+ Enter these commands to launch the Event UI:
    ```
    npm install
    npm run serve
    ```
+ Navigate to http://localhost:3000

# To Test
+ Enter this command:

```
npm test
```

# To create dist bundle, no server
```
webpack --env=dist
```

# NPM scripts

A partial list of run scripts and what they do

| Script | What it does |
| ------ | ------------ |
| start  | Launch the server and point at a gateway hosted on localhost (use `localhost.const.js`) | 
| serve  | Launch the server and point at a gateway hosted in the dev environment (use `dev.const.js`) |