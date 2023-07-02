import { GQLFixtureMatcher } from "../support/cypress.types";

export const GQL_MATCHERS: GQLFixtureMatcher[] = [
  {
    operation: "addPromotion",
    alias: "addPromotion",
    response: "gql/addPromotion.json",
  },
  {
    operation: "createScenario",
    alias: "createScenario",
    response: "gql/createScenario.json",
  },
  {
    operation: "deletePlaceholders",
    alias: "deletePlaceholders",
    response: "gql/deletePlaceholders.json",
  },
  {
    operation: "exportAssortments",
    alias: "exportAssortments",
    response: "gql/exportAssortments.json",
  },
  {
    operation: "forecastCalendarAssortments",
    alias: "forecastCalendarAssortments",
    response: "gql/forecastCalendarAssortments.json",
  },
  {
    operation: "forecastDealsheetAssortment",
    alias: "forecastDealsheetAssortment",
    response: "gql/forecastDealsheetAssortment.json",
  },
  {
    operation: "getCalendarAssortments",
    alias: "getCalendarAssortments",
    response: "gql/getCalendarAssortments.json",
  },
  {
    operation: "exportAssortments",
    alias: "exportAssortments",
    response: "gql/exportAssortments.json",
  },
  {
    operation: "getDealsheetAssortmentById",
    alias: "getDealsheetAssortmentById",
    response: "gql/getDealsheetAssortmentById.json",
  },
  {
    operation: "getFinancialSummaries",
    alias: "getFinancialSummaries",
    response: "gql/getFinancialSummaries.json",
  },
  {
    alias: "getPromotionsForAssortment",
    response: "gql/getPromotionsForAssortment.json",
    operation: "getPromotionsForAssortment",
  },
  {
    operation: "getScenarios",
    alias: "getScenarios",
    response: "gql/getScenarios.json",
  },
  {
    alias: "getSlottingFinancials",
    operation: "getSlottingFinancials",
    response: "gql/getSlottingFinancials.json",
  },
  {
    alias: "getSlottingTotals",
    operation: "getSlottingTotals",
    response: "gql/getSlottingTotals.json",
  },
  {
    alias: "importCalendar",
    operation: "importCalendar",
    response: "gql/importCalendar.json",
  },
  {
    alias: "listSchedules",
    operation: "listSchedules",
    response: "gql/listSchedules.json",
  },
  // {
  //   alias: 'moveComparisonPromotionSlot',
  //   operation: 'setCalendarAssortments',
  //   response: 'gql/moveComparisonPromotionSlot.json',
  // },
  // {
  //   alias: 'movePromotionSlot',
  //   operation: 'setCalendarAssortments',
  //   response: 'gql/movePromotionSlot.json',
  // },
  {
    operation: "saveDealsheet",
    alias: "saveDealsheet",
    response: "gql/saveDealsheet.json",
  },
  {
    operation: "setCalendarAssortments",
    alias: "setCalendarAssortments",
    response: "gql/setCalendarAssortments.json",
    // {
    //   alias: 'setPromotionBoth',
    //   response: 'gql/setPromotionBoth.json',
    //   operation: 'setCalendarAssortments',
    // },
    // {
    //   alias: 'setPromotionBrochure',
    //   response: 'gql/setPromotionBrochure.json',
    //   operation: 'setCalendarAssortments',
    // },
    // {
    //   alias: 'setPromotionDisplay',
    //   response: 'gql/setPromotionDisplay.json',
    //   operation: 'setCalendarAssortments',
    // },
  },
  {
    alias: "validateCalendarImport",
    response: "gql/validateCalendarImport.json",
    operation: "validateCalendarImport",
  },
  {
    alias: "validateCalendarPGR",
    response: "gql/validateCalendarPGR.json",
    operation: "validateCalendarPGR",
  },
  {
    alias: "Health",
    response: "gql/health.json",
    operation: "Health",
  },
  {
    alias: "getCollections",
    response: "gql/getCollections.json",
    operation: "getCollections",
  },
  // ----- ACADBURYF ----- //
  {
    operation: "getDealsheetAssortmentById",
    alias: "getDealsheetAssortmentById-ACADBURYF",
    response: "gql/getDealsheetAssortmentById-ACADBURYF.json",
    input: {
      assortmentId: "ACADBURYF",
    },
  },
  {
    operation: "getFinancialSummaries",
    alias: "getFinancialSummaries-ACADBURYF",
    response: "gql/getFinancialSummaries-ACADBURYF.json",
    input: {
      input: {
        assortmentIds: ["ACADBURYF"],
      },
    },
  },
  {
    operation: "getScenarios",
    alias: "getScenarios-ACADBURYF",
    response: "gql/getScenarios-ACADBURYF.json",
    input: {
      input: {
        categoryCode: "553",
      },
    },
  },

  // ----- AHS5PK80G ----- //
  {
    operation: "getDealsheetAssortmentById",
    alias: "getDealsheetAssortmentById-AHS5PK80G",
    response: "gql/getDealsheetAssortmentById-AHS5PK80G.json",
    input: {
      assortmentId: "AHS5PK80G",
    },
  },
  {
    operation: "getFinancialSummaries",
    alias: "getFinancialSummaries-AHS5PK80G",
    response: "gql/getFinancialSummaries-AHS5PK80G-ATWIST100G.json",
    input: {
      input: {
        assortmentIds: ["AHS5PK80G", "ATWIST100G"],
      },
    },
  },

  // ----- ATWIST100G Overrides ----- //
  {
    operation: "getCalendarAssortments",
    alias: "getComparisonAssortments",
    response: "gql/getComparisonAssortments.json",
    input: {
      input: {
        assortmentIds: ["ATWIST100G"],
        // This needs to match the scenario in getScenarios
        scenarioId: "e154a08d-a74a-438b-b6c8-c0cbbea4c25e",
      },
    },
  },
  {
    operation: "getFinancialSummaries",
    alias: "getComparisonFinancialSummaries",
    response: "gql/getComparisonFinancialSummaries.json",
    input: {
      input: {
        assortmentIds: ["ATWIST100G"],
        scenarioId: "e154a08d-a74a-438b-b6c8-c0cbbea4c25e",
      },
    },
  },

  // ----- NPD-POPPINPOPCORNRTE ----- //
  {
    operation: "getDealsheetAssortmentById",
    alias: "getDealsheetAssortmentById-NPD-POPPINPOPCORNRTE",
    response: "gql/getDealsheetAssortmentById-NPD-POPPINPOPCORNRTE.json",
    input: {
      assortmentId: "NPD-POPPINPOPCORNRTE",
    },
  },
  {
    operation: "getFinancialSummaries",
    alias: "getFinancialSummaries-NPD-POPPINPOPCORNRTE",
    response: "gql/getFinancialSummaries-NPD-POPPINPOPCORNRTE.json",
    input: {
      input: {
        assortmentIds: ["NPD-POPPINPOPCORNRTE"],
      },
    },
  },
  {
    operation: "getFinancialSummaries",
    alias: "getFinancialSummaries-NPD-POPPINPOPCORNRTE-ATWIST100G",
    response: "gql/getFinancialSummaries-NPD-POPPINPOPCORNRTE-ATWIST100G.json",
    input: {
      input: {
        assortmentIds: ["NPD-POPPINPOPCORNRTE", "ATWIST100G"],
      },
    },
  },
  {
    operation: "getSlottingTotals",
    alias: "getSlottingTotals-NPD-POPPINPOPCORNRTE",
    response: "gql/getSlottingTotals-NPD-POPPINPOPCORNRTE.json",
    input: {
      input: {
        assortmentId: "NPD-POPPINPOPCORNRTE",
      },
    },
  },
];
