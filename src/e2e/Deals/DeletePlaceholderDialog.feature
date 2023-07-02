Feature: DeletePlaceholderDialog

  Scenario: Delete only placeholder selected
    Given the deals page is open with the following filters [NPD-POPPINPOPCORNRTE] and the following scenarios [e154a08d-a74a-438b-b6c8-c0cbbea4c25e]
    Then the assortment-heading contains the following:
      | NPD-POPPINPOPCORNRTE |
      | POPPIN POPCORN RTE   |
    When the user clicks the button element with text 'Open NPD placeholder dropdown'
    And the user clicks the label element with text 'Delete placeholder'
    And the user clicks the button element with text 'Delete'
    Then a '@deletePlaceholders' request has been sent with input:
      """
      {
        "input": [
          "NPD-POPPINPOPCORNRTE"
        ]
      }
      """
    #    We expect the app to be reset if you delete the only document selected
    Then the current route is '/deals'

  @focus
  Scenario: Delete placeholder with multiple docs selected
    Given the deals page is open with the following filters [NPD-POPPINPOPCORNRTE,ATWIST100G] and the following scenarios [e154a08d-a74a-438b-b6c8-c0cbbea4c25e]
    When the user clicks the button element with text 'Open NPD placeholder dropdown'
    And the user clicks the label element with text 'Delete placeholder'
    And the user clicks the button element with text 'Delete'
    Then a '@deletePlaceholders' request has been sent with input:
      """
      {
        "input": [
          "NPD-POPPINPOPCORNRTE"
        ]
      }
      """
    #    If there are multiple documents, then we redirect to another assortment
    Then a assortment-heading with text 'ATWIST100G' should exist