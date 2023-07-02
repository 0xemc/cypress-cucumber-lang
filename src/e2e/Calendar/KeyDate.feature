Feature: Key Dates

  # @todo
  Scenario: Add a key date


#   /**
#    * Add key events
#    * @todo - this test causes an error with istanbul-lib-coverage, need to skip
#    * See: https://github.com/cypress-io/code-coverage/issues/216
#    */
#   it.skip('should allow the user to enter a note for a key date', function () {
#     const input = {
#       events: [
#         {
#           label: 'Hello',
#           weekStart: 2,
#           weekEnd: 2,
#         },
#       ],
#     };

#     gqlIntercept({
#       operation: 'setEventSchedule',
#       alias: 'gql_setEventSchedule',
#       input: { input },
#     });

#     //Wait for the network request
#     cy.wait('@listSchedules');

#     //Wait for the cells to render
#     cy.get('[data-testid=KeyDateCell]').should('have.length.at.least', 1);

#     cy.contains('[data-testid="CalendarTable"]', 'Key dates TY - visible to all').should(
#       'be.visible'
#     );
#     //Check the correct content is in the cell
#     cy.get('[data-testid=KeyDateCell]').eq(0).should('contain.text', 'Test');

#     // CLick a key date cell
#     cy.get('[data-testid=KeyDateCell]')
#       .eq(1)
#       .find('[data-testid=EditKeyDateButton]')
#       /**@todo add hover event to show button */
#       .click({ force: true });

#     // Type some text
#     cy.get('[data-testid=KeyDateCellTextArea]').type('Hello');
#     // CLick another key date cell to save
#     cy.get('[data-testid=KeyDateCell]').eq(2).click();

#     //Check for network request
#     cy.wait('@setEventSchedule').should('be.ok');
#   });