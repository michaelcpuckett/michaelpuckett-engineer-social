const formElement = window.document.querySelector('#UploadMediaForm');
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

  const formData = new FormData();

  formData.append('file', body.file);
  formData.append('object', body.object);

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