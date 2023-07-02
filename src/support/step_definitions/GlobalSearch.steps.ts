import { Then, When } from '@badeball/cypress-cucumber-preprocessor';
import capitalize from 'lodash/capitalize';
import without from 'lodash/without';
const listItems = ['AST', 'CAT', 'SCT', 'SEG', 'SUP', 'BRD'] as const;

/**
 * @example And the user filters by assortment
 */
When(
  /the user filters by (assortment|category|subcategory|segment|supplier|brand)/,
  (hierarchyType: string) => {
    cy.contains('button', capitalize(hierarchyType)).click();
  }
);

/**
 * @exanple only ast results are visible
 * @exanple only sct results are visible
 */
Then(/only (AST|CAT|SCT|SEG|SUP|BRD) results are visible/, (abbreviation) => {
  cy.get(
    `[data-testid="GlobalSearchList_results"][role="list"] [role="listitem"][aria-label="${abbreviation}"]`
  ).should('be.visible');
  without(listItems, abbreviation).forEach((listItem) => {
    cy.get(
      `[data-testid="GlobalSearchList_results"][role="list"] [role="listitem"][aria-label="${listItem}"]`
    ).should('not.exist');
  });
});
