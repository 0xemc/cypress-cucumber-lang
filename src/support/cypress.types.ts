import { CyHttpMessages } from 'cypress/types/net-stubbing';

/** A definition that maps a particular response to a particular request and alias */
export type TypesenseFixtureMatcher = {
  // A function that is run on each intercepted request to determine if the request should be mocked or not
  matcher: Predicate<CyHttpMessages.IncomingHttpRequest>;
  // The name to be used when using cy.wait(_) Note: do not add the `@` symbol here
  alias: string;
  //The file path of the response relative to `src/cypress/fixtures`
  response: string;
};

/** A definition that maps a particular response to a particular request and alias */
export type GQLFixtureMatcher = {
  //The operation name ot match (i.e getCalendarAssortments)
  operation: string;
  // The name to be used when using cy.wait(_) Note: do not add the `@` symbol here
  alias: string;
  //The file path of the response relative to `src/cypress/fixtures`
  response?: string;
  // An input object used for partial deep comparison with the request input to match requests
  // This is optional and if not provided will match all with the given `operation`
  input?: unknown;
};
