import { DataTable, When } from '@badeball/cypress-cucumber-preprocessor';

/**
 * Allows the user to enter any key combination as defined at:
 * https://docs.cypress.io/api/commands/type#Arguments
 */
When(/the user presses the '(.*)' key[s]?/, (keys: string) => {
  cy.get('body').type(keys);
});

When(
  /the user types '(.*)'( in to the (.*))?/,
  (keys: string, testId: string) => {
    const target = testId ? `[data-testid=${testId}]` : 'body';
    cy.get(target).type(keys);
  }
);

/**
 * Click on an element by data-testid and optional text content
 *
 * @example <div role="dialog" aria-label="Help Modal">
 * @example Then the dialog element with text 'Help Modal' should be.visible
 */
When(
  /the user (force )?clicks the ([^!.?\s]+)( element)?( with text '(.*)')?/,
  (force: string, roleOrId: string, isRole: string, value: string) => {
    if (isRole) {
      if (value) {
        cy.findByRole(roleOrId, {
          name: value,
        })
          .scrollIntoView()
          .click({ force: !!force });
      }
    } else {
      if (value) {
        cy.findAllByTestId(roleOrId).contains(value).click({ force: !!force });
      } else {
        cy.findByTestId(roleOrId).click({ force: !!force });
      }
    }
  }
);

When(/the user clicks outside of the element/, () => {
  cy.get('body').click(0, 0);
});

When(
  /the user selects the '(.*)' option from the '(.*)' dropdown/,
  (option: string, name: string) => {
    cy.findByRole('combobox', { name }).select(option);
  }
);

When(
  /the user( force)? checks the checkbox element with text '(.*)'/,
  (force: string, name: string) => {
    cy.findByRole('checkbox', { name }).check({ force: !!force });
  }
);

When(/the user selects the file with name '(.*)'/, (path: string) => {
  cy.get('input[type=file]').selectFile(path, { force: true });
});

/**
 *  Uses the id of elements within a form targetted by testid
 *  to enter data in bulk as if a user would
 *  Example input:
 *    When the user populates the AddPromotionForm with:
            | promotionName |  50% off promotion |
            | promoPrice |
 */
When(
  /the user populates the ([^!.?\s]+)( form)? with:/,
  (testId: string, _, table: DataTable) => {
    table.raw().forEach(([id, value]) => {
      cy.findByTestId(testId).find(`#${id}`).type(value);
    });
  }
);

When(
  /the user scrolls the ([^!.?\s]+)( element)?( with text '(.*)')? into view/,
  (roleOrId: string, isRole: string, value: string) => {
    if (isRole) {
      if (value) {
        cy.findByRole(roleOrId, { name: value }).scrollIntoView();
      }
    } else {
      cy.findByTestId(roleOrId).scrollIntoView();
    }
  }
);

// /**@todo extract click modifier from here and use in other steps */
// When(
//   /the user( \w)? clicks the (.*) with (id|text) "(.*)"/,
//   (
//     modifier: ClickModifier,
//     role: string,
//     selector: 'id' | 'text' | 'value',
//     value: string
//   ) => {
//     getElement(role, selector, value).click({
//       [CLICK_MODIFIERS[modifier]]: true,
//     });
//   }
// );
