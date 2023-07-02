Feature: EditableProposedTable

    Background:
        Given the deals page is open with the following filters [ATWIST100G]

    Scenario: Edit existing promotion
    #       /** Edit deal sheet
    #    * @todo Currently breaks because of application error
    #    * remove .skip once https://woolworths-agile.atlassian.net/browse/NSPS2-3763 is resolved
    #    */
    #   it.skip('should allow the user to edit a promotion frequency, units per promo week etc.', function () {
    #     cy.get('[data-testid=edit-promotion-button]').click();
    #     cy.contains('[data-testid=save-dealsheet-button]', 'Save').should(
    #       'be.visible'
    #     );

    #     /** @todo update EditableProposedTable to have test ids or correct label for target cells, currently a fragile test*/
    #     //Get the first promotion row in the table
    #     cy.get('[data-testid=EditableProposedTable] tbody tr')
    #       .eq(1)
    #       .find('td input')
    #       .then((inputs) => {
    #         //Change the promotion name (first column of the table)
    #         cy.wrap(inputs.eq(0)).clear().type('Test Promo name');
    #         //Change the Total Frequency (fifth column of the table)
    #         cy.wrap(inputs.eq(1)).clear().type('6');
    #         //Change the H1 Frequency (sixth column of the table)
    #         cy.wrap(inputs.eq(2)).clear().type('6');
    #         //Change the Forecast unit percentage
    #         cy.wrap(inputs.eq(3)).clear().type('0.1%');
    #         //Change the scan funding
    #         cy.wrap(inputs.eq(4)).clear().type('0.32');
    #       });

    #     cy.get('[data-testid=save-dealsheet-button]').click();

    #     // Check for the mutation call
    #     cy.wait('@saveDealsheet').should('be.ok');

    #     cy.get('.q-message-success', { timeout: CYPRESS_EXTRA_LONG_WAIT }).should(
    #       'be.visible'
    #     );
    #   });

    Scenario: Trigger a forecast
    #     /** Manually trigger a forecast*/
    #   it('should allow the user to manually trigger a forecast', function () {
    #     cy.get('[data-testid=edit-promotion-button]').click();
    #     cy.contains('[data-testid=forecast-dealsheet-button]', 'Forecast').should(
    #       'be.visible'
    #     );

    #     /** @todo update EditableProposedTable to have test ids or correct label for target cells, currently a fragile test*/
    #     //Get the first promotion row in the table
    #     cy.get('[data-testid=EditableProposedTable] tbody tr')
    #       .eq(1)
    #       .find('td input')
    #       .then((inputs) => {
    #         //Change the Total Frequency (fifth column of the table)
    #         cy.wrap(inputs.eq(1)).clear().type('6');
    #       });

    #     cy.get('[data-testid=forecast-dealsheet-button]').click();

    #     // Check for the mutation call
    #     cy.wait('@forecastDealsheetAssortment').should('be.ok');

    #     cy.get('.q-message-success').scrollIntoView().should('be.visible');
    #   });

    Scenario: Cancel Editing dealsheet
# it('should cancel dealsheet when cancel is clicked', function () {
#     cy.get('[data-testid=edit-promotion-button]').click();
#     cy.contains('[data-testid=cancel-dealsheet-button]', 'Cancel').should(
#     'be.visible'
#     );

#     /** @todo update EditableProposedTable to have test ids or correct label for target cells, currently a fragile test*/
#     //Get the first promotion row in the table
#     cy.get('[data-testid=EditableProposedTable] tbody tr')
#     .eq(1)
#     .find('td input')
#     .then((inputs) => {
#         //Change the Total Frequency (fifth column of the table)
#         cy.wrap(inputs.eq(1)).clear().type('6');
#     });

#     cy.get('[data-testid=cancel-dealsheet-button]').click();

#     // Check for the refetching the original dealsheet call
#     cy.wait('@getDealsheetAssortmentById').should('be.ok');
# });