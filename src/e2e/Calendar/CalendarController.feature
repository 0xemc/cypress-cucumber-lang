Feature: Calendar Controller

    Background:
        Given the calendar page is open with the following filters [ATWIST100G] and the following scenarios [e154a08d-a74a-438b-b6c8-c0cbbea4c25e]

    Scenario: Filters Description
        Then the note element with text 'active filters' contains the following:
            | Assortment                        |
            | ATWIST100G - TWISTIES CHEESE 100G |

    Scenario: View slots by price or depth
        Given the assortment with id ATWIST100G has promotions with the following attributes:
            | Week | Attribute | Value | Attribute | Value | Attribute            | Value |
            | 28   | depth     | 32    | price     | 1.64  | dealSheetPromotionId | 1     |
            | 29   | depth     | 50    | price     | 1.20  | dealSheetPromotionId | 2     |
            | 30   | depth     | 50    | price     | 1.20  | dealSheetPromotionId | 3     |
            | 31   | depth     | 32    | price     |zz 1.64  | dealSheetPromotionId | 4     |
            | 32   | depth     | 50    | price     | 1.20  | dealSheetPromotionId | 5     |

        When the user clicks the button element with text 'Price point'
        Then the assortment row with the title 'TWISTIES CHEESE 100G' has the following promotions:
            # There is an issue here with the prettier gherkin formatter where spaces are removed on format
            # MAKE SURE ANY COMMIT HERE IS INTENTIONAL
            | Week | Value        |
            | 28   | $1.64 \| 32% |
            | 29   | $1.20 \| 50% |
            | 30   | $1.20 \| 50% |
            | 31   | $1.64 \| 32% |
            | 32   | $1.20 \| 50% |

        When the user clicks the ViewSlotdepthButton
        Then the assortment row with the title 'TWISTIES CHEESE 100G' has the following promotions:
            | Week | Value |
            | 28   | $1.64 |
            | 29   | $1.20 |
            | 30   | $1.20 |
            | 31   | $1.64 |
            | 32   | $1.20 |

    Scenario: Set the colour scheme to status, depth or classification
        Given the assortment with id ATWIST100G has promotions with the following attributes:
            | Week | Attribute | Value | Attribute            | Value | Attribute | Value       | Attribute                            | Value        |
            | 28   | depth     | 10    | dealSheetPromotionId | 1     | status    | ALIGNED     | additionalSlotMetrics.classification | All Star     |
            | 29   | depth     | 20    | dealSheetPromotionId | 2     | status    | APPROVED    | additionalSlotMetrics.classification | All Rounder  |
            | 30   | depth     | 30    | dealSheetPromotionId | 3     | status    | IN_PROGRESS | additionalSlotMetrics.classification | Sales Driver |
            | 31   | depth     | 40    | dealSheetPromotionId | 4     | status    | PROPOSED    | additionalSlotMetrics.classification | Churner      |
            | 32   | depth     | 50    | dealSheetPromotionId | 5     | status    | SUBMITTED   | additionalSlotMetrics.classification | Loser        |
        Then the assortment row with the title 'TWISTIES CHEESE 100G' has cells with the following styles:
            | Week | Style            | Value              |
            | 28   | background-color | rgb(162, 219, 226) |
            | 29   | background-color | rgb(192, 239, 190) |
            | 30   | background-color | rgb(244, 146, 127) |
            | 31   | background-color | rgb(251, 236, 4)   |
            | 32   | background-color | rgb(239, 156, 72)  |

        When the user clicks the ViewStatusdepthButton
        Then the assortment row with the title 'TWISTIES CHEESE 100G' has cells with the following styles:
            | Week | Style            | Value              |
            | 28   | background-color | rgb(209, 216, 230) |
            | 29   | background-color | rgb(179, 190, 214) |
            | 30   | background-color | rgb(137, 156, 200) |
            | 31   | background-color | rgb(66, 91, 150)   |
            | 32   | background-color | rgb(27, 59, 132)   |

        When the user clicks the ViewStatusclassificationButton
        Then the assortment row with the title 'TWISTIES CHEESE 100G' has cells with the following styles:
            | Week | Style            | Value              |
            | 28   | background-color | rgb(192, 239, 190) |
            | 29   | background-color | rgb(162, 219, 226) |
            | 30   | background-color | rgb(159, 180, 215) |
            | 31   | background-color | rgb(247, 206, 164) |
            | 32   | background-color | rgb(247, 177, 164) |

    Scenario: Export a Scenario
        Given we expect an 'exportAssortments' request with alias 'gql_exportAssortments' to be sent with input:
            """
            {
                "input": {
                    "assortmentIds": ["ATWIST100G"],
                    "periodEnd": "2023-06",
                    "periodStart": "2023-01",
                    "scenarioId": "76028275-060f-4fd2-a81c-fb89829d772f"
                },
                "measures": "CORE",
                "type": "BLANK"
            }
            """

        When the user clicks the button element with text 'Open Export'
        And the user clicks the button element with text 'Confirm Export'
        Then a '@exportAssortments' request is sent
        And a file with the name '2022-09-23 SMITHS SNACKFOODS - CHIPS - SINGLE SERVE.xlsx' should be downloaded

    @mutates
    Scenario: Import a Scenario
        Given we expect an 'validateCalendarImport' request with alias 'gql_validateCalendarImport' to be sent

        When the user clicks the button element with text 'Open Import'
        And the user selects the file with name 'cypress/files/2022-09-23 SMITHS SNACKFOODS - CHIPS - SINGLE SERVE.xlsx'
        And the user clicks the button element with text 'Confirm Import'
        Then a '@validateCalendarImport' request is sent
        And a '@importCalendar' request is sent
