import { DataTable, Given } from '@badeball/cypress-cucumber-preprocessor';
import {
  GetDealsheetAssortmentByIdQuery,
  GetDealsheetAssortmentByIdQueryVariables,
  PromotionSlotMetrics,
} from '@root/shared/graphql/graphqlTypes';
import { selector } from '@shared/utils/primitives/collection';
import { compact } from 'lodash';
import { CURRENT_YEAR_END, PREVIOUS_YEAR_END } from '../cypress.constants';
import { dealsTablePromoParser, dealsTablePromoSet } from './deals.utils';

type keyQueryParams = Partial<GetDealsheetAssortmentByIdQueryVariables>;

Given(
  /the (proposed )?(promotions|shelfPrice) for (.*) is set with the following values:/,
  (
    proposeInd: string,
    promoInd: string,
    calendarYear: string,
    table: DataTable
  ) => {
    const key: Array<
      string | Partial<GetDealsheetAssortmentByIdQueryVariables>
    > = ['getDealsheetAssortmentById'];
    let queryParams: keyQueryParams;
    let dealSheet: string;

    /* determine the calendar year to set the state */
    calendarYear.includes('PREVIOUS')
      ? (queryParams = {
          periodEnd: PREVIOUS_YEAR_END,
        })
      : (queryParams = {
          periodEnd: CURRENT_YEAR_END,
        });
    key.push(queryParams);

    /* use Cypress window object to modify the cache of the assortment loaded */
    cy.window().then((window) => {
      const queryClient = window.queryClient;

      /* retrieve the assortment for the specific period stored in cache */
      const assortments = compact(
        queryClient
          .getQueriesData<GetDealsheetAssortmentByIdQuery[]>(key)
          .flatMap(([, assortments]) => assortments)
      );

      /* determine whether it is Agreed/Proposed dealsheet */
      proposeInd
        ? (dealSheet = 'proposedDealsheet')
        : (dealSheet = 'slottingDealsheet');

      const dealPromotion =
        assortments[0].getDealsheetAssortmentById?.[dealSheet];

      /** Resetting the promotions/shelfprice associated with this Assortment with the data present in DataTable*/
      if (promoInd.includes('promotions')) {
        dealPromotion.promotions.length = 0;
        const parsePromotion = table.hashes().map(dealsTablePromoParser);
        dealPromotion.promotions = parsePromotion;
      } else {
        const parseShelfPrice = table.hashes().map(dealsTablePromoParser);
        dealPromotion.shelfPrice = parseShelfPrice[0];
      }

      return queryClient.invalidateQueries(['getScenarios']);
    });
  }
);

Given(
  /the (proposed )?(promotions|shelfPrice) Slotting Financials for (.*) is set with the following values:/,
  (
    proposeInd: string,
    promoInd: string,
    calendarYear: string,
    table: DataTable
  ) => {
    const key: Array<
      string | Partial<GetDealsheetAssortmentByIdQueryVariables>
    > = ['getDealsheetAssortmentById'];
    let queryParams: keyQueryParams;
    let promoSelector: string;
    let slotPromotion: PromotionSlotMetrics;
    let dealSheet: string;

    /* determine the calendar year to set the state */
    calendarYear.includes('PREVIOUS')
      ? (queryParams = {
          periodEnd: PREVIOUS_YEAR_END,
        })
      : (queryParams = {
          periodEnd: CURRENT_YEAR_END,
        });
    key.push(queryParams);

    /* use Cypress window object to modify the cache of the assortment loaded */
    cy.window().then((window) => {
      const queryClient = window.queryClient;

      /* retrieve the assortment for the specific period stored in cache */
      const assortments = compact(
        queryClient
          .getQueriesData<GetDealsheetAssortmentByIdQuery[]>(key)
          .flatMap(([, assortments]) => assortments)
      );

      /** determine the length of getSlottingFinancials Array
       * step required to match the number of promotions set in the previous step definition */

      proposeInd
        ? (dealSheet = 'proposedDealsheet')
        : (dealSheet = 'slottingDealsheet');
      const promoLength = assortments.reduce(
        (length, { getDealsheetAssortmentById }) => {
          return (
            length +
            (getDealsheetAssortmentById?.[dealSheet]?.promotions.length || 0)
          );
        },
        0
      );

      /* determine whether it is Agreed or Proposed */
      proposeInd ? (promoSelector = 'proposed') : (promoSelector = 'slotting');
      const dealPromotion = assortments[0].getSlottingFinancials;

      /**Block of code to keep Slotting Financials in-line to Promotions updated using above step definition
       * This is required due to database reseed implemented in non-production database
       */
      if (promoInd.includes('promotions')) {
        const updatedPromo = dealPromotion
          .slice(0, promoLength + 1)
          .filter((promo) => promo.promotionId);
        table.rows().forEach((row, index) => {
          const promotionId = row.shift();
          if (updatedPromo[index]) {
            updatedPromo[index].promotionId = promotionId;
          }

          slotPromotion = updatedPromo?.find(
            selector('promotionId', promotionId)
          )?.[promoSelector];

          /* call promoSet function to set promotion */
          dealsTablePromoSet(slotPromotion, row);
        });
      } else {
        const updatedPromo = dealPromotion.filter(
          (promo) => !promo.promotionId
        );
        table.rows().forEach((row) => {
          const promotionId = row.shift();

          slotPromotion = updatedPromo?.find(
            selector('promotionId', JSON.parse(promotionId))
          )?.[promoSelector];

          /* call promoSet function to set promotion */
          dealsTablePromoSet(slotPromotion, row);
        });
      }

      return queryClient.invalidateQueries(['getScenarios']);
    });
  }
);
