const forms = [...window.document.querySelectorAll('.ReplyForm')];
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

      const createReplyActivity = {
        '@context': 'https://www.w3.org/ns/activitystreams#',
        type: 'Create',
        actor: body.actorId,
        inReplyTo: body.inReplyTo,
        to: [
          'https://www.w3.org/ns/activitystreams#Public',
          `${body.actor}/followers`,
        ],
        object: {
          type: 'Note',
          content: body.content,
        },
      };

      fetch(formElement.getAttribute('action'), {
        method: 'POST',
        headers: {
          'Accept': 'application/activity+json',
        },
        body: JSON.stringify(createReplyActivity),
      })
      .then(response => {
        if (response.status === 201 && response.headers.get('Location')) {
          window.location.reload();
        }
    });
  });
});