const button = window.document.querySelector('#MoveAccountButton');
if (button) {
  button.addEventListener('click', async () => {
    const actor = await fetch(button.dataset['actor']).then(async res => await res.json());

    return await fetch(actor.outbox, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/activity+json',
        Accept: 'application/activity+json',
      },
      body: JSON.stringify({
        '@context': 'https://www.w3.org/ns/activitystreams#',
        actor: actor.id,
        type: 'Move',
        object: actor.id,
        target: 'https://profile.michaelpuckett.engineer',
        to: [
          'https://www.w3.org/ns/activitystreams#Public',
          `${actor.followers}`,
        ]
      }),
    }).then(res => {
      if (res.status === 201) {
        window.location.reload();
      }
    })
  });
}