import { DataTable, Then } from "@badeball/cypress-cucumber-preprocessor";
import { CYPRESS_EXTRA_LONG_WAIT } from "../cypress.constants";
import { hasOperationInput } from "../cypress.utils";

Then(
  /(the|a) ([^!.?\s]+)( element)?( with text '(.*)')? (should|does) ([a-z.]+)( '(.*)')?/,
  (
    _,
    roleOrId: string,
    isRole: string,
    value: string,
    __,
    assertion: string,
    check: string
  ) => {
    if (isRole) {
      if (value) {
        cy.findByRole(roleOrId, {
          name: value,
          /**@todo remove these extra long waits */
          timeout: CYPRESS_EXTRA_LONG_WAIT,
        }).should(assertion, check);
      }
    } else {
      if (value) {
        /**@todo fix an issue here when checking for 'not.exist' and there are 0 of the named elements in the dom */
        cy.findAllByTestId(roleOrId).contains(value).should(assertion, check);
      } else {
        cy.findByTestId(roleOrId).should(assertion, check);
      }
    }
  }
);

Then(
  /there (is|are) (\d+) ([^!.?\s]+)( elements)?( with text '(.*)')?/,
  (_, count: number, roleOrId: string, isRole: string, value: string) => {
    if (isRole) {
      cy.findByRole(roleOrId, {
        name: value,
        /**@todo remove these extra long waits */
        timeout: CYPRESS_EXTRA_LONG_WAIT,
      }).should("have.length", count);
    } else {
      if (value) {
        cy.findAllByTestId(roleOrId)
          .contains(value)
          .should("have.length", count);
      } else {
        cy.findAllByTestId(roleOrId).should("have.length", count);
      }
    }
  }
);

Then(
  /the ([^!.?\s]+)( element)?( with text '(.*)')? contains the following:/,
  (roleOrId: string, isRole: string, value: string, table: DataTable) => {
    if (isRole) {
      if (value) {
        cy.findByRole(roleOrId, { name: value }).then((element) =>
          table.raw().forEach(([value]) => expect(element).to.contain(value))
        );
      }
    } else {
      if (value) {
        cy.findAllByTestId(roleOrId)
          .contains(value)
          .then((element) =>
            table.raw().forEach(([value]) => expect(element).to.contain(value))
          );
      } else {
        cy.findByTestId(roleOrId).then((element) =>
          table.raw().forEach(([value]) => expect(element).to.contain(value))
        );
      }
    }
  }
);

Then(/a file with the name '(.*)' should be downloaded/, (name: string) => {
  cy.readFile(Cypress.config("downloadsFolder") + "/" + name).should("exist");
});

Then(
  /(the|a) '(.*)' request (is|has been) sent( with input:)?/,
  (_, request: string, __, checkInput: string, input: string) => {
    /** If our tests are running e2e then ignore network request assertions */
    const islocal = Cypress.env("app_url").includes("localhost");
    if (!islocal) return;

    cy.wait(request).then(({ request }) => {
      if (checkInput) {
        const hasInput = hasOperationInput(request, JSON.parse(input));
        if (!hasInput) {
          /* eslint-disable no-restricted-syntax -- debugging */
          console.table(request.body.variables);
          console.table(JSON.parse(input));
          /* eslint-enable no-restricted-syntax -- debugging */

          cy.log(`Expected the ${request} to contain:`, JSON.parse(input));
          cy.log(`But received ${request} with:`, request.body.variables);
        }
        expect(hasInput).to.be.true;
      } else {
        expect(request).to.be.ok;
      }
    });
  }
);

Then(
  /the following elements (should|does) ([a-z.]+):/,
  (_, assertion: string, table: DataTable) => {
    table.raw().forEach(([testId, value]) => {
      cy.findByTestId(testId).contains(value).should(assertion, value);
    });
  }
);

Then(/the current route is '([a-z./]*)'/, (route) => {
  cy.location("pathname").should("equal", route);
});
