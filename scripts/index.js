/* global API, store, library  */

const handleAddBtn = function() {
  $('.addItem').click( () => {
    store.addingBookmark = !store.addingBookmark;
    $('.modal').attr('style', 'display: block');
    library.renderPage();
  });
};

const handleCloseBtn = function () {
  $('.modal').on('click', '.closebtn', (e) => {
    e.preventDefault();
    $('.modal').attr('style', 'display: none');
    store.addingBookmark = !store.addingBookmark;
  });
};

const handleClickOutsideModal = function () {
  $('.modal').click( () =>{
    $('.modal').attr('style', 'display: none');
    store.addingBookmark = !store.addingBookmark;
  });
  $('.modal').on('click', '.modalcontainer',  (e) => {
    e.stopPropagation();
  });
};

$(document).ready(function() {
  handleAddBtn();
  handleCloseBtn();
  handleClickOutsideModal();
  library.bindEventHandlers();
  API.getBookmarks((bookmarks) => {
    store.items = bookmarks;
    library.renderPage();
  });
});