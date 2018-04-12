/* global API, store library  */

$(document).ready(function() {
  API.getBookmarks((bookmarks) => {
    store.items = bookmarks;
    library.renderPage();
  });
});