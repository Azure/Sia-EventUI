# This is the user interface for SRE Incident Assistant
See the [Root repository](https://github.com/azure/Sia-Root) for full project information.

It is built using:
+ [ReactJs](https://facebook.github.io/react/)
+ [Webpack 2](https://webpack.js.org/)
+ [Material UI](http://www.material-ui.com/#/)

It is configured for Wepback's hot module reloading, so as things change they should automatically appear in your browser.

# Before You Start
You will need to add const files in config for each environment you want to use; these are not tracked in git. See cfg.constExample.js for more details. Const files follow the naming convention $env.const.js (localhost.const.js is the const file loaded by localhost.js, for example)

# To start
+ Have Node.js installed (the latest LTS release is preferred)
+ Create a localhost.const.js file inside the cfg folder. Use the example.const.js file as a template.
+ Navigate to the directory this file is in
+ run `npm install`
+ run `npm run serve`
+ navigate to http://localhost:3000

# To start pointing at local API
+ Have Node.js installed (the latest LTS release is preferred)
+ Navigate to the directory this file is in
+ Start the gateway project and all dependencies
+ run `npm install`
+ run `npm start`
+ navigate to http://localhost:3000

# To Test
+ run `npm test`

# To create dist bundle, no server
webpack --env=dist
