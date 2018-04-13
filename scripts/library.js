/* global store, API  */

const library = (function(){
  const createElement = function(bookmark) {
    return `
    <li class="bookmark" data-id="${bookmark.id}">
      <span class="title">${bookmark.title}</span>
      <p>Rating: ${bookmark.rating}</p>
      <div class="expansion-container"></div>
      <button class="delete" arai-lablel="delete ${bookmark.title} button"><i class="fa fa-trash"></i>Trash</button>
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
    $('.bookmark-container').html(htmlString);
    $('h2').html(`My Book Marks: ${store.items.length}`);

    if (store.errorMsg) {
      let message = store.errorMsg;
      if (message.includes('title')) {
        $('.jsTitle').toggleClass('invalid');
        $('.jsTitle').after('<p class="errorMessage">A title is Required</p>');
      }
      if (message.includes('url')) {
        $('.jsUrl').toggleClass('invalid');
        $('.jsUrl').after('<p class="errorMessage">A URL is required and must begin with HTTP(s)://</p>');
      }
    }

    if (store.expandedElement) {
      $(`[data-id=${store.expandedElement}]`).children('.expansion-container').html(`
      <span>Description:</span>
      <p>${store.items.find(item => item.id === store.expandedElement).desc}</p>
      <a href = "${store.items.find(item => item.id === store.expandedElement).url}">Visit Site</a>
      `);
    }
  };

  const getElementId = function (element) {
    const id = $(element).closest('.bookmark').data('id');
    return id;
  };

  const handleError = function (response) {
    store.errorMsg = response.responseJSON.message,
    renderPage();
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
        store.errorMsg = null;
        store.addItem(response);
        renderPage();
      }, handleError);
    });
  };

  const handleDeletePress = function() {
    $('.bookmark-container').on('click', '.delete', (e) => {
      e.stopPropagation();
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
      if (id === store.expandedElement) {
        store.expandedElement = null;
        renderPage();
      }else {
        store.updateExpandedElement(id);
        renderPage();
      }
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