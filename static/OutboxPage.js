class BlogPost extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.id = this.getAttribute('data-id');
    this.attachShadow({ mode: 'open' });
    const templateElement = window.document.querySelector('#BlogPost-template')
    this.shadowRoot.append(templateElement.content.cloneNode(true));
    this.fetchData();
  }

  fetchData() {
    fetch(this.id, {
      headers: {
        'Accept': 'application/activity+json'
      }
    }).then(res => res.json()).then(activity => {
      if (activity && 'object' in activity && activity.object && activity.type === 'Create') {
        const objectId = activity.object;

        fetch(objectId, {
          headers: {
            'Accept': 'application/activity+json'
          }
        }).then(res => res.json()).then(object => {
          if (object.summary) {
            const contentSlot = window.document.createElement('p');
            contentSlot.setAttribute('slot', 'summary');
            contentSlot.innerHTML = object.summary;
            this.append(contentSlot);
          }

          if (object.content) {
            const contentSlot = window.document.createElement('p');
            contentSlot.setAttribute('slot', 'content');
            contentSlot.innerHTML = object.content;
            this.append(contentSlot);
          }

          if (object.published) {
            const contentSlot = window.document.createElement('p');
            contentSlot.setAttribute('slot', 'published');
            contentSlot.innerHTML = object.published;
            this.append(contentSlot);
          }
        })
      }
    });
  }
}

window.customElements.define('blog-post', BlogPost);