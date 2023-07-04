Feature: Some Feature

    Background:
        Given the 'http://localhost:5173/' url is loaded

    Scenario: Some Requirement
        When the user clicks the textbox element with text 'Name'
        And the user types 'Chuck'
        When the user clicks the textbox element with text 'Email'
        And the user types 'Norris'
        And the user clicks the button element with text 'Register'
        Then PAUSE