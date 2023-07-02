Feature: Scenarios
  Background:
    Given the calendar page is open with the following filters [ATWIST100G]

  Scenario: Copy a Scenario
    When the user clicks the CreateScenarioButton
    And the user clicks the textbox element with text 'Scenario Name'
    And the user types 'Some Scenario Name'
    And the user clicks the textbox element with text 'Base scenario to copy'
    And the user clicks the option element with text 'Base'
    And the user clicks the button element with text 'Create'
    Then a '@createScenario' request is sent

  Scenario: Compare Scenarios
    When the user clicks the to-scenario-dropdown
    And the user clicks the button element with text 'Test Scenario'
    Then a '@getComparisonAssortments' request is sent
    And a '@getComparisonFinancialSummaries' request is sent
    And the ScenarioNameCell with text 'Test Scenario' should exist
    And a cell element with text 'Total sales TY - Test Scenario' should exist

  Scenario: Create a Blank Scenario
    When the user clicks the CreateScenarioButton
    And the user clicks the textbox element with text 'Scenario Name'
    And the user types 'Some Scenario Name'
    And the user clicks the button element with text 'Create as blank'
    And the user clicks the button element with text 'Create'
    Then a '@createScenario' request is sent

  Scenario: Default scenario is loaded
    Then there is 1 from-scenario-dropdown with text 'Base'

  Scenario: Change from scenario
    Given the assortment row with id ATWIST100G has no promotion at week 2
    When the user clicks the from-scenario-dropdown
    And the user clicks the button element with text 'Test Scenario'
    Then there is 1 from-scenario-dropdown with text 'Test Scenario'
    And the assortment row with id ATWIST100G has a 50% promotion at week 2

  Scenario: Read only scenario tag and banner
    Then there is 1 read-only-tag
    Then there is 1 read-only-banner
    And the user clicks the button element with text 'close-read-only-banner'
    Then there is 0 read-only-banner

  Scenario: Change from scenario
    Given the assortment row with id ATWIST100G has no promotion at week 2

    When the user clicks the from-scenario-dropdown
    And the user clicks the button element with text 'Test Scenario'
    Then there is 1 from-scenario-dropdown with text 'Test Scenario'
    And the assortment row with id ATWIST100G has a 50% promotion at week 2

  Scenario: Read only scenario tag and banner
    Then there is 1 read-only-tag
    Then there is 1 read-only-banner
    And the user clicks the button element with text 'close-read-only-banner'
    Then there is 0 read-only-banner

  # Temporarily skipped until displayHalfAtom is isolated from SlottingPeriodAtom
  @skip
  Scenario: Switch time period
    When the user clicks the time-period-dropdown
    And the user clicks the time-period-label with text 'FY24 H1'
    Then there is 1 time-period-dropdown with text 'FY24 H1'
    And a '@getFinancialSummaries' request is sent
    And a cell element with text 'W1' should exist
    And a cell element with text 'W27' should exist
    And a cell element with text 'W28' should not.exist
    And a cell element with text 'W52' should not.exist

  Scenario: Export scenario - blank
    When the user clicks the export-scenario-button
    And the user clicks the modalButtonExport
    Then a '@exportAssortments' request is sent
    And the 'export-scenario-modal' should not.exist

  Scenario: Export scenario - single supplier
    When the user clicks the export-scenario-button
    And the user clicks the textbox element with text 'Supplier'
    And the user types 'B2b product range'
    And the user clicks the option element with text 'B2b product range'
    And the user clicks the modalButtonExport
    Then a '@exportAssortments' request is sent
    And the 'export-scenario-modal' should not.exist

  Scenario: Export scenario - multiple supplier
    When the user clicks the export-scenario-button
    And the user clicks the textbox element with text 'Supplier'
    And the user types 'B2b product range'
    And the user clicks the option element with text 'B2b product range'
    And the user types 'Adhesive'
    And the user clicks the option element with text 'Adhesive tape'
    And the user clicks the modalButtonExport
    Then a '@exportAssortments' request is sent
    And the 'export-scenario-modal' should not.exist
