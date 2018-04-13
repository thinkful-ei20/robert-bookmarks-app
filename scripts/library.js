/* global store, API  */

const library = (function(){
  const createElement = function(bookmark) {
    return `
    <li class="bookmark" data-id="${bookmark.id}">
      <span class="title">${bookmark.title}</span>
      <p>Rating: ${bookmark.rating}</p>
      <button class="delete"><i class="fa fa-trash"></i>Trash</button>
    </li>
    `;
  };

  const createHTML = function(bookmarks) {
    const html = bookmarks.map(bookmark => createElement(bookmark));
    return html.join('');
  };

  const renderPage = function (){
    const htmlString = createHTML(store.items);
    $('.bookmark-container').html(`<h2>My Book Marks:</h2> ${htmlString}`);
    
  };

  const handleSubmitAddForm = function () {
    $('form').submit(e => {
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
      const id = $(e.currentTarget).closest('.bookmark').data('id');;
      API.deleteBookmarks(id, () => {
        store.removeItem(id);
        renderPage();
      });
    });
  };
  
  const bindEventHandlers = function() {
    handleSubmitAddForm();
    handleDeletePress();
  };

  return {
    renderPage,
    bindEventHandlers,
  };
}());