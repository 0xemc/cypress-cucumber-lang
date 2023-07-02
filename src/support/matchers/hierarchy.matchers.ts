import { TypesenseFixtureMatcher } from 'support/cypress.types';

export const TYPESENSE_SEARCH_MATCHERS: TypesenseFixtureMatcher[] = [
  {
    alias: 'search-ALL',
    response: 'hierarchy/hierarchy-ALL.json',
    matcher: (request) =>
      (request.query.q === '*' || request.query.q === '') &&
      !String(request.query.filter_by).includes('code:='),
  },
  {
    alias: 'search-ALL-AST',
    response: 'hierarchy/hierarchy-ALL-AST.json',
    matcher: (request) =>
      request.query.filter_by === "shortName:=[AS]&&hierarchy.DL:['N']" &&
      request.query.q === '',
  },
  {
    alias: 'search-ALL-CAT',
    response: 'hierarchy/hierarchy-ALL-CAT.json',
    matcher: (request) =>
      request.query.filter_by === "shortName:=[CT]&&hierarchy.DL:['N']" &&
      request.query.q === '',
  },
  {
    alias: 'search-ALL-SCT',
    response: 'hierarchy/hierarchy-ALL-SCT.json',
    matcher: (request) =>
      request.query.filter_by === "shortName:=[SC]&&hierarchy.DL:['N']" &&
      request.query.q === '',
  },
  {
    alias: 'search-ALL-SEG',
    response: 'hierarchy/hierarchy-ALL-SEG.json',
    matcher: (request) =>
      request.query.filter_by === "shortName:=[SE]&&hierarchy.DL:['N']" &&
      request.query.q === '',
  },
  {
    alias: 'search-ALL-SUP',
    response: 'hierarchy/hierarchy-ALL-SUP.json',
    matcher: (request) =>
      request.query.filter_by === "shortName:=[SSG]&&hierarchy.DL:['N']" &&
      request.query.q === '',
  },
  {
    alias: 'search-ALL-BRD',
    response: 'hierarchy/hierarchy-ALL-BRD.json',
    matcher: (request) =>
      request.query.filter_by === "shortName:=[BR]&&hierarchy.DL:['N']" &&
      request.query.q === '',
  },
  {
    alias: 'search-ATWIST100G',
    response: 'hierarchy/hierarchy-ATWIST100G.json',
    matcher: (request) =>
      request.query.q === 'ATWIST100G' ||
      String(request.query.filter_by).includes('code:=[ATWIST100G]'),
  },
  {
    alias: 'search-ACADBURYF',
    response: 'hierarchy/hierarchy-ACADBURYF.json',
    matcher: (request) =>
      request.query.q === 'ACADBURYF' ||
      String(request.query.filter_by).includes('code:=[ACADBURYF]'),
  },
  {
    alias: 'search-AHS5PK80G-ATWIST100G',
    response: 'hierarchy/hierarchy-AHS5PK80G-ATWIST100G.json',
    matcher: (request) =>
      request.query.q === '*' &&
      String(request.query.filter_by).includes('code:=[AHS5PK80G,ATWIST100G]'),
  },
  {
    alias: 'search-NPD-POPPINPOPCORNRTE',
    response: 'hierarchy/hierarchy-NPD-POPPINPOPCORNRTE.json',
    matcher: (request) =>
      request.query.q === '*' &&
      String(request.query.filter_by).includes('code:=[NPD-POPPINPOPCORNRTE]'),
  },
  {
    alias: 'search-NPD-POPPINPOPCORNRTE-ATWIST100G',
    response: 'hierarchy/hierarchy-NPD-POPPINPOPCORNRTE-ATWIST100G.json',
    matcher: (request) =>
      request.query.q === '*' &&
      String(request.query.filter_by).includes(
        'code:=[NPD-POPPINPOPCORNRTE,ATWIST100G]'
      ),
  },
];

export const TYPESENSE_MULTISEARCH_MATCHERS = [
  {
    alias: 'multisearch-all',
    response: 'hierarchy/hierarchy-multi-ALL.json',
    matcher: (request) =>
      request.body?.searches?.some(
        (search) =>
          search.q === '*' ||
          String(search.filter_by).includes(
            'code:=[58666212,58666211,58611907,58666207,151027143,58666219,3859841]'
          )
      ),
  },
  {
    alias: 'multisearch-ATWIST100G',
    response: 'hierarchy/hierarchy-multi-ATWIST100G.json',
    matcher: (request) =>
      request.body?.searches?.some(
        (search) =>
          search.q === 'ATWIST100G' ||
          String(search.filter_by).includes('code:=[ATWIST100G]')
      ),
  },
  {
    alias: 'multisearch-AHS5PK80G',
    response: 'hierarchy/hierarchy-multi-AHS5PK80G.json',
    matcher: (request) =>
      request.body?.searches?.some(
        (search) =>
          search.q === 'AHS5PK80G' ||
          String(search.filter_by).includes('code:=[AHS5PK80G]')
      ),
  },
  {
    alias: 'multisearch-ACADBURYF',
    response: 'hierarchy/hierarchy-multi-ACADBURYF.json',
    matcher: (request) =>
      request.body?.searches?.some(
        (search) =>
          search.q === 'ACADBURYF' ||
          String(search.filter_by).includes('code:=[ACADBURYF]')
      ),
  },
  {
    alias: 'multisearch-NPD-POPPINPOPCORNRTE',
    response: 'hierarchy/hierarchy-multi-NPD-POPPINPOPCORNRTE.json',
    matcher: (request) =>
      request.body?.searches?.some(
        (search) =>
          search.q === 'NPD-POPPINPOPCORNRTE' ||
          String(search.filter_by).includes('code:=[NPD-POPPINPOPCORNRTE]')
      ),
  },
];
