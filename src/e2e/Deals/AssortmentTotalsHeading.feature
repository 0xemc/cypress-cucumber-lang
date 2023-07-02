Feature: Deals - Assortment Totals heading

    Background:
        Given the deals page is open with the following filters [AHS5PK80G,ATWIST100G]

    Scenario: Switch Assortment Buttons (Next, Prev)
        When the user scrolls the assortment-heading into view
        Then the button element with text 'Prev' should be.disabled
        And the button element with text 'Next' should be.enabled
        And the paginationIndicator should have.text '1 of 2'
        When the user clicks the button element with text 'Next'
        Then the paginationIndicator should have.text '2 of 2'
        When the user clicks the button element with text 'Prev'
        Then the paginationIndicator should have.text '1 of 2'

    Scenario: Switch Assortment Dropdown
        When the user scrolls the assortment-heading into view
        Then the assortment-heading contains the following:
            | AHS5PK80G             |
            | HARVEST SNAPS 5PK 80G |
        When the user clicks the generic element with text 'select assortment dropdown'
        And the user clicks the button element with text 'ATWIST100G - TWISTIES CHEESE 100G'
        Then the assortment-heading contains the following:
            | ATWIST100G           |
            | TWISTIES CHEESE 100G |
        Then the paginationIndicator should have.text '2 of 2'

