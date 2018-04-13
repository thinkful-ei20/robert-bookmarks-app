
const API = (function() {
  const BASE_URL= 'https://thinkful-list-api.herokuapp.com/robert/bookmarks';

  const getBookmarks = function(callback) {
    $.getJSON(BASE_URL, callback);
  };

  const saveNewBookmarks = function (bookmark, callback) {
    $.ajax({
      url: BASE_URL,
      method: 'post',
      contentType: 'application/JSON',
      data: JSON.stringify(bookmark),
      success: callback,
    });
  };

  return {
    getBookmarks,
    saveNewBookmarks,
  };
}());