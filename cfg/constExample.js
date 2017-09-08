let defaultConstants = require('./defaultConstants')

//Override base constants or add additional constants for this environment

module.exports = Object.assign({}, defaultConstants, {
    baseUrl: JSON.stringify("http://localhost:60000/"), //Host on a different port
    retries: 4 //retry failed requests more times before giving up
})

/* Copy this to a new file to create const file that just uses default constants

let defaultConstants = require('./defaultConstants')

module.exports = Object.assign({}, defaultConstants)

*/