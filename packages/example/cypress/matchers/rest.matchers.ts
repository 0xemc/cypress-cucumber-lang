import { RESTFixtureMatcher } from "cypress-cucumber-lang/dist/cypress.types";

export const REST_MATCHERS: RESTFixtureMatcher[] = [
  {
    alias: "sandwichSearch",
    // response: "example_rest_fixture.json",
    matcher: (request) => {
      console.log(JSON.parse(JSON.stringify(request.query)));
      return request.query.query === "sandwiches";
    },
  },
];
