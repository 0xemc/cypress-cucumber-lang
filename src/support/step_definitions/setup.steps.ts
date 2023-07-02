import { Given } from '@badeball/cypress-cucumber-preprocessor';
import {
  clearQueryCache,
  gqlIntercept,
  loadAssortments,
} from '../cypress.utils';

Given(/^the (calendar|deals) page is open$/, (tab: string) => {
  cy.visit(Cypress.env('app_url') + `/${tab}`);
});

Given(
  /^the (calendar|deals) page is open with the following filters (\[([^!.?\s]+)\])( and the following scenarios \[([^!.?\s]+)\])?$/,
  (page: 'calendar' | 'deals', filters: string, scenarios?: string) => {
    clearQueryCache();
    loadAssortments(page, filters.split(','), scenarios?.split(','));
  }
);

Given(
  /we expect an '(\w+)' request( with alias '(\w+)')?(to be sent with input:)?/,
  (operation: string, alias: string, hasInput: string, input: string) => {
    /** If our tests are running e2e then ignore network request assertions */
    const islocal = Cypress.env('app_url').includes('localhost');
    if (!islocal) return;

    gqlIntercept({
      operation,
      alias,
      input: hasInput ? JSON.parse(input) : undefined,
    });
  }
);

Given(/the app is authenticated/, () => {
  cy.log('Google Auth for Dev Only');
  cy.loginByGoogleApi();
});

/** Set the date for the test */
Given(/the date is '(\d{4}-\d{2}-\d{2})'/, (date: string) => {
  cy.clock(new Date(date));
});
