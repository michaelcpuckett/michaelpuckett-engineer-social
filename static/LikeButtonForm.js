const forms = [...window.document.querySelectorAll('.LikeButtonForm')];
  forms.forEach(formElement => {
    formElement.addEventListener('submit', (event) => {
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

      const to = JSON.parse(body.to);
      const toArray = Array.isArray(to) ? to : [to];
      const cc = JSON.parse(body.cc);
      const ccArray = Array.isArray(cc) ? cc : [cc];
      const audience = JSON.parse(body.audience);
      const audienceArray = Array.isArray(audience) ? audience : [audience];

      const likeActivity = {
        '@context': 'https://www.w3.org/ns/activitystreams#',
        type: 'Like',
        actor: body.actorId,
        to: [
          'https://www.w3.org/ns/activitystreams#Public',
          ...toArray,
        ],
        cc: [
          `${body.actorId}/followers`,
          ...ccArray,
        ],
        audience: audienceArray,
        object: body.objectId,
      };

      fetch(formElement.getAttribute('action'), {
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
});