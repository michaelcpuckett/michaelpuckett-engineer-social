class CollectionItems extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.collectionId = this.getAttribute('data-id');
      this.attachShadow({ mode: 'open' });
      const templateElement = window.document.querySelector('#CollectionItems-template')
      this.shadowRoot.append(templateElement.content.cloneNode(true));
      this.initialize();
    }
  
    async initialize() {
      this.collection = await this.fetchData(this.collectionId);
        
      const itemElements = [];

      for (const item of (this.collection.items ?? this.collection.orderedItems)) {
        const itemElement = window.document.createElement('collection-item');
        itemElement.setAttribute('data-id', item.id);
        itemElements.push(itemElement);
      }

      const nameSlot = window.document.createElement('span');
      nameSlot.setAttribute('slot', 'name');
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