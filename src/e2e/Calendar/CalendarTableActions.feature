Feature: CalendarTableActions
    Background:
        Given the calendar page is open with the following filters [ATWIST100G]

    Background:
        Given the calendar page is open with the following filters [ATWIST100G] and the following scenarios [e154a08d-a74a-438b-b6c8-c0cbbea4c25e]

    @mutates
    Scenario: Update Forecast
        Given the assortment with id ATWIST100G has the following attributes:
            | updatedDate | 2022-11-19T00:16:23.852Z |
        When the user clicks the button element with text 'Update'
        Then a '@forecastCalendarAssortments' request is sent