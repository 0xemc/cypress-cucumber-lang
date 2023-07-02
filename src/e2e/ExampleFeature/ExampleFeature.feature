Feature: Example Feature

  Background:
    Given the some page is open
    And the IndexedDB is clear

  Scenario: Some Requirement
    When the user clicks the SearchBarInput
    And the user types 'Some Text'
    When the user clicks the NamedElement with text 'Some text is here'
    And the user clicks the button element with text 'Click this'
    And the user types 'Some more text'
    Then a named-element with text 'some text' should exist