export const SEARCH_HIERARCHY_URL = `**/hierarchy/collections/CHECKOUT_SUPER_PRODUCT/documents/search**`;
export const MULTI_SEARCH_HIERARCHY_URL = `**/multi_search`;

/** App can be extremely slow to load some features */
export const CYPRESS_EXTRA_LONG_WAIT = 20000;

/** Need constants matching the cypress test data
 * @todo when the cypress changes to fy data, change to '2024-06' and '2023-06'
 */
export const STARTING_FINANCIAL_WEEK = 1;
export const CURRENT_YEAR_END = '2024-06';
export const PREVIOUS_YEAR_END = '2023-06';
export const WEEKS_IN_YEAR = 53;
