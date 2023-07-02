@mutates
Feature: EditPromotionPanel

  Background:
    Given the calendar page is open with the following filters [ATWIST100G] and the following scenarios [e154a08d-a74a-438b-b6c8-c0cbbea4c25e]
    And the assortment with id ATWIST100G has promotions with the following attributes:
      | Week | Attribute | Value | Attribute         | Value | Attribute            | Value     |
      | 1    | depth     | 12    | promotionSlotType | NONE  | dealSheetPromotionId | 1         |
      | 2    | depth     | 32    | promotionSlotType | NONE  | dealSheetPromotionId | 1         |


  # Edit Slots (price point, depth, frequency)
  # should allow the user to change the price point/depth for a promotion slot
  Scenario: Edit Promotion Depth
    Given the EditPromotionPanel is open for the promotion in week 1
    When the user clicks the OpenEditPromotionDropdownButton
    And the user clicks the row element with text '$1.64 32% 8 $0.44'
    And the user clicks outside of the element
    Then the '@setCalendarAssortments' request is sent
    And the assortment row with id ATWIST100G has a 32% promotion at week 1

  Scenario: Assign Display, Brochure or Both
    Given the EditPromotionPanel is open for the promotion in week 1
    When the user clicks the EditPromoDisplayLabel
    Then the promotion in week 1 should contain 'D'

    When the user clicks the EditPromoBrochureLabel
    Then the promotion in week 1 should contain 'B'
    And the promotion in week 1 should contain 'D'

    When the user clicks the EditPromoDisplayLabel
    Then the promotion in week 1 should contain 'B'
    And the promotion in week 1 should not.contain 'D'

  Scenario: Add Notes
    Given the EditPromotionPanel is open for the promotion in week 1
    When the user clicks the add-comment-text-area
    And the user types 'this is a new note'
    And the user presses the '{enter}' key
    Then the comments-note-container should contain 'this is a new note'

  Scenario: Update promotion status
    Given the EditPromotionPanel is open for the promotion in week 1
    When the user clicks the edit-promo-panel-status
    And the user clicks the button element with text 'Aligned'
    Then the edit-promo-panel-status should contain 'Aligned'

  Scenario: Update promotion week to an empty slot
    # # Empty slot in week 3 dependency
    Given the assortment with id ATWIST100G has promotions with the following attributes:
      | Week | Attribute            | Value     |
      | 3    | dealSheetPromotionId | undefined |
    And the EditPromotionPanel is open for the promotion in week 2
    When the user clicks the edit-promotion-panel-day-picker
    And the user clicks the gridcell element with text '12'
    And the user clicks the button element with text 'Done'
    Then the promotion in week 3 should contain '32%'

  Scenario: Update promotion week to an existing slot
    # Populated slot in week 3 dependency
    Given the assortment with id ATWIST100G has promotions with the following attributes:
      | Week | Attribute | Value | Attribute            | Value |
      | 3    | depth     | 12    | dealSheetPromotionId | 1     |
    Given the EditPromotionPanel is open for the promotion in week 2
    When the user clicks the edit-promotion-panel-day-picker
    And the user clicks the gridcell element with text '12'
    And the user clicks the edit-promotion-done-button
    And the user clicks the modalButtonSwap
    Then the promotion in week 3 should contain '32%'
