/*  This is example code that goes in the config file(s) you create for your environment(s).
You'll probably want to use the code in the 'More than Defaults' section.
*/

let defaultConstants = require('./defaultConstants')

/* More than Defaults:  Override default constants in cfg/defaultConstants.js file and/or add additional constants for this environment.
You'll probably want this if you commit your code to a public repo.
*/
module.exports = Object.assign({}, defaultConstants, {
    baseUrl: JSON.stringify("http://localhost:60000/"), //Host on a different port
    retries: 4 //retry failed requests more times before giving up
})



/* Defaults Only:  Copy this to a new file to create const file that just uses default constants.
let defaultConstants = require('./defaultConstants')

module.exports = Object.assign({}, defaultConstants)
*/
