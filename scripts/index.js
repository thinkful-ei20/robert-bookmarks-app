/* global API, store, library  */

const handleAddBtn = function() {
  $('.addItem').click( () => {
    $('.modal').attr('style', 'display: block');
    store.addingBookmark = !store.addingBookmark;
  });
};

const handleCloseBtn = function () {
  $('.closebtn').click( () => {
    $('.modal').attr('style', 'display: none');
    store.addingBookmark = !store.addingBookmark;
  });
};

const handleClickOutsideModal = function () {
  $('.modal').click( () =>{
    $('.modal').attr('style', 'display: none');
    store.addingBookmark = !store.addingBookmark;
  });
  $('.modalcontainer').click( (e) => {
    e.stopPropagation();
  });
};

$(document).ready(function() {
  handleAddBtn();
  handleCloseBtn();
  handleClickOutsideModal();
  API.getBookmarks((bookmarks) => {
    store.items = bookmarks;
    library.renderPage();
  });
});