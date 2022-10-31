class CollectionItem extends HTMLElement {
    constructor() {
      super();
    }
  
    connectedCallback() {
      this.itemId = this.getAttribute('data-id');
      this.attachShadow({ mode: 'open' });
      const templateElement = window.document.querySelector('#CollectionItem-template')
      this.shadowRoot.append(templateElement.content.cloneNode(true));
      this.initialize();
    }
  
    async initialize() {
      this.item = await this.fetchData(this.itemId);

      if (this.itemFilter) {
        const itemFilter = this.itemFilter.split(',');
        const type = Array.isArray(this.item.type) ? this.item.type : [this.item.type];
        
        for (const filter of itemFilter) {
          if (type.includes(filter)) {
            return;
          }
        }
      }
  
      const activityTypeSlot = window.document.createElement('div');
      activityTypeSlot.setAttribute('slot', 'activityType');
      activityTypeSlot.textContent = this.item.type;
  
      this.append(activityTypeSlot);
  
      this.object = this.item.object;
  
      const linkElement = window.document.createElement('a');
      linkElement.setAttribute('href', this.object.id);
  
      const summaryElement = window.document.createElement('div');
      summaryElement.textContent = this.object.summary;
  
      const contentElement = window.document.createElement('div');
      contentElement.innerHTML = this.object.content;
  
      linkElement.append(summaryElement);
      linkElement.append(contentElement);
      this.append(linkElement);
    }
  
    async fetchData(url) {
      return await fetch(url, {
        headers: {
          'Accept': 'application/activity+json'
        }
      }).then(res => res.json());
    }
  }
  
  window.customElements.define('collection-item', CollectionItem);