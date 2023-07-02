import "@cypress/code-coverage/support";
import "./commands";
import { gqlIntercept, restIntercept } from "./cypress.utils";
import { GQL_MATCHERS } from "./matchers/gql.matchers";
import { RESTMatchers } from "./matchers/hierarchy.matchers";

beforeEach(() => {
  /** Rest */
  rest();
  /** GQL */
  gql();
});

/**
 * Turn off uncaught exception handling
 * see: https://docs.cypress.io/api/cypress-api/catalog-of-events#To-turn-off-all-uncaught-exception-handling
 */
Cypress.on("uncaught:exception", (err) => {
  console.error(err);
  return false;
});

// ----- REST ---- //
function rest() {
  /** Match Plain Searches */
  RESTMatchers.forEach(restIntercept("GET", "**"));
}

// ----- GraphQL ---- //
function gql() {
  // General catch all intercepts
  GQL_MATCHERS.forEach(gqlIntercept);
}
