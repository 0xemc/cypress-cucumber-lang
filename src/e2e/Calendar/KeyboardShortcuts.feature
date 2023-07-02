Feature: KeyboardShortcuts

        Scenario: Delete a Promotion
                Given the calendar page is open with the following filters [ATWIST100G]
                And the assortment row with id ATWIST100G has a 32% promotion at week 1
                When the user selects the cell at week 1
                And the user presses the '{backspace}' key
                Then the assortment row with id ATWIST100G has no promotion at week 1