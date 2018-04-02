# Sia Event UI

[![LICENSE](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Azure/Sia-EventUI/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/Azure/Sia-EventUI.svg?branch=master)](https://travis-ci.org/Azure/Sia-EventUI)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/10fae239209f4123b8277ef78fbcd195)](https://www.codacy.com/app/SIA/Azure-Sia-EventUI?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Azure/Sia-EventUI&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/github/Azure/Sia-EventUI/badge.svg?branch=master)](https://coveralls.io/github/Azure/Sia-EventUI?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Azure/Sia-Root/blob/master/HOWTOCONTRIBUTE.md)

## This is the user interface for SRE Incident Assistant (SIA)
See the [Root repository](https://github.com/azure/Sia-Root) for full project information and an overview of how services fit together.

SIA is built using:
+ [ReactJs](https://facebook.github.io/react/)
+ [Webpack](https://webpack.js.org/)
+ [Material UI](http://www.material-ui.com/)

SIA is configured for Wepback's hot module reloading, so changes should automatically appear in your browser.

## Requirements
+ Node.js (latest LTS is preferred)

## Before You Start
You will need to add const files in config for each environment you want to use; these are not tracked in git. See <code>cfg/constExample.js</code> for more details. Const files follow the naming convention $env.const.js (`localhost.const.js` is the const file loaded by localhost.js, for example).

## Launch UI pointing at a local Gateway API
Use these steps to launch if you're hosting your Gateway API locally.
+ Navigate to the SIA-EventUI source directory root
+ Ensure your local copy of the gateway API is running on http://localhost:50000 (or the base URL you configured)
+ Enter these commands to launch the Event UI:
    ```
    npm install
    npm start
    ```
+ Navigate to http://localhost:3000

## Launch UI pointing at a remote dev Gateway API
Use these steps if you're working on the Event UI and do not need to run a local copy of the gateway.

+ Create a localhost.const.js file inside the cfg folder. Use the <code>cfg/constExample.js</code> file as a template.
+ Navigate to the SIA-EventUI source directory root
+ Enter these commands to launch the Event UI:
    ```
    npm install
    npm run serve
    ```
+ Navigate to http://localhost:3000

## To Test
+ Enter this command:

```
npm test
```

### Testing Practices

For bugfixes, write a failing test before you change the code.

For feature work we expect code to be reasonably well tested, which means:

- A happy path through the feature should be illustrated.
- Any exception or error handling should be tested.
- failbacks for sad paths can be tested as well, though it is not required.
- Features which handle user input should have validation tests describing when the input is valid or invalid.

BDD style is being adopted in the codebase, but it was introduced in stages, so many tests aren't using this approach. Familiarize yourself with the [Chai.js BDD documentation](http://www.chaijs.com/api/bdd/).

- test messages should be human-readable and accurately describe the test.
- Use `describe` and `context` blocks to establish the context of the method under test, and `it` blocks to describe expectations.
  - `describe` should be used to name the object under test
  - `context` should be used to enumerate the conditions in the test, and begin with 'when'.
  - `it` blocks should begin with 'should' and list the expectation.
  - See the first three sections of betterspecs.org for more details.
- Avoid writing more than one `expect` per `it` block.
- When submitting a pull request, try to include a user story illustrating the happy path of your feature.
- Any changes to the UI should include before and after screenshots. Or gifs!!
- In code review, avoid approving if you are not confident in your understanding of the code. Approve after you've pulled the change into your local environment and manually validate.

### Components

How should we approach UI testing versus business logic?

- UI components can be treated as purely functional, and can be tested easily, but these tests are usually not high-value.
- `mapStateToProps` and other non-render functions should be tested separately.
- we need to test all user interactions like onClick, or onSubmit, or onHover… anything which is configured to dispatch an action should be tested.

### Reducers

- All paths through the function must be tested
- When state is not changed use strict equality `.equal` (check).
- When state is changed… use `.deep.equal` to compare it to the expected.

### Actions

- An action which returns a static object may safely be untested.
- When an action conditionally returns differing values, tests should be written to cover _at least_ the happy path.
- Thunks (actions which take dispatch as an argument and dispatch multiple actions) should use a mock
dispatch to ensure that the correct actions are dispatched in the correct order

### Services

## To create dist bundle, no server
```
webpack --env=dist
```

## NPM scripts

A partial list of run scripts and what they do

| Script | What it does |
| ------ | ------------ |
| start  | Launch the server and point at a gateway hosted on localhost (use `localhost.const.js`) |
| serve  | Launch the server and point at a gateway hosted in the dev environment (use `dev.const.js`) |
