Feature: Some Feature

    Background:
        Given the 'http://localhost:5173/' url is loaded

    Scenario: Some Requirement
        When the user clicks the textbox element with text 'Name'
        And the user types 'Chuck Norris'
        When the user clicks the textbox element with text 'Email'
        And the user types 'chuck@hotmail.com'
        And the user clicks the button element with text 'Register'
        When the user clicks the textbox element with text 'searchText'
        And the user types 'sandwiches'
        And the user clicks the button element with text 'Save Text'
        Then a '@sandwichSearch' request has been sent
