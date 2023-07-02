# Introduction

This cypress package provides **feature** & **component** level testing for the NGS project.

By using [Cypress](https://www.cypress.io/), and its various add-on libraries, we are able to interact with the NGS app in a manner similar to how a user would use the product.

Through controlling **state** and **network requests**, in and out of the app, we are able to conduct **assertions** on the state of the DOM and confirm that features are behaving as expected.

> #### Quick Start
>
> For a TLDR run through of using the tool go to [Quick Start](/cypress/Quick-Start.md)

## Running Tests

Tests can be run in multiple ways:

### Locally

**Browser + UI**

`npm run test:cypress`

Tests are run targeting our local dev server on the current repository, network requests are intercepted & mocked responses are provided.
A user interface is also displayed to select tests and interact with the browser as tests are run.

**CLI Only**

`npm run test:cypress:headless`

As above except that no browser is launched and all tests are executed purely within the CLI. **(Good for running all tests)**

**CLI Only (specific test)**

`npm run start:local && npx cypress run --spec path/to/spec/file.feature`

Again, same as _:headless_ except that we can target specific test specs. **(Great if we only want to run a specific test quickly)**

### Github

**Pull Requests**

The `.github/workflows/cypress.yml` workflow contains a triggered github action that executes on any **pull request** including feature, chore and hotfix branches.

Previous runs can be found [here](https://github.com/Q-Retail/qr_ngp_front_end/actions/workflows/cypress.yml)
or in the "Checks" section of your PR.

**Scheduled**

The `.github/workflows/cypress-schedule.yml` workflow contains a scheduled github action that executes every day at 2am AEST. This test currently targets the https://lb.dev.ngp.wiqretail.com url and is a daily end-to-end test run.

Previous runs can be found [here](https://github.com/Q-Retail/qr_ngp_front_end/actions/workflows/cypress-schedule.yml)

### End to End

**Targeting the remote**

`npm run test:cypress:dev`

This will launch the cypress test suite and UI but will point the tests at https://lb.dev.ngp.wiqretail.com. Meaning that test are executed on a deployed version of the app and all it's services (no requests are intercepted or mocked in this case).

## Writing Feature Files

Test are written in `.feature` files using the [Gherkin](https://cucumber.io/docs/gherkin/) syntax and matched with, what would otherwise be, [Cypress spec files](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Test-Structure) using the [cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) library.

### Gherkin

Tests are of the form:

```gherkin
Feature: Feature Name

  Scenario: Scenario Name
    Given some precondition

    When some action
    Then some assertion
```

There may be multiple of each type of step in a test definition. These are to be prefixed with `And`. For example:

```gherkin
Feature: Feature Name

  Scenario: Scenario Name
    Given some precondition

    When some action
    And some other action
    And some other action
    Then some assertion
```

### Language

There is an evolving library of step definitions that give generic interaction and assertion capability when writing tests. In most cases these steps should handle most needs.

> If a capability is not available and it seems re-usable please consider writing the step in such a way that it can be re-used and add a definition.

#### Interactions

```regex
/the user presses the '(.*)' key[s]?/
```

```regex
/the user types '(.*)'( in to the (.*))?/
```

```regex
/the user (force )?clicks the (\w+)( element)?( with text '(.*)')?/
```

```regex
/the user clicks outside of the element/
```

```regex
/the user selects the '(.*)' option from the '(.*)' dropdown/
```

```regex
/the user( force)? checks the checkbox element with text '(.*)'/
```

```regex
/the user selects the file with name '(.*)'/
```

```regex
/the user populates the (\w+)( form)? with:/
```

```regex
/the user scrolls the (\w+) into view/
```

#### Assertions

```regex
/(the|a) (\w+)( element)?( with text '(._)')? (should|does) ([a-z.]+)( '(._)')?/
```

```regex
/there (is|are) (\d+) (\w+)( elements)?( with text '(.*)')?/
```

```regex
 /the (\w+)( element)?( with text '(.*)')? contains the following:/
```

```regex
/a file with the name '(.*)' should be downloaded/
```

```regex
/(the|a) '(.*)' request (is|has been) sent( with input:)?/
```

#### Setup

#### Helpers

```regex
/PAUSE/
```

```regex
/DEBUG/
```

### Step Definitions

Each line in a Scenario is matched with a corresponding **step definition** and it's **regular expression**.

#### Arguments

Regex [match groups](https://regexone.com/lesson/capturing_groups) are used to extract arguments and provide them to the matched step.

```gherkin
When the user presses the 'ctrl' key
```

Would then execute the following step:

```ts
When(/the user presses the '(.*)' key[s]?/, (keys: string) => {
  cy.get('body').type(keys);
});
```

#### Data Tables & Doc Strings

[Official docs](https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/cucumber-basics.md#arguments)

Step definitions may also be provided with [tabular data](https://cucumber.io/docs/gherkin/reference/#data-tables):

```gherkin
Given a table contains:
  | Cucumber     | Cucumis sativus |
  | Burr Gherkin | Cucumis anguria |
```

```ts
import { Given, DataTable } from '@badeball/cypress-cucumber-preprocessor';

Given(/^a table contains:$/, (table: DataTable) => {
  const expected = [
    ['Cucumber', 'Cucumis sativus'],
    ['Burr Gherkin', 'Cucumis anguria'],
  ];
  assert.deepEqual(table.raw(), expected);
});
```

Or with [doc strings](https://cucumber.io/docs/gherkin/reference/#doc-strings)

```gherkin
Feature: Feature Name

  Scenario: Scenario Name
    Then a request has been sent with:
      """
        {
            arg1: "some value",
            arg2: {
              arg3: "some nested value",
            }
        }
      """
```

```ts
Then(/a request has been sent with:/, (input: string) => {
  cy.wait(request).then(({ request }) => {
    const hasInput = _.matches(input)(req.body.variables);
    expect(hasInput).to.be.true;
  });
});
```

You may use features present in vanilla Cypress and inherited from [Mocha](https://docs.cypress.io/guides/references/bundled-libraries#Mocha) in feature files:

- describe()
- context()
- it()
- before()
- beforeEach()
- afterEach()
- after()
  .only()
  .skip()

#### Tags

`@focus`

`@skip`

`@e2e`

### Principals

### Intercepting Requests

Requests can be intercepted by:

1. Adding a fixture file to `fixtures/gql` or `fixtures/hierarchy`
2. Adding a matcher to `gql.matchers` or `hierarchy.matchers`

The `e2e.ts` file will do the rest.

Request intercepts can also be setup in your feature files:

```gherkin
Given we expect an 'exportAssortments' request with alias 'gql_exportAssortments' to be sent with input:
"""
{
    "input": {
        "assortmentIds": ["ATWIST100G"]
    }
}
"""
```

## Managing State

### QueryClient

## Debugging

### Request Assertions (comparison tables in console)

## End to End (or Testing in the real world)

## Cypress Cloud

## Gotchas

- Always use single-quotes `'` when using steps. This is to avoid having to catch both double and single and to allow the use of double quotes within captures (e.g '"some quote"').
  **Warning:** If you use double quotes your step may not get recognized and fail silently

### Links & Reading

- [Official Cypress Documentation](https://docs.cypress.io/guides/overview/why-cypress)
- [Cypress Cucumber Preprocessor on NPM](https://www.npmjs.com/package/cypress-cucumber-preprocessor)
- [Cypress Cucumber Preprocessor on Github](https://github.com/badeball/cypress-cucumber-preprocessor)
- [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro/)
