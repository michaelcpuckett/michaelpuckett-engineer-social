class ActorProfile extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attributedTo = JSON.parse(this.getAttribute('data-attributed-to'));
    this.actorId = this.attributedTo;
    this.attachShadow({ mode: 'open' });
    const templateElement = window.document.querySelector('#ActorProfile-template')
    this.shadowRoot.append(templateElement.content.cloneNode(true));
    this.initialize();
  }

  async initialize() {
    this.actor = await this.fetchData(this.actorId);

    const profilePicSlot = window.document.createElement('img');
    profilePicSlot.setAttribute('slot', 'profilePic');
    profilePicSlot.setAttribute('src', this.actor.icon?.url.toString());

    const nameSlot = window.document.createElement('p');
    nameSlot.setAttribute('slot', 'name');
    nameSlot.textContent = this.actor.name;

    const preferredUsernameSlot = window.document.createElement('p');
    preferredUsernameSlot.setAttribute('slot', 'preferredUsername');
    preferredUsernameSlot.textContent = `@${this.actor.preferredUsername}`;

    const summarySlot = window.document.createElement('p');
    summarySlot.setAttribute('slot', 'summary');
    summarySlot.textContent = this.actor.summary;

    const locationSlot = window.document.createElement('span');
    locationSlot.setAttribute('slot', 'location');
    locationSlot.textContent = this.actor['http://xmlns.com/foaf/0.1/based_near'];

    const jobTitleSlot = window.document.createElement('span');
    jobTitleSlot.setAttribute('slot', 'jobTitle');
    jobTitleSlot.textContent = this.actor['https://schema.org/jobTitle'];

    const followingSlot = window.document.createElement('collection-count');
    followingSlot.setAttribute('data-id', this.actor.following);
    followingSlot.setAttribute('slot', 'following');

    const followersSlot = window.document.createElement('collection-count');
    followersSlot.setAttribute('data-id', this.actor.followers);
    followersSlot.setAttribute('slot', 'followers');

    this.append(profilePicSlot);
    this.append(nameSlot);
    this.append(preferredUsernameSlot);
    this.append(summarySlot);
    this.append(locationSlot);
    this.append(jobTitleSlot);
    this.append(followingSlot);
    this.append(followersSlot);
  }

  async fetchData(url) {
    return await fetch(url, {
      headers: {
        'Accept': 'application/activity+json'
      }
    }).then(res => res.json());
  }
}

window.customElements.define('actor-profile', ActorProfile);