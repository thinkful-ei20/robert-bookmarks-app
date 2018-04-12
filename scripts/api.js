
const API = (function() {
  const BASE_URL= 'https://thinkful-list-api.herokuapp.com/robert/bookmarks';

  const getBookmarks = function(callback) {
    $.getJSON(BASE_URL, callback);
  };

  return {
    getBookmarks,
  };
}());