let baseConstants = require('./defaultConstants')

//Override base constants or add additional constants for this environment

module.exports = Object.assign({}, baseConstants, {
    baseUrl: JSON.stringify("http://localhost:60000/"), //Host on a different port
    retries: 4 //retry failed requests more times before giving up
})