const formElement = window.document.querySelector('#EditProfileForm');
formElement?.addEventListener('submit', (event) => {
  event.preventDefault();
  let formElements = [];

  for (const element of [...formElement.elements]) {
    if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement) {
      formElements.push(element);
    }
  }
  const body = Object.fromEntries(formElements.map(formElement => [
    formElement.getAttribute('name'),
    formElement.value,
  ]));

  const updateActivity = {
    '@context': 'https://www.w3.org/ns/activitystreams#',
    type: 'Update',
    actor: body.actorId,
    to: [
      'https://www.w3.org/ns/activitystreams#Public',
      `${body.actorId}/followers`,
    ],
    object: {
      id: body.objectId,
      ...body.summary ? {
        summary: body.summary,
      } : null,
      ...body.icon ? {
        icon: {
          type: 'Image',
          url: body.icon,
          mediaType: 'image/png',
        },
      } : null,
    },
  };

  fetch(formElement.getAttribute('action'), {
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