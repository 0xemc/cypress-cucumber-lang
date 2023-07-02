Feature: FilterDrawer

    Background:
        Given the calendar page is open with the following filters [ATWIST100G]

    Scenario: Select Displayed Metrics
        When the user clicks the AssortmentNameCellExpand
        Then the MetricDetailRow with text 'Non promo units' should not.exist
        When the user clicks the button element with text 'Toggle Filter Drawer'
        And the user clicks the button element with text 'Metrics Expand Accordion'
        # @todo remove the force click
        And the user force clicks the checkbox element with text 'Non promo units'
        Then the MetricDetailRow with text 'Non promo units' should be.visible

    # @todo - the useCalendarAssortments hook is not being executed in the cypress environment. 
    # See https://woolworths-agile.atlassian.net/browse/NSPS2-7551
    @skip
    Scenario: Filter assortments by promo depth
        When the user clicks the button element with text 'Toggle Filter Drawer'
        And the user clicks the button element with text 'Filter by promo depth Expand Accordion'
        And the user selects the '0-10%' option from the 'Filter by promo depth' dropdown
        Then the row element with text 'ATWIST100G' should not.exist
        And the user selects the '30-40%' option from the 'Filter by promo depth' dropdown
        Then the row element with text 'ATWIST100G' should exist
        And the user selects the '10-20%' option from the 'Filter by promo depth' dropdown
        Then the row element with text 'ATWIST100G' should not.exist
        And the user selects the '40-50%' option from the 'Filter by promo depth' dropdown
        Then the row element with text 'ATWIST100G' should exist

# @todo - fix this functionality currently breaks
# And the user selects the '> 50%' option from the 'Filter by promo depth' dropdown
# Then the row element with text 'ATWIST100G' should not.exist