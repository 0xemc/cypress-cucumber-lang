Feature: EditCellDropdown

	Scenario: Empty Promotion Slot
		Given the calendar page is open with the following filters [ATWIST100G]
		And the assortment row with id ATWIST100G has no promotion at week 2
		When the user selects the cell at week 2
		Then the EditCellDropdown should be.visible
		And the EditCellDropDownActions should not.exist