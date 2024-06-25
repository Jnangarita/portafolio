const email = document.getElementById("emailTxt").textContent;
const copyBtn = document.getElementById("copyBtn");
const API_URL = "https://formspree.io/f/mzzppjky";

copyBtn.addEventListener("click", function () {
  copyToClipboard(email);
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function () {
    console.log("Correo electrónico copiado:", text);
  }, function (err) {
    console.error("No se pudo copiar el texto: ", err);
  });
}

document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();
  let form = event.target;
  let formData = new FormData(form);

  fetch(`${API_URL}`, {
    method: form.method,
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      form.reset();
      let successModal = new bootstrap.Modal(document.getElementById('successModal'));
      successModal.show();
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          document.getElementById('errorModalLabel').textContent = 'Error: ' + data.errors.map(error => error.message).join(', ');
        } else {
          document.getElementById('errorModalLabel').textContent = 'Error';
        }
        let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
      });
    }
  }).catch(error => {
    document.getElementById('errorModalLabel').textContent = 'Error';
    let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
    console.error("Error al enviar el formulario: ", error);
  });
});