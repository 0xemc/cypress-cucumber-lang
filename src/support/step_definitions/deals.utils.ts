import { PromotionSlotMetrics } from '@root/shared/graphql/graphqlTypes';
import { chunk, set } from 'lodash';
/**
 * Function to update the Slotting promotion cache with the values supplied in the datatable of the feature file
 * @param promoUpdate - Of type PromotionSlotMetrics
 * @param row - An array of elements holding the key/value. The chunk operation from lodash will split them into key/value pairs during execution
 */

export const dealsTablePromoSet = (
  promoUpdate: PromotionSlotMetrics,
  row: string[]
) => {
  chunk(row, 2).forEach(([key, value]) => {
    switch (typeof JSON.parse(value)) {
      case 'number':
        set(promoUpdate, key, JSON.parse(value));
        break;
      case 'object':
        set(promoUpdate, key, JSON.parse(value));
        break;
      default:
        set(promoUpdate, key, value);
    }
  });
};

/**
 * A parser function to convert the string object to the corresponding types expected to set the cache
 * @param promoValues string object read using datatable.hashes()
 * @returns the parsed Promotion adhering to the datatype expected to set the cache
 */
export const dealsTablePromoParser = (promoValues: Record<string, string>) => {
  const parsedObject = {};
  const keysToParse = ['frequency', 'label'];
  const keysToRetain = ['promotionId', 'promotionType'];

  Object.keys(promoValues).forEach((key) => {
    if (keysToParse.includes(key)) {
      if (key === 'frequency' || promoValues[key] === 'null') {
        parsedObject[key] = JSON.parse(promoValues[key]);
      } else {
        parsedObject[key] = promoValues[key];
      }
    } else if (keysToRetain.includes(key)) {
      parsedObject[key] = promoValues[key];
    } else {
      const parsedValue = JSON.parse(promoValues[key]);
      typeof parsedValue == 'number'
        ? (parsedObject[key] = parsedValue)
        : promoValues[key];
    }
  });

  return parsedObject;
};
