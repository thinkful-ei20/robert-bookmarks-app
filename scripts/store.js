
const store = (function() {
  const addItem = function(bookmark) {
    this.items.push(bookmark);
  };

  const removeItem = function(id) {
    store.items = store.items.filter(item => item.id !== id);
  };

  const updateFilterBy = function(rating) {
    this.filterBy = rating;
  };

  const updateExpandedElement = function(id) {
    this.expandedElement = id;
  };

  return {
    items: [],
    addingBookmark: false,
    addItem,
    removeItem,
    filterBy: null,
    expandedElement: null,
    errorMsg: null,
    updateFilterBy,
    updateExpandedElement,
  };
}());