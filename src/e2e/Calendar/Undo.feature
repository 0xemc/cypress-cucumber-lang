Feature: 6.1 Undo (Keyboard)

  Scenario: AC 6.1.1 Undo Move Promo
    Given the calendar page is open with the following filters [ATWIST100G]
    When the user moves a 50% promotion from week 5 to week 4
    And the user presses the '{ctrl}z' keys
    Then the assortment row with id ATWIST100G has a 50% promotion at week 5
    And the assortment row with id ATWIST100G has no promotion at week 4

  Scenario: AC 6.1.2 Undo Swap Promo
    Given the calendar page is open with the following filters [ATWIST100G]
    When the user moves a 50% promotion from week 5 to week 1
    And the user clicks the button element with text 'Swap'
    And the user presses the '{ctrl}z' keys
    Then the assortment row with id ATWIST100G has a 50% promotion at week 5
    And the assortment row with id ATWIST100G has a 32% promotion at week 1

  Scenario: AC 6.1.3 Undo Replace Promo
    Given the calendar page is open with the following filters [ATWIST100G]
    When the user moves a 50% promotion from week 5 to week 1
    And the user clicks the button element with text 'Replace'
    And the user presses the '{ctrl}z' keys
    Then the assortment row with id ATWIST100G has a 50% promotion at week 5
    And the assortment row with id ATWIST100G has a 32% promotion at week 1

  # Scenario: AC 6.1.4 - Undo Add Promo
  #   Given the calendar page is open with the following filters [ATWIST100G]
  #   When the user clicks the cell at week 2
  #   And the user clicks the td with text '$1.78'
  #   Then the assortment row with id ATWIST100G has a promotion at week 2

  # Scenario: AC 6.1.5 - Undo Delete Promo
  #   Given the calendar page is open with the following filters [ATWIST100G]
  #   And the assortment row with id ATWIST100G has a 25% promotion at week 1
  #   When the user clicks the cell at week 1
  #   And the user clicks the button with text 'Delete promo'
  #   And the user presses the '{ctrl}z' keys
  #   Then the assortment row with id ATWIST100G has a 25% promotion at week 1

  # Scenario: AC 6.1.6 - Undo Update Promo
  #   Given the calendar page is open with the following filters [ATWIST100G]
  #   When the user deletes a 29% promotion in week 2
  #   And the user presses the key ctrl+z
  #   Then the assortment row with id ATWIST100G has a 29% promotion at week 2

  # Scenario: AC 6.1.6 - Undo Update Promo via panel
  #   Given the calendar page is open with the following filters [ATWIST100G]
  #   And the user has selected a 29% promotion on week 1 with 
  #   And the edit promotion panel is open
  #   # When the sets the promotion dep
  #   And the user presses the key ctrl+z
  #   Then the assortment row with id ATWIST100G has a promotion at week 2