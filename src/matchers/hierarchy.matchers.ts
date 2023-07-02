import { RESTFixtureMatcher } from "../cypress.types";

export const RESTMatchers: RESTFixtureMatcher[] = [
  {
    alias: "someRequest",
    response: "example_rest_fixture.json",
    matcher: (request) =>
      (request.query.q === "*" || request.query.q === "") &&
      String(request.query.filter_by).includes("someValue"),
  },
];
