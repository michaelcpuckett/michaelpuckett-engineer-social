class ImageSelector extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.userId = this.getAttribute('data-user-id');
    this.attachShadow({ mode: 'open' });
    const templateElement = window.document.querySelector('#ImageSelector-template')
    this.shadowRoot.append(templateElement.content.cloneNode(true));
    this.shadowRoot.querySelector('details').addEventListener('toggle', () => {
      this.fetchData();
    }, {
      once: true,
    });
  }

  fetchData() {
    fetch(`${this.userId}/outbox`, {
      headers: {
        'Accept': 'application/activity+json'
      }
    }).then(res => res.json()).then(async outbox => {
      if (outbox && 'id' in outbox && 'orderedItems' in outbox) {
        const items = await Promise.all(outbox.orderedItems.map(async itemId => {
          return fetch(itemId).then(res => res.json());
        }));

        const images = [];

        for (const item of items) {
          if (item.type === 'Image') {
            images.push(item);
          }
        }

        const selectElement = this.shadowRoot.querySelector('select');

        const optionElements = [];

        for (const image of images) {
          const optionElement = window.document.createElement('option');
          optionElement.setAttribute('value', image.id);
          optionElement.setAttribute('innerText', image.url);
          optionElements.push(optionElement);
        }

        for (const optionElement of optionElements) {
          selectElement.append(optionElement);
        }
      }
    });
  }
}

window.customElements.define('image-selector', ImageSelector);