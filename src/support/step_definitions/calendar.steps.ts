import {
  Before,
  DataTable,
  Given,
  Then,
  When,
} from '@badeball/cypress-cucumber-preprocessor';
import { mapToNumber } from '@utils/primitives/object';
import { isNil } from 'lodash';
import {
  getCell,
  gqlIntercept,
  loadAssortments,
  slotUpdateInput,
  week,
} from '../cypress.utils';

// Navigate to calendar on scenarios tagged with @calendar
Before({ tags: '@calendar' }, () => {
  loadAssortments('calendar', ['ATWIST100G']);
});

Given(/the promotion in week (\d+) is selected/, (week: number) => {
  getCell(week).click();
});

Given(
  /we expect a slot update request with alias '(.*)' and parameters:/,
  (alias: string, table: DataTable) => {
    gqlIntercept({
      operation: 'setCalendarAssortments',
      // response: 'custom/gql_movePromotionSlot.json',
      alias,
      input: slotUpdateInput(table.hashes().map(mapToNumber)),
    });
  }
);

When(/the user selects the cell at week (\d+)/, (week: number) => {
  getCell(week).click();
});

When(
  /^the user moves a (\d+%\s)?promotion from week (\d+) to week (\d+)$/,
  (depth: string, source: number, target: number) => {
    /** If the user has specified a depth we can assert that it is present in the source slot */
    if (!isNil(depth)) {
      cy.get('[data-testid="SelectableCell"]')
        .eq(week(source))
        .should('contain', depth.trim());
    }

    /** @todo these waits are a temporary solution and should be replaced with assertions on some DOM condition. */
    // eslint-disable-next-line cypress/no-unnecessary-waiting -- This is terrible and needs to be removed ASAP.
    cy.wait(1000);
    /** Move source week to target week */
    cy.get('[data-testid="DraggableCell"]')
      .eq(week(source))
      .trigger('dragstart');
    /** @todo these waits are a temporary solution and should be replaced with assertions on some DOM condition. */
    // eslint-disable-next-line cypress/no-unnecessary-waiting -- This is terrible and needs to be removed ASAP. Unfortunately
    cy.wait(1000);

    cy.get('[data-testid="SelectableCell"]').eq(week(target)).trigger('drop');

    /** Wait for render */
    cy.get('[data-testid="SelectableCell"]')
      .eq(week(source))
      .should('not.contain', /\d+%/)
      .contains(depth.trim());
  }
);

Then(
  /the assortment row with id (.*) has (a|no) (\d+%\s)?promotion at week (\d+)/,
  (
    id: string,
    negative: 'a' | 'no',
    depth: string | undefined,
    weekNo: number
  ) => {
    /** Wait to for render */
    cy.get('[data-testid="SelectableCell"]').should((cells) => {
      const cell = cells[week(weekNo)];
      if (negative === 'no') {
        /** Check that the cell does not contain some "%" suffixed number */
        expect(cell).to.not.contain(/\d+%/);
      } else if (isNil(depth)) {
        expect(cell).to.not.be.empty;
      } else {
        expect(cell).to.contain(depth.trim());
      }
    });
  }
);

/**@todo this breaks on index 0 with detached dom errors.. */
Then(
  /the promotion in week (\d+) should (.*) '(.*)'/,
  (weekNo: number, assertion: string, value: string) => {
    cy.get('[data-testid="SelectableCell"]')
      .eq(week(weekNo))
      .should(assertion, value);
  }
);

Then(
  /the assortment row with the title '(.*)' has the following promotions:/,
  (title: string, table: DataTable) => {
    /** Wait to for render */
    cy.findByTestId('AssortmentRow')
      .contains(title)
      .get('[data-testid="SelectableCell"]')
      .should((cells) => {
        table.hashes().forEach(({ Week, Value }) => {
          const weekNo = week(Number(Week));
          const cell = cells[weekNo];
          expect(cell).to.contain(Value);
        });
      });
  }
);

Then(
  /the assortment row with the title '(.*)' has cells with the following styles:/,
  (title: string, table: DataTable) => {
    /** Wait to for render */
    cy.findByTestId('AssortmentRow')
      .contains(title)
      .get('[data-testid="FocusableCell"]')
      .should((cells) => {
        table.hashes().forEach(({ Week, Style, Value }) => {
          const weekNo = week(Number(Week));
          const cell = cells[weekNo];
          expect(cell).to.have.css(Style, Value);
        });
      });
  }
);
