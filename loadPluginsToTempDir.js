const fs = require('fs')
const _  = require('underscore')
require('dotenv').config()

const directoryPath = './src/pluginsTemp'
const separator = require('path').sep

const copyFile = (plugin) => {
  console.log('copying', plugin.path, 'to', plugin.newPath)
  fs.copyFileSync(plugin.path, plugin.newPath)
}

const handleError = (error) => {
  console.log(error)
}

const hydratePlugin = (plugin) => {
  var filename = _.last(plugin.path.split(separator))

  plugin.newPath = [directoryPath, filename].join(separator)

  return plugin
}

const plugins = (jsonString) => {
  if ( !jsonString ) { console.log('No plugins are defined.'); return }

  return _.map(JSON.parse(jsonString), hydratePlugin)
}

const setup = () => {
  if (fs.existsSync(directoryPath))
    console.log('A temporary plugins folder already exists.')
  else {
    console.log('Creating temp plugin folder.')
    fs.mkdir(directoryPath, handleError)
  }

  _.each(plugins(process.env.PLUGINS), copyFile)
}

const teardown = () => {
  // Not triggered by ctrl-C. :'(
  console.log('Removing temp plugin folder.')
  fs.rmdir(directoryPath, handleError)
}

if (process.argv.includes('--setup')) { setup() }
if (process.argv.includes('--teardown')) { teardown() }
