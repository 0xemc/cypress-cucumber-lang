import { Given } from '@badeball/cypress-cucumber-preprocessor';
import localforage from '@utils/localforage';
import { Bookmarks } from '@features/GlobalSearch/components/BookmarksList/BookmarksList.types';
import { INDEXED_DB_BOOKMARKS } from '@shared/constants/LocalStorage.constants';

Given(/the IndexedDB is clear/, () => {
  localforage.clear().then(() =>
    localforage.length().then((numKeys) => {
      expect(numKeys === 0);
    })
  );
});

Given(
  /a bookmark exists with the following name: '(.*)' and assortmentId: '(.*)'/,
  (name: string, value: string) => {
    const filtersString = `["${value}"]`;
    const id = btoa(filtersString);
    const bookmarks: Bookmarks = new Map();
    bookmarks.set(id, {
      id,
      filtersString,
      name,
    });
    localforage.setItem(INDEXED_DB_BOOKMARKS, [...bookmarks]).then(() =>
      localforage.length().then((numKeys) => {
        expect(numKeys !== 0);
      })
    );
  }
);
