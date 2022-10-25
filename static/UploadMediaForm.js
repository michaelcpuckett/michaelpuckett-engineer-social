const formElement = window.document.querySelector('#UploadMediaForm');
formElement?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(formElement);

  fetch(formElement.getAttribute('action'), {
    method: 'POST',
    body: formData,
  })
    .then(async response => {
      console.log(await response.text())
      if (response.status === 201 && response.headers.get('Location')) {
        window.location.reload();
      }
    });
});