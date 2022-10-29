class ActorOutbox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.actorId = this.getAttribute('data-actor-id');
    this.attachShadow({ mode: 'open' });
    const templateElement = window.document.querySelector('#ActorOutbox-template')
    this.shadowRoot.append(templateElement.content.cloneNode(true));
    this.initialize();
  }

  async initialize() {
    this.actor = await this.fetchData(this.actorId);
    this.outbox = await this.fetchData(this.actor.outbox);
    this.items = this.outbox.orderedItems;
    console.log(this.items);
    
    for (const item of this.items) {
      const itemElement = window.document.createElement('outbox-item');
      itemElement.setAttribute('data-id', item);
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

window.customElements.define('actor-outbox', ActorOutbox);