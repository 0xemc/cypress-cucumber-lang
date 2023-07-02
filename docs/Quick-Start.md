# Quick Start

## Running tests

To run any existing test locally:

<!-- ![Cypress welcome](./images/welcome-screen.png 'Cypress welcome screen') -->

1. `npm run test:cypress`
2. From the welcome screen, select **E2E Testing**
3. Choose your available browser **(Chrome is recommended)**
4. Click **"Start E2E Testing in.."**

<!-- ![Feature List](./images/feature-list.png 'Feature list') -->
<img src="cypress/images/feature-list.png" alt="Feature list" width="700" height="400">

5. Select the feature that you wish to test.

<!-- ![Running tests](./images/running-tests.png 'Running tests') -->
<img src="cypress/images/running-tests.png" alt="Running tests" width="570" height="400">

6. The test will begin to execute in the same window.

## Writing a new test

As an example, let's write a test that **creates a new Scenario**

1. Navigate to https://lb.dev.ngp.wiqretail.com
2. Manually add a new scenario with the name **A New Scenario Name**, taking note of the **ids** or **text** of elements that are used and how you executed the flow.

   - We launch the modal with the `CreateScenarioButton` button
   - We entered our new scenario name in to the **text input** with the label `Scenario Name`
   - We clicked the button with the text `Create as blank" and then clicked the button with text `Create`

3. Capture any requests that we want to check for via the `network` tab of the browser DevTools. In this case we want to confirm that a `createScenario` mutation is sent that looks a little like:

```json
{
  "categoryCode": "558",
  "name": "A New Scenario Name",
  "periodStart": "2023-01",
  "periodEnd": "2023-12"
}
```

4. Add a new `.feature` file to `cypress/e2e/CreateScenario.feature`.
5. Using the information we captured from the app, include the following in your new test file:

```gherkin
Feature: Create a new Scenario

  Background:
    Given the calendar page is open with the following filters [ATWIST100G]

  Scenario: Create a Blank Scenario
    When the user clicks the CreateScenarioButton
    And the user clicks the textbox element with text 'Scenario Name'
    And the user types 'A New Scenario Name'
    And the user clicks the button element with text 'Create as blank'
    And the user clicks the button element with text 'Create'
    Then a '@createScenario' request has been sent with input:
      """
      {
        "createInput": {
          "name": "A New Scenario Name"
        }
      }
      """
```

6. Run `npm run test:cypress`
7. Select our newly created **CreateScenario** test
8. Our test should pass and look a little like this:

<!-- ![Passing tests](./images/passing-test.png 'Passing test') -->
<img src="cypress/images/passing-test.png" alt="Passing test" width="600" height="400">
