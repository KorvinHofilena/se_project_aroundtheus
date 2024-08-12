class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  clear() {
    // Clears the container before re-rendering to avoid duplicates
    this._container.innerHTML = "";
  }

  renderItems() {
    this.clear(); // Clear existing items before rendering new ones
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}

export default Section;
