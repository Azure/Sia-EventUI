'use strict'

const fs = require("fs");
require('dotenv').config()

function mixinSecretPlugins () {
  if ( process.env.BUNCHES_DEPENDENCIES ) {
    console.log('mixing in secret packages.')

    let project = fs.readFileSync("package.json")
    fs.writeFileSync("package.json.backup", project)
    project = JSON.parse(project.toString())

    let secret_dependencies = JSON.parse(process.env.BUNCHES_DEPENDENCIES)

    project.dependencies = Object.assign({}, project.dependencies, secret_dependencies)

    fs.writeFileSync("package.json", JSON.stringify(project))
  } else {
    console.log('please define BUNCHES_DEPENDENCIES in `.env`.')
  }
}

function removeSecretPlugins () {
  console.log('removing secret packages.')

  let project = fs.readFileSync("package.json.backup")
  fs.writeFileSync("package.json", project)
  fs.unlink("package.json.backup")
}

if (process.argv.includes('--mixin-secret-plugins'))  { mixinSecretPlugins() }
if (process.argv.includes('--remove-secret-plugins')) { removeSecretPlugins() }
