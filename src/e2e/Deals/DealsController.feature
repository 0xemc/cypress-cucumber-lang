Feature: DealsController

    Background:
        Given the deals page is open with the following filters [ATWIST100G]

    Scenario: Loads correctly
        Then the assortment-heading contains the following:
            | ATWIST100G           |
            | TWISTIES CHEESE 100G |
        Then the assortment-heading should contain 'ATWIST100G'
        And the '@getScenarios' request is sent
        And the '@getDealsheetAssortmentById' request is sent
        And the '@getFinancialSummaries' request is sent
    @skip
    Scenario: Paging through assortments

    @skip
    Scenario: Supplied Assortment Number in URL