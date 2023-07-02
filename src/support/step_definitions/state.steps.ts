import { DataTable, Given } from '@badeball/cypress-cucumber-preprocessor';
import { GetScenariosQuery } from '@graphqlTypes';
import { MappedCalendarAssortment } from '@routes/Calendar/Calendar.types';
import { selector } from '@shared/utils/primitives/collection';
import { not, notNil } from '@utils/functional';
import { parseBoolean, toPrimitive } from '@utils/primitives/string';
import { chunk, set } from 'lodash';

const keys = {
  assortment: ['getSingleCalendarAssortment'],
  scenario: ['getScenarios'],
};

/** 
 * Update the given assortment values with the given key value table 
 * e.g:
 * Given the assortment with id ATWIST100G has the following attributes
      | updatedDate   | 2022-11-19T00:16:23.852Z  |
 */
Given(
  /the assortment with id ([^!.?\s]+) has the following attributes:/,
  (assortmentId: string, table: DataTable) => {
    cy.window().then((window) => {
      const queryClient = window.queryClient;

      /** Retrieve the assortment stored in cache */
      const assortments = queryClient
        .getQueriesData<MappedCalendarAssortment[]>(keys.assortment)
        .flatMap(([, assortments]) => assortments);

      const assortment = assortments.find(
        selector('assortmentId', assortmentId)
      );

      if (!assortment)
        throw new Error('Attempt to set attributes on non-existent assortment');

      /** Add the key values from the table to the assortment */
      const updatedAssortment = table
        .raw()
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), assortment);

      /** Update the cache */
      window.queryClient.setQueriesData(keys.assortment, [
        ...assortments.filter(not(selector('assortmentId', assortmentId))),
        updatedAssortment,
      ]);

      // This is a hack to force the component to re-render
      // Remove once ticket NSPS2-5597 is resolved
      window.queryClient.invalidateQueries(keys.scenario);
    });
  }
);

Given(
  /the assortment with id ([^!.?\s]+) has promotions with the following attributes:/,
  (assortmentId: string, table: DataTable) => {
    cy.window().then((window) => {
      const queryClient = window.queryClient;

      /** Retrieve the assortment stored in cache */
      const assortments = queryClient
        .getQueriesData<MappedCalendarAssortment[]>(keys.assortment)
        .flatMap(([, assortments]) => assortments);

      const assortment = assortments.find(
        selector('assortmentId', assortmentId)
      );

      if (!assortment)
        throw new Error('Attempt to set attributes on non-existent assortment');

      /** Add the key values from the table to the assortment */
      table.rows().forEach((row) => {
        const week = row.shift();
        const promotion = assortment.promotionSlots.find(
          selector('weekNo', Number(week))
        );
        chunk(row, 2).forEach(([key, value]) => {
          set(promotion, key, toPrimitive(value));
        });
      });

      /** Update the cache */
      queryClient.setQueriesData(keys.assortment, assortments);

      // This is a hack to force the component to re-render
      // Remove once ticket NSPS2-5597 is resolved
      queryClient.invalidateQueries(keys.scenario);
    });
  }
);

/** 
 * Update the given scenario with the given key value table 
 * e.g:
 * Given the scenario with id blahblah has the following attributes
      | updatedDate   | 2022-11-19T00:16:23.852Z  |
 */
Given(
  /the scenario with id ([^!.?\s]+) has the following attributes:/,
  (scenarioId: string, table: DataTable) => {
    cy.window().then((window) => {
      const queryClient = window.queryClient;

      /** Retrieve the assortment stored in cache */
      const scenarioData = queryClient.getQueriesData<GetScenariosQuery[]>(
        keys.scenario
      );

      const scenarios = scenarioData
        .flatMap(([, scenarios]) => scenarios)
        .filter(notNil)
        .flatMap((scenarios) => scenarios.getScenarios);

      const scenario = scenarios.find(selector('scenarioId', scenarioId));

      if (!scenario)
        throw new Error('Attempt to set attributes on non-existent scenario');

      /** Add the key values from the table to the assortment */
      const updatedScenario = table.raw().reduce(
        (acc, [key, value]) => ({
          ...acc,
          /** If the user enters "true" or "false" as the key value */
          [key]: parseBoolean(value),
        }),
        scenario
      );

      /** Update the cache */
      window.queryClient.setQueriesData(keys.scenario, [
        ...scenarios.filter(not(selector('scenarioId', scenarioId))),
        updatedScenario,
      ]);
    });
  }
);
