Feature: Financials

    Background:
        Given the deals page is open with the following filters [AHS5PK80G,ATWIST100G]

    Scenario: Hierarchy Details
        When the user scrolls the financials-title into view
        Then the financials-title with text 'Financials' should be.visible
        And the financials-supplier contains the following:
            | Supplier                     |
            | CALBEE AUSTRALIA PTY LIMITED |
        And the financials-subcategory contains the following:
            | Subcategory        |
            | CHIPS - MULTIPACKS |
        When the user scrolls the assortment-heading into view
        And the user clicks the button element with text 'Next'
        And the user scrolls the financials-title into view
        Then the financials-supplier contains the following:
            | Supplier  |
            | SS_SMITHS |
        And the financials-subcategory contains the following:
            | Subcategory          |
            | CHIPS - SINGLE SERVE |


    Scenario: Ly actuals - Check values
        When the user clicks the button element with text 'LY actuals'
        Then the following elements should have.text:
            | financials-card-netsales                         | NET SALES        |
            | financials-card-netsales-promo                   | $19.34m          |
            | financials-card-netsales-promo-diff              | $0               |
            | financials-card-netsales-nonpromo                | $4.04m           |
            | financials-card-netsales-nonpromo-diff           | $0               |
            | financials-card-incsales                         | INC Sales $      |
            | financials-card-incsales-promo                   | $6.28m           |
            | financials-card-incsales-promo-diff              | $0               |
            | financials-card-incsales-nonpromo                | $0               |
            | financials-card-incsales-nonpromo-diff           | $0               |
            | financials-card-grossprofitdollar                | GROSS PROFIT ($) |
            | financials-card-grossprofitdollar-promo          | $5.72m           |
            | financials-card-grossprofitdollar-promo-diff     | $0               |
            | financials-card-grossprofitdollar-nonpromo       | $1.33m           |
            | financials-card-grossprofitdollar-nonpromo-diff  | $0               |
            | financials-card-grossprofitpercent               | GROSS PROFIT (%) |
            | financials-card-grossprofitpercent-promo         | 29.6%            |
            | financials-card-grossprofitpercent-promo-diff    | 0.0%             |
            | financials-card-grossprofitpercent-nonpromo      | 32.8%            |
            | financials-card-grossprofitpercent-nonpromo-diff | 0.0%             |
            | financials-card-units                            | UNITS            |
            | financials-card-units-promo                      | 11.49m           |
            | financials-card-units-promo-diff                 | 0                |
            | financials-card-units-nonpromo                   | 1.80m            |
            | financials-card-units-nonpromo-diff              | 0                |
            | financials-card-supplierfunding                  | SUPPLIER FUNDING |
            | financials-card-supplierfunding-promo            | $5.67m           |
            | financials-card-supplierfunding-promo-diff       | $0               |
            | financials-card-supplierfunding-nonpromo         | $0               |
            | financials-card-supplierfunding-nonpromo-diff    | $0               |

    Scenario: Proposed - Check values
        When the user clicks the button element with text 'Proposed'
        Then the following elements should have.text:
            | financials-card-netsales                         | NET SALES        |
            | financials-card-netsales-promo                   | $22.68m          |
            | financials-card-netsales-promo-diff              | $3.34m           |
            | financials-card-netsales-nonpromo                | $4.43m           |
            | financials-card-netsales-nonpromo-diff           | $388.89k         |
            | financials-card-incsales                         | INC Sales $      |
            | financials-card-incsales-promo                   | $7.10m           |
            | financials-card-incsales-promo-diff              | $817.28k         |
            | financials-card-incsales-nonpromo                | $0               |
            | financials-card-incsales-nonpromo-diff           | $0               |
            | financials-card-grossprofitdollar                | GROSS PROFIT ($) |
            | financials-card-grossprofitdollar-promo          | $6.44m           |
            | financials-card-grossprofitdollar-promo-diff     | $717.42k         |
            | financials-card-grossprofitdollar-nonpromo       | $1.46m           |
            | financials-card-grossprofitdollar-nonpromo-diff  | $136.09k         |
            | financials-card-grossprofitpercent               | GROSS PROFIT (%) |
            | financials-card-grossprofitpercent-promo         | 28.4%            |
            | financials-card-grossprofitpercent-promo-diff    | 1.2%             |
            | financials-card-grossprofitpercent-nonpromo      | 33.0%            |
            | financials-card-grossprofitpercent-nonpromo-diff | 0.2%             |
            | financials-card-units                            | UNITS            |
            | financials-card-units-promo                      | 12.87m           |
            | financials-card-units-promo-diff                 | 1.38m            |
            | financials-card-units-nonpromo                   | 1.85m            |
            | financials-card-units-nonpromo-diff              | 48.02k           |
            | financials-card-supplierfunding                  | SUPPLIER FUNDING |
            | financials-card-supplierfunding-promo            | $6.61m           |
            | financials-card-supplierfunding-promo-diff       | $935.93k         |
            | financials-card-supplierfunding-nonpromo         | $0               |
            | financials-card-supplierfunding-nonpromo-diff    | $0               |

