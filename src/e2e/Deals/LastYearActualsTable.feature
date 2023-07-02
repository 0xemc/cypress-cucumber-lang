Feature: Last Year Actuals Table

    Background:
        Given the deals page is open with the following filters [ACADBURYF]

    Scenario: Last year actuals table maximise/collapse validation
        When the user scrolls the button element with text 'Maximise Last year actuals' into view
        Then the lastyear-actuals-table should be.visible
        When the user clicks the button element with text 'Maximise Last year actuals'
        Then the lastyear-actuals-table should not.exist
        When the user clicks the button element with text 'Maximise Last year actuals'
        Then the lastyear-actuals-table should be.visible
    
    @focus
    Scenario: Last year actuals Promotion totals and Totals by 52 weeks validation
        When the user scrolls the button element with text 'Maximise Last year actuals' into view
        Then the lastyear-actuals-table should be.visible
        Given the promotions for PREVIOUS_CALENDAR_YEAR is set with the following values:
            | depth | label | price | promotionId                          | brochure | gondola | scanFunding | wowFunding | frequency                       | absoluteNetCost | adjustmentPercent | fundingRatePercent | isMultibuy | multibuyQuantity | multibuyRedemption | multibuyRedemptionPercent | promotionType |
            | 21    | 21%   | 1.64  | eec8f774-5d35-4cf9-99c3-11c553b97db7 | 2        | 1       | 0.40        | 0.20       | {"h1": 7, "h2": 5, "total": 12} | 0               | 0                 | 52.9               | false      | 1                | 0                  | 100                       | IN_STORE      |
            | 31    | 31%   | 1.84  | 8b66380b-423b-499b-998a-116717a899ae | 1        | 2       | 0.20        | 0.60       | {"h1": 6, "h2": 5, "total": 11} | 0               | 0                 | 52                 | false      | 1                | 0                  | 100                       | IN_STORE      |
        Given the promotions Slotting Financials for PREVIOUS_CALENDAR_YEAR is set with the following values:
            | promotionId                          | Attribute | Value  | Attribute   | Value  | Attribute | Value  |
            | eec8f774-5d35-4cf9-99c3-11c553b97db7 | sales     | 900000 | grossProfit | 290000 | units     | 334198 |
            | 8b66380b-423b-499b-998a-116717a899ae | sales     | 900000 | grossProfit | 290000 | units     | 285755 |
        Given the shelfPrice for PREVIOUS_CALENDAR_YEAR is set with the following values:
            | depth | label | price | brochure | gondola | scanFunding | wowFunding | frequency                         | absoluteNetCost | adjustmentPercent | fundingRatePercent |
            | 0     | null  | 3.8   | 0        | 0       | 0           | 0          | {"h1": 17, "h2": 12, "total": 29} | 1.88            | 0                 | 0                  |
        Given the shelfPrice Slotting Financials for PREVIOUS_CALENDAR_YEAR is set with the following values:
            | promotionId | Attribute | Value   | Attribute   | Value  | Attribute | Value  |
            | null        | sales     | 1254000 | grossProfit | 450000 | units     | 334198 |
        Then the table validation for lyactuals promotion totals are:
            | footerName                   | price | total | h1 | h2 | scanFunding | brochure | gondola | wowFunding | grossProfit | sales      |
            | Promotion totals by 53 weeks | $1.73 | 23    | 13 | 10 | $0.31       | 3        | 3       | $0.38      | $580,000    | $1,800,000 |
        And the table validation for lyactuals totals are:
            | footerName         | price | total | h1 | h2 | scanFunding | brochure | gondola | wowFunding | grossProfit | sales      |
            | Totals by 53 weeks | $2.46 | 52    | 30 | 22 | $0.20       | 3        | 3       | $0.25      | $1,030,000  | $3,054,000 |