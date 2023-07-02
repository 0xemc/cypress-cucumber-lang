Feature: Global Search

  Background:
    Given the calendar page is open

  Scenario: Navigate Home Logo
    When the user force clicks the link element with text 'Home Logo'
    Then the section element with text 'Deals search prompt' should be.visible
    And the current route is '/deals'

  Scenario: Search & Select Hierarchy Item
    When the user clicks the SearchBarInput
    Then the '@search-ALL' request is sent
    And there are 100 HierarchyItem

    When the user types 'ATWIST100G'
    Then the '@search-ATWIST100G' request is sent
    And there is 1 HierarchyItem
    And only AST results are visible

    When the user clicks the HierarchyItem with text 'ATWIST100G - TWISTIES CHEESE 100G'
    And the user clicks the FilterSelectionApplyButton
    Then the '@getCalendarAssortments' request is sent
    And the '@listSchedules' request is sent

  Scenario: Filter by Assortment
    When the user clicks the SearchBarInput
    Then the user filters by assortment
    And only AST results are visible

  Scenario: Filter by Category
    When the user clicks the SearchBarInput
    Then the user filters by category
    And only CAT results are visible

  Scenario: Filter by Subcategory
    When the user clicks the SearchBarInput
    Then the user filters by subcategory
    And only SCT results are visible

  Scenario: Filter by Segment
    When the user clicks the SearchBarInput
    Then the user filters by segment
    And only SEG results are visible

  Scenario: Filter by Supplier
    When the user clicks the SearchBarInput
    Then the user filters by supplier
    And only SUP results are visible

  Scenario: Filter by Brand
    When the user clicks the SearchBarInput
    Then the user filters by brand
    And only BRD results are visible

  Scenario: Walk all filters
    When the user clicks the SearchBarInput
    Then the user filters by supplier
    And only SUP results are visible
    Then the user filters by category
    And only CAT results are visible
    Then the user filters by segment
    And only SEG results are visible
    Then the user filters by subcategory
    And only SCT results are visible
    Then the user filters by brand
    And only BRD results are visible
    Then the user filters by assortment
    And only AST results are visible

  @skip
  Scenario: AC.xx.xx Filter in the context of existing filters

