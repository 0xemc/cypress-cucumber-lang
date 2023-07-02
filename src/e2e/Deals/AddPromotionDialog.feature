
Feature: AddPromotionDialog

    Background:
        Given the deals page is open with the following filters [ATWIST100G] and the following scenarios [e154a08d-a74a-438b-b6c8-c0cbbea4c25e]
        When the user clicks the AddPromotionButton
        Then a '@getDealsheetAssortmentById' request is sent

    @mutates
    Scenario: Add a new promotion
        When the user populates the AddPromotionForm with:
            | promotionName    | 50% off promotion |
            | promoPrice       | 1                 |
            | scanFundInDollar | 1                 |
            | frequency        | 1                 |
        Then the spinbutton element with text 'Discount %' should have.value '58.33'
        And the spinbutton element with text 'Scan funding %' should have.value '0.07'
        When the user clicks the AddPromotionDialogConfirmButton
        Then a '@addPromotion' request has been sent with input:
            """
            {
                "input": {
                    "label": "50% off promotion",
                    "assortmentDealsheetId": "ATWIST100G_2023.1-2023.12",
                    "promotionType": "IN_STORE",
                    "discount": 58.33,
                    "promoPrice": 1,
                    "scanFundingPercentage": 0.07,
                    "scanFunding": 0.001,
                    "frequency": 1,
                    "hasBundle": false,
                    "categoryCode": "558",
                    "brochure": 0,
                    "gondola": 0
                }
            }
            """

    @mutates
    Scenario: Add a multibuy promotion
        When the user force checks the checkbox element with text 'Multibuy'
        And the user populates the AddPromotionForm with:
            | promotionName                | 50% off promotion |
            | promoPrice                   | 1                 |
            | scanFundInDollar             | 1                 |
            | frequency                    | 1                 |
            | multibuyRedemptionPercentage | 30                |
            | multibuyQuantity             | 2                 |
        Then the spinbutton element with text 'Discount %' should have.value '58.33'
        And the spinbutton element with text 'Scan funding %' should have.value '0.07'
        And the user clicks the AddPromotionDialogConfirmButton
        Then a '@addPromotion' request has been sent with input:
            """
            {
                "input": {
                    "multibuyRedemption": 2.4,
                    "multibuyRedemptionPercent": 0.003,
                    "multibuyQuantity": 2
                }
            }
            """

    @mutates
    Scenario: Add a bundled promotion
        When the user populates the AddPromotionForm with:
            | promotionName    | 50% off promotion |
            | promoPrice       | 1                 |
            | scanFundInDollar | 1                 |
            | frequency        | 1                 |
        Then the spinbutton element with text 'Discount %' should have.value '58.33'
        And the spinbutton element with text 'Scan funding %' should have.value '0.07'
        # @todo remove force
        When the user force clicks the checkbox element with text 'Add assortments to bundle'
        And the user clicks the SelectAssortmentsMultiSelect
        And the user clicks the option element with text 'Oral B Health Toothpaste 1pk'
        And the user clicks outside of the element
        And the user clicks the AddPromotionDialogConfirmButton
        Then a '@addPromotion' request has been sent with input:
            """
            {
                "input": {
                    "hasBundle": true,
                    "bundleAssortmentIds": [
                        "oralb-4"
                    ]
                }
            }
            """

