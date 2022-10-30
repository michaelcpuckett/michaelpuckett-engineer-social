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
    '@context': [
      'https://www.w3.org/ns/activitystreams#',
      { "foaf": "http://xmlns.com/foaf/0.1/" },
      { "schema": "https://schema.org/" }
    ],
    type: 'Update',
    actor: body.actorId,
    to: [
      'https://www.w3.org/ns/activitystreams#Public',
      `${body.actorId}/followers`,
    ],
    object: {
      id: body.objectId,
      type: ['Person', 'schema:Person', 'foaf:Person'],
      ...body.summary ? {
        summary: body.summary,
        'schema:description': body.summary,
      } : null,
      ...body.firstName && body.lastName ? {
        name: `${body.firstName} ${body.lastName}`,
        'foaf:name': `${body.firstName} ${body.lastName}`,
        'schema:name': `${body.firstName} ${body.lastName}`,
        'schema:givenName': body.firstName,
        'schema:familyName': body.lastName,
      } : null,
      ...body['schema:email'] ? {
        'schema:email': body['schema:email'],
        'foaf:mbox': body['schema:email'],
      } : null,
      ...body.city && body.state && body.country ? {
        'foaf:based_near': `${body.city}, ${body.state}, ${body.country}`,
        'location': {
          'type': 'Place',
          name: `${body.city}, ${body.state}, ${body.country}`,
        },
        'schema:address': {
          '@type': "schema:PostalAddress",
          'schema:addressLocality': body.city,
          "schema:addressRegion": body.state,
          "schema:addressCountry": body.country,
        }
      } : null,
      ...body['schema:jobTitle'] ? {
        'schema:jobTitle': body['schema:jobTitle'],
      } : null,
      ...body['foaf:homepage'] ? {
        'foaf:homepage': body['foaf:homepage'],
      } : null,
      ...body.linkedin ? {
        'foaf:member': {
          '@type': 'foaf:OnlineAccount',
          'foaf:accountName': body.linkedin,
          'foaf:accountServiceHomepage': 'https://linkedin.com',
        }
      } : null,
      ...body.github ? {
        'foaf:member': {
          '@type': 'foaf:OnlineAccount',
          'foaf:accountName': body.github,
          'foaf:accountServiceHomepage': 'https://github.com',
        }
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