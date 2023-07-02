import { GQLFixtureMatcher } from "../cypress.types";

export const GQL_MATCHERS: GQLFixtureMatcher[] = [
  {
    operation: "operationName",
    alias: "operationAlias",
    response: "someFixture.json",
  },
];
