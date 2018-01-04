# This is the user interface for SRE Incident Assistant (SIA)
See the [Root repository](https://github.com/azure/Sia-Root) for full project information.

SIA is built using:
+ [ReactJs](https://facebook.github.io/react/)
+ [Webpack 2](https://webpack.js.org/)
+ [Material UI](http://www.material-ui.com/#/)

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
