import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { gqlIntercept } from "../cypress.utils";

Given(/the '(.+)' url is loaded/, (url: string) => {
  cy.visit(url);
});

Given(
  /we expect an '(\w+)' request( with alias '(\w+)')?(to be sent with input:)?/,
  (operation: string, alias: string, hasInput: string, input: string) => {
    /** If our tests are running e2e then ignore network request assertions */
    const islocal = Cypress.env("app_url").includes("localhost");
    if (!islocal) return;

    gqlIntercept({
      operation,
      alias,
      input: hasInput ? JSON.parse(input) : undefined,
    });
  }
);

/** Set the date for the test */
Given(/the date is '(\d{4}-\d{2}-\d{2})'/, (date: string) => {
  cy.clock(new Date(date));
});

// This block clears the IndexedDB for a clean state before running tests
Given(/the IndexedDB is clear/, () => {});
