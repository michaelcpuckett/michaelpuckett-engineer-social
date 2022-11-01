const formElement = window.document.querySelector('#ArbitraryJsonForm');
formElement?.addEventListener('submit', (event) => {
  event.preventDefault();

  const body = formElement.querySelector('textarea').value;

  fetch(formElement.getAttribute('action'), {
    method: 'POST',
    headers: {
      'Accept': 'application/activity+json',
    },
    body,
  })
  .then(response => {
    if (response.status === 201 && response.headers.get('Location')) {
      window.location.reload();
    }
  });
});