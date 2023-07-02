import { PromotionSlotInput, SetCalendarAssortmentsInput } from '@graphqlTypes';
import {
  CyHttpMessages,
  Method,
  RouteMatcher,
} from 'cypress/types/net-stubbing';
import gql from 'graphql-tag';
import { isArray, isNil, matches, toNumber } from 'lodash';
import {
  CYPRESS_EXTRA_LONG_WAIT,
  STARTING_FINANCIAL_WEEK,
  WEEKS_IN_YEAR,
} from './cypress.constants';
import { GQLFixtureMatcher, TypesenseFixtureMatcher } from './cypress.types';

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
  if ('name' in definitionNode) {
    const reqName = definitionNode?.name?.value ?? '';
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
    console.warn('Expected: ', input);
    console.warn('Recieved: ', req.body.variables);
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
    'POST',
    '**/graphql',
    aliasRequest(alias, gqlMatcher(operation, input), response)
  );
};

/** Creates an intercept for Typesense requests */
export const typesenseIntercept =
  (method: Method, url: RouteMatcher) =>
  ({ matcher, response, alias }: TypesenseFixtureMatcher) => {
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

/**
 * Navigate to the specified tab with the target assortments filtered
 * @note extraParams are any extra parameters required (e.g "assortmentNo=1")
 */
export const loadAssortments = (
  tab: 'calendar' | 'deals',
  assortments: string[],
  scenarios?: string[],
  ...extraParams: string[]
) => {
  const filterString = `?filters=%5B%22${assortments.join('%22%2C%22')}%22%5D`;
  const scenarioString = scenarios
    ? `&scenarios=%5B%22${scenarios.join('%22%2C%22')}%22%5D`
    : '';
  const paramsString = extraParams ? `&${extraParams.join('&')}` : '';

  cy.visit(
    Cypress.env('app_url') +
      `/${tab}` +
      filterString +
      scenarioString +
      paramsString
  );

  /** Determine which UI element to use to wait for load */
  const loadCheckId =
    tab === 'calendar' ? 'AssortmentRow' : 'lastyear-actuals-table';

  /** Wait for the UI to load the target element */
  cy.get(`[data-testid=${loadCheckId}]`, {
    timeout: CYPRESS_EXTRA_LONG_WAIT,
  })
    .scrollIntoView()
    .should('have.length.at.least', 1);
};

/** Convert a given slotting week no to an array index given the slotting week that the calendar starts on */
export const week = (number: number) =>
  toNumber(number) >= STARTING_FINANCIAL_WEEK
    ? toNumber(number) - STARTING_FINANCIAL_WEEK
    : WEEKS_IN_YEAR - STARTING_FINANCIAL_WEEK + toNumber(number); //Because we are rotating the array

type SetCalendarAssortmentsUpdate = {
  input: DeepPartial<SetCalendarAssortmentsInput>;
};

/** Generate a test object for setCalendarAssortments promotionSlotType */
export const slotUpdateInput = (
  update: Partial<PromotionSlotInput>[] | Partial<PromotionSlotInput>
): SetCalendarAssortmentsUpdate => ({
  input: {
    assortmentPromotions: [
      {
        promotionSlots: isArray(update) ? update : [update],
      },
    ],
  },
});

export const getCell = (weekNo: number) =>
  cy.get('[data-testid="SelectableCell"]').eq(week(weekNo));

/** @note Meta key implies Command or Windows key respectively */
export type ClickModifier = 'alt' | 'shift' | 'meta';

export const CLICK_MODIFIERS: Record<
  ClickModifier,
  keyof Cypress.ClickOptions
> = {
  alt: 'altKey',
  meta: 'metaKey',
  shift: 'shiftKey',
};

export const getElement = (
  role: string,
  selector: 'id' | 'text' | 'value',
  value: string
) => {
  switch (selector) {
    case 'id':
      return cy.findByRole(role).findByTestId(value);
    case 'text':
      return cy.findByRole(role).findByText(value);
    case 'value':
      return cy.findByRole(role).findByDisplayValue(value);
  }
};

export const clickElement = (
  el: JQuery<HTMLElement>,
  modifier: ClickModifier
) => {
  cy.wrap(el).click({ [CLICK_MODIFIERS[modifier]]: true });
};

// Clear the query cache of the React Query client
export const clearQueryCache = () => {
  cy.window().then((window) => {
    const queryClient = window.queryClient;
    // Cancel any active queries
    queryClient?.cancelQueries();
    // Clear the cache
    queryClient?.clear();
  });
};
