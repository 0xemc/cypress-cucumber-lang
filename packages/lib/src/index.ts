import { GQLFixtureMatcher, RESTFixtureMatcher } from "./cypress.types";
import { gqlIntercept, restIntercept } from "./cypress.utils";
import "@testing-library/cypress/add-commands";

type CypressCucumberLangConfig = {
  gqlMatchers?: GQLFixtureMatcher[];
  restMatchers?: RESTFixtureMatcher[];
};

export const init = (config?: CypressCucumberLangConfig) => {
  /** Setup intercepts */
  before(() => {
    /** Rest Matchers */
    rest(config.restMatchers);
    /** GQL Matchers */
    gql(config.gqlMatchers);
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
  function rest(matchers: RESTFixtureMatcher[]) {
    /**
     *  Match Plain Searches
     *  @todo configure for other methods (POST, PUT etc)
     */
    matchers.forEach(restIntercept("GET", "**"));
  }

  // ----- GraphQL ---- //
  function gql(matchers: GQLFixtureMatcher[]) {
    matchers.forEach(gqlIntercept);
  }
};
