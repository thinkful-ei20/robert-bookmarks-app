/* global store */

const API = (function() {
  const BASE_URL= 'https://thinkful-list-api.herokuapp.com/robert/bookmarks';

  const getBookmarks = function(callback) {
    $.getJSON(BASE_URL, callback);
  };

  const saveNewBookmarks = function (bookmark, callback, error) {
    $.ajax({
      url: BASE_URL,
      method: 'post',
      contentType: 'application/JSON',
      data: JSON.stringify(bookmark),
      success: callback,
      error: error,
    });
  };

  const deleteBookmarks = function(id, callback) {
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'delete',
      contentType: 'application/JSON',
      success: callback,
    });
  };

  const updateBookmarks = function(id, callback, error) {
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'patch',
      contentType: 'application/JSON',
      success: callback,
      error: error,
    });
  };

  return {
    getBookmarks,
    saveNewBookmarks,
    deleteBookmarks,
  };
}());