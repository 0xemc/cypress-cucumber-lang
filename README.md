<p align="center">
    <picture>
      <img alt="Cypress Cucumber Lang Logo" width="200px" src="./packages/docs/assets/cypress-cucumber-lang-logo.png">
    </picture>    
</p>
<p align="center">
  <a href="">Documentation</a> |
  <a href="">Changelog</a> 
</p>

<p align="center">
  A human readable testing language for web interfaces
</p>

<!-- <p align="center">
  <a href="https://www.npmjs.com/package/cypress">
    <img src="https://img.shields.io/npm/dm/cypress.svg" alt="npm"/>
  </a>
  <a href="https://on.cypress.io/discord">
    <img src="https://img.shields.io/badge/chat-on%20Discord-brightgreen" alt="Discord chat"/>
  </a>
    <a href="https://stackshare.io/cypress">
    <img src="https://img.stackshare.io/misc/follow-on-stackshare-badge.svg" alt="StackShare"/>
  </a><br />
</p> -->

## What is Cypress Cucumber Lang?

A set of pre-defined cucumber steps and network interaction utilities to allow you to quickly write human readable tests for your app.

```Gherkin
Feature: Some Feature

    Background:
        Given the 'https://my-app.com' url is loaded

    Scenario: Search for Chuck Norris
        When the user clicks the textbox element with text 'Name'
        And the user types 'Chuck Norris'
        And the user clicks the button element with text 'Search'
        Then a '@search' request has been sent with input:
            """
              {
                "query": "Chuck Norris"
              }
            """"
```

<!-- <p align="center">
  <a href="https://player.vimeo.com/video/237527670">
    <img alt="Why Cypress Video" src="https://user-images.githubusercontent.com/1271364/31739717-dbdff0ee-b41c-11e7-9b16-bfa1b6ac1814.png" width="75%" height="75%" />
  </a>
</p> -->

## Installing

[![npm version](https://badge.fury.io/js/cypress-cucumber-lang.svg)](https://badge.fury.io/js/cypress-cucumber-lang)

Install Cypress for Mac, Linux, or Windows, then [get started](https://on.cypress.io/install).

```bash
npm install cypress-cucumber-lang --save-dev
```

or

```bash
yarn add cypress-cucumber-lang --dev
```

## Setup

Call the `init()` function inside to e2e.ts

```ts
import { init } from "cypress-cucumber-lang";

init();
```

Modify your existing `.cypress-cucumber-preprocessorrc` file in the root folder of your project to include the following:

```json
{
  "stepDefinitions": [
    ...
    "node_modules/cypress-cucumber-lang/dist/steps/**/*.{js,ts}"
  ]
}
```

## License

[![license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/cypress-io/cypress/blob/develop/LICENSE)

This project is licensed under the terms of the [MIT license](/LICENSE).
