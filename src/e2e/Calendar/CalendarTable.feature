Feature: Calendar Table
    Background:
        Given the calendar page is open with the following filters [ATWIST100G]

    Scenario: View Hierarchy Details
        Given a SortableColumnHeader does not.exist
        When the user clicks the ExpandAssortmentColumns
        Then a columnheader element with text 'ID' should exist
        And a columnheader element with text 'Subcat' should exist
        And a columnheader element with text 'Segment' should exist
        And a columnheader element with text 'Supplier' should exist
        And a cell element with text 'ATWIST100G' should exist
        And a cell element with text 'CHIPS - SINGLE SERVE' should exist
        And a cell element with text 'EXTRUDED' should exist
        And a cell element with text 'SS_SMITHS' should exist

    Scenario: View Financial Summary
        Given there are 3 FinancialSummaryRow
        When the user clicks the ShowMoreFinancialsToggle
        Then there are 13 FinancialSummaryRow
        And the CalendarTable contains the following:
            | Promo GP $            |
            | Promo GP %            |
            | Non promo weeks sales |
            | Non promo GP $        |
            | Non promo GP %        |
            | Sales change %        |
            | Total GP % TY         |
            | Total GP % LY         |
            | GP change % TY        |
        When the user clicks the ShowMoreFinancialsToggle
        Then there are 3 FinancialSummaryRow
