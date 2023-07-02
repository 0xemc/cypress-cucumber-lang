Feature: Tab Navigation

    Scenario: Navigate from Deals to Calendar
        Given the deals page is open with the following filters [ATWIST100G]
        When the user clicks the tab element with text 'Calendar'
        Then there is 1 AssortmentNameCell with with text 'TWISTIES CHEESE 100G'

    Scenario: Navigate from Calendar to Deals
        Given the calendar page is open with the following filters [ATWIST100G]
        When the user clicks the tab element with text 'Deals'
        Then the assortment-heading should contain.text 'TWISTIES CHEESE 100G'