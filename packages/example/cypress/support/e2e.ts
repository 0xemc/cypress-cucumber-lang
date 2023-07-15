import { GQL_MATCHERS } from "../matchers/gql.matchers";
import { REST_MATCHERS } from "../matchers/rest.matchers";
/** Import our cucumber-lang plugin */
import { init } from "cypress-cucumber-lang";
/** Initialise with any matchers */
init({ gqlMatchers: GQL_MATCHERS, restMatchers: REST_MATCHERS });
