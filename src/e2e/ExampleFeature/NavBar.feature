Feature: NavBar

  Background:
    Given the calendar page is open

  Scenario: Open Help Modal
    When the user clicks the SearchBarHelp
    Then the dialog element with text 'Help Modal' should be.visible

  Scenario: Open Metrics Calculation Help Modal
    When the user clicks the SearchBarHelp
    Then the dialog element with text 'Help Modal' should be.visible

    When the user clicks the button element with text 'Metrics calculation'
    Then the dialog element with text 'Definition List Dialog' should be.visible

  Scenario: Open Shortcuts Help Modal
    When the user clicks the SearchBarHelp
    Then the dialog element with text 'Help Modal' should be.visible

    When the user clicks the button element with text 'Shortcuts'
    Then the dialog element with text 'Shortcuts Modal' should be.visible
