import {
  Before,
  DataTable,
  Then,
} from '@badeball/cypress-cucumber-preprocessor';
import { pick } from 'lodash';
import { loadAssortments } from '../../support/cypress.utils';

Before({ tags: '@deals' }, () => {
  loadAssortments('deals', ['ATWIST100G']);
});

Then(
  /the table validation for (lyactuals|proposed|slotting) (promotion )?totals are:/,
  (dataTestIdInd: string, indexInd: string, table: DataTable) => {
    /* index indicator to retrieve corresponding footer row information 
    0 - Promotion totals by 53 weeks
    1 - Totals by 53 weeks */
    let index: number;
    indexInd ? (index = 0) : (index = 1);

    let dataTestId: string;

    /* Indicator to choose the Deals table according to the validation*/
    switch (true) {
      case dataTestIdInd?.includes('lyactuals'):
        dataTestId = 'lastyear-actuals-table';
        break;
      case dataTestIdInd?.includes('proposed'):
        dataTestId = 'readonly-proposed-table';
        break;
      case dataTestIdInd?.includes('slotting'):
        dataTestId = 'slotting-board-table';
    }

    cy.findByTestId(dataTestId)
      .find('tfoot tr')
      .eq(index)
      .find('td')
      .spread(
        (
          nameEl,
          priceEl,
          freqTotalEl,
          freqH1El,
          freqH2El,
          engineEl,
          adjustEl,
          scanFundEl,
          brochureEl,
          gondolaEl,
          wowFundEl,
          fundRateEl,
          absNetCostEl,
          gpEl,
          gpPerUnitEl,
          gpPercentageEl,
          salesEl,
          multiQtyEl,
          multiRedeemEl,
          multiBlendedEl
        ) => {
          const assertionTable = table.hashes()[0];
          const actualVal = pick(
            {
              footerName: nameEl.innerText,
              price: priceEl.innerText,
              total: freqTotalEl.innerText,
              h1: freqH1El.innerText,
              h2: freqH2El.innerText,
              forecastEngine: engineEl.innerText,
              forecastAdjust: adjustEl.innerText,
              scanFunding: scanFundEl.innerText,
              brochure: brochureEl.innerText,
              gondola: gondolaEl.innerText,
              wowFunding: wowFundEl.innerText,
              fundingRatePercent: fundRateEl.innerText,
              absNetCost: absNetCostEl.innerText,
              grossProfit: gpEl.innerText,
              grossProfitPerUnit: gpPerUnitEl.innerText,
              sales: salesEl.innerText,
              grossProfitPercentage: gpPercentageEl.innerText,
              multibuyQuantity: multiQtyEl.innerText,
              multibuyRedemptionPercent: multiRedeemEl.innerText,
              multibuyBlendedASP: multiBlendedEl.innerText,
            },
            Object.keys(assertionTable)
          );
          expect(
            actualVal,
            `${table.hashes()[0].footerName} failed table footer validation`
          ).to.deep.equal(assertionTable);
        }
      );
  }
);
