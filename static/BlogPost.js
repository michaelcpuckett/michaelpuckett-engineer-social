class ActorOutbox extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.id = this.getAttribute('data-id');
    this.userId = this.getAttribute('data-user-id');
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

          if (this.userId) {
            const likeButton = window.document.createElement('button');
            likeButton.setAttribute('type', 'button');
            likeButton.setAttribute('slot', 'likeButton');
            likeButton.textContent = 'Like';
            this.append(likeButton);
            likeButton.addEventListener('click', () => {
              const likeActivity = {
                '@context': 'https://www.w3.org/ns/activitystreams#',
                type: 'Like',
                actor: this.userId,
                to: [
                  ...Array.isArray(object.attributedTo) ? object.attributedTo : [object.attributedTo],
                  ...Array.isArray(object.to) ? object.to : [object.to],
                  'https://www.w3.org/ns/activitystreams#Public',
                  `${this.userId}/followers`,
                ],
                cc: object.cc ?? [],
                object: this.id,
              };

              fetch(`${this.userId}/outbox`, {
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
      }

      if (activity && 'object' in activity && activity.object && activity.type === 'Create' && activity.object.type === 'Image') {
        this.classList.add('card');
        {
          const imageSlot = window.document.createElement('img');
          imageSlot.setAttribute('src', activity.object.url.toString());
          imageSlot.setAttribute('slot', 'image');
          this.append(imageSlot);
        }

        if (this.userId) {
          const profilePicButton = window.document.createElement('button');
          profilePicButton.setAttribute('type', 'button');
          profilePicButton.setAttribute('slot', 'profilePicButton');
          profilePicButton.textContent = 'Make Profile Pic';
          this.append(profilePicButton);
          profilePicButton.addEventListener('click', () => {
            const updateActivity = {
              '@context': 'https://www.w3.org/ns/activitystreams#',
              type: 'Update',
              actor: new URL(this.userId),
              object: {
                id: new URL(this.userId),
                icon: activity.object
              },
              to: [
                'https://www.w3.org/ns/activitystreams#Public',
                `${this.userId}/followers`,
              ],
            }
            
            fetch(`${this.userId}/outbox`, {
              method: 'POST',
              headers: {
                'Accept': 'application/activity+json',
              },
              body: JSON.stringify(updateActivity),
            })
            .then(response => {
              if (response.status === 201 && response.headers.get('Location')) {
                window.location.reload();
              }
            });
          });
        }

        if (this.userId) {
          const likeButton = window.document.createElement('button');
          likeButton.setAttribute('type', 'button');
          likeButton.setAttribute('slot', 'likeButton');
          likeButton.textContent = 'Like';
          this.append(likeButton);
          likeButton.addEventListener('click', () => {
            const likeActivity = {
              '@context': 'https://www.w3.org/ns/activitystreams#',
              type: 'Like',
              actor: this.userId,
              to: [
                'https://www.w3.org/ns/activitystreams#Public',
                `${this.userId}/followers`,
              ],
              object: this.id,
            };

            fetch(`${this.userId}/outbox`, {
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

window.customElements.define('blog-post', ActorOutbox);