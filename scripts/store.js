
const store = (function() {
  const addItem = function(bookmark) {
    this.items.push(bookmark);
  };

  const removeItem = function(id) {
    store.items = store.items.filter(item => item.id !== id);
  };

  return {
    items: [],
    addingBookmark: false,
    addItem,
    removeItem,
  };
}());