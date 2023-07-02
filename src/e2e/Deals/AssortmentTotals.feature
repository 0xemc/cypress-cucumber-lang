Feature: Deals - Assortment Annual Totals

    Background:
        Given the deals page is open with the following filters [ATWIST100G]
        And the user scrolls the assortment-heading into view

    Scenario: 53 Weeks - Check values & Hierarchy details
        Then the aggregate-totals-by-All should have.text '53 weeks'
        And the aggregate-totals-by-H1 should have.text 'H1'
        And the aggregate-totals-by-H2 should have.text 'H2'
        And the totals-heading-title should have.text 'Totals - 53 weeks'
        And the totals-supplier should contain 'SS_SMITHS'
        And the totals-subcategory should contain 'CHIPS - SINGLE SERVE'
        And the totals-time-period should contain '53 weeks (28 06 2023 - 02 07 2024)'
        And the totals-location should contain 'National'
        And the following elements should have.text:
            | noofpromos-lyactuals         | 22          |
            | noofpromos-proposed          | 27          |
            | noofpromos-sltboard          | 22          |
            | incsalesdol-lyactuals        | $8,216,352  |
            | incsalesdol-proposed         | -           |
            | incsalesdol-sltboard         | $5,961,719  |
            | sales-lyactuals              | $11,737,984 |
            | sales-proposed               | $0          |
            | sales-sltboard               | $15,660,430 |
            | units-lyactuals              | 9,136,685   |
            | units-proposed               | 0           |
            | units-sltboard               | 10,341,931  |
            | gpdol-lyactuals              | $3,984,298  |
            | gpdol-proposed               | $0          |
            | gpdol-sltboard               | $4,884,061  |
            | gppct-lyactuals              | 33.9%       |
            | gppct-proposed               | 0.0%        |
            | gppct-sltboard               | 31.2%       |
            | supplierfunding-lyactuals    | $4,180,017  |
            | supplierfunding-proposed     | $0          |
            | supplierfunding-sltboard     | $4,911,945  |
            | supplierfundingpct-lyactuals | 46.7%       |
            | supplierfundingpct-proposed  | 56.7%       |
            | supplierfundingpct-sltboard  | 56.7%       |

    Scenario: H1 - Check values & Hierarchy details
        When the user clicks the aggregate-totals-by-H1 with text 'H1'
        Then the totals-heading-title should have.text 'Totals - H1'
        And the totals-supplier should contain 'SS_SMITHS'
        And the totals-subcategory should contain 'CHIPS - SINGLE SERVE'
        And the totals-time-period should contain '27 weeks (28 06 2023 - 02 01 2024)'
        And the totals-location should contain 'National'
        And the following elements should have.text:
            | noofpromos-lyactuals         | 11          |
            | noofpromos-proposed          | 15          |
            | noofpromos-sltboard          | 11          |
            | incsalesdol-lyactuals        | $8,216,352  |
            | incsalesdol-proposed         | -           |
            | incsalesdol-sltboard         | $5,961,719  |
            | sales-lyactuals              | $11,737,984 |
            | sales-proposed               | $0          |
            | sales-sltboard               | $15,660,430 |
            | units-lyactuals              | 9,136,685   |
            | units-proposed               | 0           |
            | units-sltboard               | 10,341,931  |
            | gpdol-lyactuals              | $3,984,298  |
            | gpdol-proposed               | $0          |
            | gpdol-sltboard               | $4,884,061  |
            | gppct-lyactuals              | 33.9%       |
            | gppct-proposed               | 0.0%        |
            | gppct-sltboard               | 31.2%       |
            | supplierfunding-lyactuals    | $4,180,017  |
            | supplierfunding-proposed     | $0          |
            | supplierfunding-sltboard     | $4,911,945  |
            | supplierfundingpct-lyactuals | 46.7%       |
            | supplierfundingpct-proposed  | 56.7%       |
            | supplierfundingpct-sltboard  | 56.7%       |

    Scenario: H2 - Check values & Hierarchy details
        When the user clicks the aggregate-totals-by-H2 with text 'H2'
        Then the totals-heading-title should have.text 'Totals - H2'
        And the totals-supplier should contain 'SS_SMITHS'
        And the totals-subcategory should contain 'CHIPS - SINGLE SERVE'
        And the totals-time-period should contain '26 weeks (03 01 2024 - 02 07 2024)'
        And the totals-location should contain 'National'
        And the following elements should have.text:
            | noofpromos-lyactuals         | 11          |
            | noofpromos-proposed          | 12          |
            | noofpromos-sltboard          | 11          |
            | incsalesdol-lyactuals        | $8,216,352  |
            | incsalesdol-proposed         | -           |
            | incsalesdol-sltboard         | $5,961,719  |
            | sales-lyactuals              | $11,737,984 |
            | sales-proposed               | $0          |
            | sales-sltboard               | $15,660,430 |
            | units-lyactuals              | 9,136,685   |
            | units-proposed               | 0           |
            | units-sltboard               | 10,341,931  |
            | gpdol-lyactuals              | $3,984,298  |
            | gpdol-proposed               | $0          |
            | gpdol-sltboard               | $4,884,061  |
            | gppct-lyactuals              | 33.9%       |
            | gppct-proposed               | 0.0%        |
            | gppct-sltboard               | 31.2%       |
            | supplierfunding-lyactuals    | $4,180,017  |
            | supplierfunding-proposed     | $0          |
            | supplierfunding-sltboard     | $4,911,945  |
            | supplierfundingpct-lyactuals | 46.7%       |
            | supplierfundingpct-proposed  | 56.7%       |
            | supplierfundingpct-sltboard  | 56.7%       |