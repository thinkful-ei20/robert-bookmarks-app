/* global store, API  */

const library = (function(){
  const createElement = function(bookmark) {
    return `
    <li class="bookmark" data-id="${bookmark.id}">
      <span class="title">${bookmark.title}</span>
      <p>Rating: ${bookmark.rating}</p>
      <div class="expansion-container"></div>
      <button class="delete"><i class="fa fa-trash"></i>Trash</button>
    </li>
    `;
  };

  const createHTML = function(bookmarks) {
    const html = bookmarks.map(bookmark => createElement(bookmark));
    return html.join('');
  };

  const renderPage = function (){
    let items = store.items;
    if (store.addingBookmark) {
      $('.modal').html(`<div class="modalcontainer">
      <span class="closebtn" id="closebtn">X</span>
      <form>
        <div id="add-item-header">
          <h2>Add a new bookmark</h2>
        </div>
        <label for="Title">Title</label>
        <input class="jsTitle" name="Title" id="Title">
        <label for="Rating">Rating</label>
        <select class="jsRating" name="Rating" id="Rating">
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
        <label for="URL">URL</label>
        <input class="jsUrl" name="URL" id="URL">
        <label for="Description">Description</label>
        <input class="jsDescription" name="Description" id="Description">
        <button class="submitForm" type="submit">Submit</button>
        <button class="closebtn">Cancel</button>
      </form>
    </div>`);
    }

    if (store.filterBy) items = store.items.filter(item => item.rating >= store.filterBy);

    const htmlString = createHTML(items);
    $('.bookmark-container').html(`<h2>My Book Marks:</h2> ${htmlString}`);
  };

  const getElementId = function (element) {
    const id = $(element).closest('.bookmark').data('id');
    return id;
  };

  const handleSubmitAddForm = function () {
    $('.modal').on('submit', 'form', e => {
      e.preventDefault();
      const bookmark = {
        title: $('.jsTitle').val(),
        rating: $('.jsRating').val(),
        url: $('.jsUrl').val(),
        desc: $('.jsDescription').val(),
      };
      API.saveNewBookmarks(bookmark, (response) =>{
        $('form')[0].reset();
        $('.modal').attr('style', 'display: none');
        store.addingBookmark = !store.addingBookmark;
        store.addItem(response);
        renderPage();
      });
    });
  };

  const handleDeletePress = function() {
    $('.bookmark-container').on('click', '.delete', (e) => {
      const id = getElementId(e.currentTarget);
      API.deleteBookmarks(id, () => {
        store.removeItem(id);
        renderPage();
      });
    });
  };
  
  const handleFilterOptionSelect = function() {
    $('.jsRatingFilter').change( e => {
      store.updateFilterBy($(e.currentTarget).val());
      renderPage();
    });
  };

  const handleElementSelectExpansion = function() {
    $('.bookmark-container').on('click', '.bookmark', (e) => {
      const id = getElementId(e.currentTarget);
      store.updateExpandedElement(id);
    });
  };

  const bindEventHandlers = function() {
    handleSubmitAddForm();
    handleDeletePress();
    handleFilterOptionSelect();
    handleElementSelectExpansion();
  };

  return {
    renderPage,
    bindEventHandlers,
  };
}());