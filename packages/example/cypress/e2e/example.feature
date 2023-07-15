Feature: Some Feature

    Background:
        Given the 'https://my-app.com' url is loaded

    Scenario: Some Requirement
        When the user clicks the textbox element with text 'Name'
        And the user types 'Chuck Norris'
        And the user clicks the button element with text 'Search'
        Then a '@search' request has been sent with input:
            """
            {
                "query": "Chuck Norris"
            }
            """"
