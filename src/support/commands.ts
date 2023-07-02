import '@testing-library/cypress/add-commands';
import 'cypress-wait-until';

// Custom Command to execute Programatic authentication to NGP portal
Cypress.Commands.add('loginByGoogleApi', () => {
  cy.log('Logging in to Google');
  cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {
      grant_type: 'refresh_token',
      client_id: Cypress.env('googleClientId'),
      client_secret: Cypress.env('googleClientSecret'),
      refresh_token: Cypress.env('googleRefreshToken'),
    },
  }).then(({ body }) => {
    const { id_token } = body;
    cy.setCookie('GCP_IAAP_AUTH_TOKEN_A689432AAB6CFAEA', id_token);
  });
});

/**
 * Ignore the default network wait for requests if on dev
 * @todo find a way to check for requests but not intercept (i.e pass them through)
 */
Cypress.Commands.overwrite('wait', (fn, ...args) => {
  const islocal = Cypress.env('app_url').includes('localhost');
  if (islocal) {
    return fn(...args);
  }
  return;
});
