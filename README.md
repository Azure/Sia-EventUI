# This is the user interface for SRE Incident Assistant (SIA)
See the [Root repository](https://github.com/azure/Sia-Root) for full project information.

SIA is built using:
+ [ReactJs](https://facebook.github.io/react/)
+ [Webpack 2](https://webpack.js.org/)
+ [Material UI](http://www.material-ui.com/#/)

SIA is configured for Wepback's hot module reloading, so changes should automatically appear in your browser.

# To start
+ Have Node.js installed (the latest LTS release is preferred)
+ Create a `.env` file. To get started quickly, run `cp .env.example .env`. Consult with your maintainers for configuration variables and secrets.
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
