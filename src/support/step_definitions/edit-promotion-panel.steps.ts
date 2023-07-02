import { Given, When } from '@badeball/cypress-cucumber-preprocessor';
import { week } from '../../support/cypress.utils';

Given(
  /^the EditPromotionPanel is open for the promotion in week (\d+)$/,
  (weekNo: number) => {
    // Click the 5th week
    cy.get('[data-testid="SelectableCell"]').eq(week(weekNo)).click();

    // Select see more edit options
    cy.get('[data-testid="SeeMoreEditOptions"]').click();

    // Wait for network request
    cy.wait('@getPromotionsForAssortment');

    // Check for the correct heading
    cy.get('[data-testid="EditPromotionPanel"]')
      .find('[role="heading"][aria-level="2"]')
      .should('contain.text', 'ATWIST100G - TWISTIES CHEESE 100G');
  }
);

When(/^the user opens the EditPromotionPanel$/, () => {
  // Select see more edit options
  cy.get('[data-testid="SeeMoreEditOptions"]').click();

  // Wait for network request
  cy.wait('@getPromotionsForAssortment');

  // Check for the correct heading
  cy.get('[data-testid="EditPromotionPanel"]')
    .find('[role="heading"][aria-level="2"]')
    .should('contain.text', 'ATWIST100G - TWISTIES CHEESE 100G');
});
