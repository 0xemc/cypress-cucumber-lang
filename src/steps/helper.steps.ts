import { When } from '@badeball/cypress-cucumber-preprocessor';
import { logRoles } from '@testing-library/dom';

When(/PAUSE/, () => {
  cy.pause();
});
When(/DEBUG/, () => {
  cy.get('body').then((el) => logRoles(el.get(0)));
});
