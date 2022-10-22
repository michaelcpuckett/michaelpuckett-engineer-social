class BlogPost extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.id = this.getAttribute('data-id');
    this.actorId = this.getAttribute('data-actor-id');
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
      if (activity && 'object' in activity && activity.object && activity.type === 'Create' && 'content' in activity.object) {
        const object = activity.object;

        if (object.content && !object.inReplyTo) {
          this.classList.add('card');
          {
            const contentSlot = window.document.createElement('p');
            contentSlot.setAttribute('slot', 'content');
            contentSlot.innerHTML = object.content;
            this.append(contentSlot);
          }

          if (object.summary) {
            const contentSlot = window.document.createElement('p');
            contentSlot.setAttribute('slot', 'summary');
            contentSlot.innerHTML = object.summary;
            this.append(contentSlot);
          }

          if (object.published) {
            const contentSlot = window.document.createElement('p');
            contentSlot.setAttribute('slot', 'published');
            contentSlot.innerHTML = object.published;
            this.append(contentSlot);
          }
        }

        if (this.actorId) {
          const likeButton = window.document.createElement('button');
          likeButton.setAttribute('type', 'button');
          likeButton.setAttribute('slot', 'likeButton');
          likeButton.textContent = 'Like';
          this.append(likeButton);
          likeButton.addEventListener('click', () => {
            const likeActivity = {
              '@context': 'https://www.w3.org/ns/activitystreams#',
              type: 'Like',
              actor: this.actorId,
              to: [
                'https://www.w3.org/ns/activitystreams#Public',
                `${this.actorId}/followers`,
              ],
              object: this.id,
            };

            fetch(`${this.actorId}/outbox`, {
              method: 'POST',
              headers: {
                'Accept': 'application/activity+json',
              },
              body: JSON.stringify(likeActivity),
            })
            .then(response => {
              if (response.status === 201 && response.headers.get('Location')) {
                window.location.reload();
              }
            });
          });
        }
      }
    });
  }
}

window.customElements.define('blog-post', BlogPost);