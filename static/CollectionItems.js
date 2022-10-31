class CollectionItems extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.collectionId = this.getAttribute('data-id');
      this.typeFilter = this.getAttribute('data-type-filter');
      this.attachShadow({ mode: 'open' });
      const templateElement = window.document.querySelector('#CollectionItems-template')
      this.shadowRoot.append(templateElement.content.cloneNode(true));
      this.initialize();
    }
  
    async initialize() {
      this.collection = await this.fetchData(this.collectionId);
        
      const itemElements = [];

      for (const itemId of (this.collection.items ?? this.collection.orderedItems)) {
        const itemElement = window.document.createElement('collection-item');
        itemElement.setAttribute('data-id', itemId);
        if (this.typeFilter) {
          itemElement.setAttribute('data-type-filter', this.typeFilter);
        }
        itemElements.push(itemElement);
      }

      const nameSlot = window.document.createElement('a');
      nameSlot.setAttribute('slot', 'name');
      nameSlot.setAttribute('href', this.collection.id);
      nameSlot.textContent = this.collection.name;
      this.append(nameSlot);

      for (const itemElement of itemElements) {
        this.append(itemElement);
      }
    }
  
    async fetchData(url) {
      return await fetch(url, {
        headers: {
          'Accept': 'application/activity+json'
        }
      }).then(res => res.json());
    }
  }
  
  window.customElements.define('collection-items', CollectionItems);