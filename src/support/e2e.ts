import '@cypress/code-coverage/support';
import mockFlags from '../fixtures/feature-flags.json';
import './commands';
import {
  MULTI_SEARCH_HIERARCHY_URL,
  SEARCH_HIERARCHY_URL,
} from './cypress.constants';
import { gqlIntercept, typesenseIntercept } from './cypress.utils';
import { GQL_MATCHERS } from './matchers/gql.matchers';
import {
  TYPESENSE_MULTISEARCH_MATCHERS,
  TYPESENSE_SEARCH_MATCHERS,
} from './matchers/hierarchy.matchers';

beforeEach(() => {
  const islocal = Cypress.env('app_url').includes('localhost');
  /** If running locally we want to mock and intercept network requests */
  if (islocal) {
    /** Feature Flags */
    featureflags();
    /** User */
    user();
    /** Info */
    info();
    /** Typesense */
    typesense();
    /** GQL */
    gql();
  } else {
    /** Targeting a real environment so we need to authenticate */
    cy.loginByGoogleApi();
  }
});
/**
 * Turn off uncaught exception handling
 * see: https://docs.cypress.io/api/cypress-api/catalog-of-events#To-turn-off-all-uncaught-exception-handling
 */
Cypress.on('uncaught:exception', (err) => {
  console.error(err);
  return false;
});

// ----- Feature Flags ---- //
function featureflags() {
  //Mock NGP Flags
  cy.intercept('GET', '**/feature-flags', { fixture: 'feature-flags' }).as(
    'featureFlags'
  );

  //Mock LD JS SDK flags
  cy.intercept('GET', '**/app.launchdarkly.com/**', (req) => {
    req.reply(mockFlags);
  });
  //@todo we may need to include a mock for clientstream.launchdarkly.com
}

// ----- User ---- //
function user() {
  cy.intercept('GET', '**/user', { fixture: 'user' }).as('user');
}

// ----- Info ---- //
function info() {
  cy.intercept('GET', '**/info', { fixture: 'info' }).as('info');
}

// ----- TypeSense ---- //
function typesense() {
  /** Match Plain Searches */
  TYPESENSE_SEARCH_MATCHERS.forEach(
    typesenseIntercept('GET', SEARCH_HIERARCHY_URL)
  );

  /** Match Multi Searches */
  TYPESENSE_MULTISEARCH_MATCHERS.forEach(
    typesenseIntercept('POST', MULTI_SEARCH_HIERARCHY_URL)
  );
}

// ----- GraphQL ---- //
function gql() {
  // General catch all intercepts
  GQL_MATCHERS.forEach(gqlIntercept);
}
