import {
  CyHttpMessages,
  Method,
  RouteMatcher,
} from "cypress/types/net-stubbing";
import gql from "graphql-tag";
import { isArray, isNil, matches, toNumber } from "lodash";
import { CYPRESS_EXTRA_LONG_WAIT } from "./cypress.constants";
import { GQLFixtureMatcher, RESTFixtureMatcher } from "./cypress.types";

// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (req, operationName) => {
  const { body } = req;

  /** @todo we on release branches there are requests being sent without a body,, */
  if (isNil(body.query)) {
    console.error(`body.query is empty for ${req}`);
    return false;
  }

  const query = gql`
    ${body.query}
  `;
  const definitionNode = query.definitions[0];
  if ("name" in definitionNode) {
    const reqName = definitionNode?.name?.value ?? "";
    return operationName === reqName;
  }
  return false;
};

// Utility to match GraphQL mutation based on the operation input
export const hasOperationInput = (req, input) => {
  return matches(input)(req.body.variables);
};

// Matcher for gql operations
export const gqlMatcher = (name: string, input?: unknown) => (req) => {
  const isMatchingOperation = hasOperationName(req, name);

  // Does the input supplied partially match the input supplied to the operation
  const isMatchingInput =
    isMatchingOperation && !!input && hasOperationInput(req, input);

  if (isMatchingOperation && !!input && !hasOperationInput(req, input)) {
    console.warn(`${name} request was matched with different input:`);
    console.warn("Expected: ", input);
    console.warn("Received: ", req.body.variables);
  }

  return !isNil(input) ? isMatchingInput : isMatchingOperation;
};

/** Creates an intercept for gql queries and mutations */
export const gqlIntercept = ({
  operation,
  response,
  alias,
  input,
}: GQLFixtureMatcher) => {
  cy.intercept(
    "POST",
    "**/graphql",
    aliasRequest(alias, gqlMatcher(operation, input), response)
  );
};

/** Creates an intercept for REST requests */
export const restIntercept =
  (method: Method, url: RouteMatcher) =>
  ({ matcher, response, alias }: RESTFixtureMatcher) => {
    cy.intercept(method, url, aliasRequest(alias, matcher, response)).as(alias);
  };

// Alias http requests with the provided fixture if the matcher is true
export const aliasRequest =
  (
    alias: string,
    matcher: (req: CyHttpMessages.IncomingHttpRequest) => boolean,
    fixture?: string
  ) =>
  (req) => {
    // No match, break early
    if (!matcher(req)) return;

    // Set the request alias
    req.alias = alias;

    // If a fixture is defined, return it
    if (fixture) {
      req.reply({ fixture });
    }
  };

/** @note Meta key implies Command or Windows key respectively */
export type ClickModifier = "alt" | "shift" | "meta";

export const CLICK_MODIFIERS: Record<
  ClickModifier,
  keyof Cypress.ClickOptions
> = {
  alt: "altKey",
  meta: "metaKey",
  shift: "shiftKey",
};

export const getElement = (
  role: string,
  selector: "id" | "text" | "value",
  value: string
) => {
  switch (selector) {
    case "id":
      return cy.findByRole(role).findByTestId(value);
    case "text":
      return cy.findByRole(role).findByText(value);
    case "value":
      return cy.findByRole(role).findByDisplayValue(value);
  }
};

export const clickElement = (
  el: JQuery<HTMLElement>,
  modifier: ClickModifier
) => {
  cy.wrap(el).click({ [CLICK_MODIFIERS[modifier]]: true });
};
