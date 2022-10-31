class CollectionCount extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.collectionId = this.getAttribute('data-id');
    this.attachShadow({ mode: 'open' });
    const templateElement = window.document.querySelector('#CollectionCount-template')
    this.shadowRoot.append(templateElement.content.cloneNode(true));
    this.initialize();
  }

  async initialize() {
    this.collection = await this.fetchData(this.collectionId);
    const slotElement = window.document.createElement('span');
    slotElement.textContent = `${this.collection.totalItems}`;
    this.append(slotElement);
  }

  async fetchData(url) {
    return await fetch(url, {
      headers: {
        'Accept': 'application/activity+json'
      }
    }).then(res => res.json());
  }
}

window.customElements.define('collection-count', CollectionCount);