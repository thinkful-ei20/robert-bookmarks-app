/* global store  */

const library = (function(){
  const createElement = function(bookmark) {
    return `
    <li class="bookmark" data-item="${bookmark.id}">
      <span class="title">${bookmark.title}</span>
      <p>Rating: ${bookmark.rating}</p>
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
  
  return {
    renderPage,
  };
}());