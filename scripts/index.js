/* global API, store  */

$(document).ready(function() {
  API.getBookmarks((bookmarks) => {
    store.items = bookmarks;
    console.log(store.items);
  });
});