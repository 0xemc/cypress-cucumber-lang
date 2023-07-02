Feature: Bookmark

  Background:
    Given the deals page is open
    And the IndexedDB is clear

  Scenario: Add bookmark
    When the user clicks the SearchBarInput
    And the user types 'ATWIST100G'
    When the user clicks the HierarchyItem with text 'ATWIST100G - TWISTIES CHEESE 100G'
    And the user clicks the button element with text 'Add Bookmark'
    And the user clicks the textbox element with text 'Bookmark name'
    And the user types 'ATWIST100G-bookmark'
    And the user clicks the button element with text 'Add'
    And the user clicks the tab element with text 'Bookmarks'
    Then a BookmarksList-Bookmark-item with text 'ATWIST100G-bookmark' should exist

  Scenario: Cancel add bookmark
    When the user clicks the SearchBarInput
    And the user types 'ATWIST100G'
    When the user clicks the HierarchyItem with text 'ATWIST100G - TWISTIES CHEESE 100G'
    And the user clicks the button element with text 'Add Bookmark'
    And the user clicks the textbox element with text 'Bookmark name'
    And the user clicks the button element with text 'Cancel'
    And the user clicks the tab element with text 'Bookmarks'
    And there is 0 BookmarksList-Bookmark-item

  Scenario: Delete bookmark
    Given a bookmark exists with the following name: 'ATWIST100G-bookmark' and assortmentId: 'ATWIST100G'
    When the user clicks the SearchBarInput
    And the user clicks the tab element with text 'Bookmarks'
    Then a BookmarksList-Bookmark-item with text 'ATWIST100G-bookmark' should exist
    And there is 1 BookmarksList-Bookmark-item
    Then the user force clicks the BookmarksList-Bookmark-delete
    Then there is 0 BookmarksList-Bookmark-item

  Scenario: Edit bookmark
    Given a bookmark exists with the following name: 'ATWIST100G-bookmark' and assortmentId: 'ATWIST100G'
    When the user clicks the SearchBarInput
    And the user clicks the tab element with text 'Bookmarks'
    Then a BookmarksList-Bookmark-item with text 'ATWIST100G-bookmark' should exist
    And there is 1 BookmarksList-Bookmark-item
    Then the user force clicks the BookmarksList-Bookmark-edit
    And the user clicks the textbox element with text 'New bookmark name'
    And the user types 'ATWIST100G-bookmark-renamed'
    And the user clicks the button element with text 'Submit'
    Then a BookmarksList-Bookmark-item with text 'ATWIST100G-bookmark-renamed' should exist

  Scenario: Cancel edit bookmark
    Given a bookmark exists with the following name: 'ATWIST100G-bookmark' and assortmentId: 'ATWIST100G'
    When the user clicks the SearchBarInput
    And the user clicks the tab element with text 'Bookmarks'
    Then a BookmarksList-Bookmark-item with text 'ATWIST100G-bookmark' should exist
    And there is 1 BookmarksList-Bookmark-item
    Then the user force clicks the BookmarksList-Bookmark-edit
    And the user clicks the textbox element with text 'New bookmark name'
    And the user types 'ATWIST100G-bookmark-renamed'
    And the user clicks the button element with text 'Cancel'
    Then a BookmarksList-Bookmark-item with text 'ATWIST100G-bookmark' should exist
