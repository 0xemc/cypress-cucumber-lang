Feature: PromotionSlots

  Background:
    Given the calendar page is open with the following filters [ATWIST100G] and the following scenarios [e154a08d-a74a-438b-b6c8-c0cbbea4c25e]

  Scenario: Move Promotion
    When the user moves a 50% promotion from week 5 to week 2
    Then the assortment row with id ATWIST100G has a 50% promotion at week 2
    And the assortment row with id ATWIST100G has no promotion at week 5

  Scenario: Swap Promotion
    Given the assortment row with id ATWIST100G has a 32% promotion at week 1

    When the user moves a 50% promotion from week 5 to week 1
    And the user clicks the button element with text 'Swap'
    Then the assortment row with id ATWIST100G has a 32% promotion at week 5
    And the assortment row with id ATWIST100G has a 50% promotion at week 1

  Scenario: Replace Promotion
    Given the assortment row with id ATWIST100G has a 32% promotion at week 1

    When the user moves a 50% promotion from week 5 to week 1
    And the user clicks the button element with text 'Replace'
    Then the assortment row with id ATWIST100G has a 50% promotion at week 1
    And the assortment row with id ATWIST100G has no promotion at week 5

  Scenario: Add Promotion to Slot
    When the user selects the cell at week 2
    And the user clicks the PromotionOptionRow with text '37%'
    Then the assortment row with id ATWIST100G has a 37% promotion at week 2

  Scenario: Remove Promotion from Slot
    Given the assortment row with id ATWIST100G has a promotion at week 1

    When the user selects the cell at week 1
    And the user clicks the DeletePromotionButton
    Then the assortment row with id ATWIST100G has no promotion at week 1

  Scenario: Update Promotion Slot Depth
    Given the assortment row with id ATWIST100G has a 32% promotion at week 1

    When the user selects the cell at week 1
    And the user clicks the PromotionOptionRow with text '37%'
    Then the assortment row with id ATWIST100G has a 37% promotion at week 1

  Scenario: Online Promotion
    Given the assortment with id ATWIST100G has promotions with the following attributes:
      | Week | Attribute     | Value  | Attribute         | Value |
      | 31   | promotionType | ONLINE | promotionSlotType | NONE  |
    Then the promotion in week 31 should contain 'O'


#@todo comparison slots
#   /** Editing a comparison slot */
#   it('should allow the user to move a comparison slot to a different week, including swap and replace', function () {
#     // Test specific intercept
#     gqlIntercept({
#       operation: 'setCalendarAssortments',
#       response: 'custom/gql_moveComparisonPromotionSlot.json',
#       alias: `gql_moveComparisonPromotionSlot`,
#       input: slotUpdateInput([
#         { weekNo: 1, depth: 0 },
#         { weekNo: 2, depth: 25 },
#       ]),
#     });

#     /** Check the cells of the second row */
#     cy.get('[data-testid=AssortmentRow]')
#       .contains('tr', 'Test Scenario')
#       .find('[data-testid="DraggableCell"]')
#       .then((cells) => {
#         expect(cells[week(1)]).to.contain('25%');
#         expect(cells[week(2)]).to.contain('');
#       });

#     /** Move week 1 to week 2 */
#     cy.get('[data-testid=AssortmentRow]')
#       .contains('tr', 'Test Scenario')
#       .find('[data-testid="DraggableCell"]')
#       .eq(week(1))
#       .trigger('dragstart');

#     /** Wait for the target cell to become visible to drop */
#     cy.get('[data-testid=AssortmentRow]')
#       .contains('tr', 'Test Scenario')
#       .find('[data-testid="DraggableCell"]')
#       .eq(week(2))
#       .should('be.visible');

#     cy.get('[data-testid=AssortmentRow]')
#       .contains('tr', 'Test Scenario')
#       .find('[data-testid="DraggableCell"]')
#       .eq(week(2))
#       .trigger('drop');

#     cy.wait(['@moveComparisonPromotionSlot']);

#     cy.get('[data-testid=AssortmentRow]')
#       .contains('tr', 'Test Scenario')
#       .find('[data-testid="DraggableCell"]')
#       .then((cells) => {
#         expect(cells[week(1)]).to.contain('');
#         expect(cells[week(2)]).to.contain('25%');
#       });

#     /** @todo swap */
#     /** @todo replace */
#   });