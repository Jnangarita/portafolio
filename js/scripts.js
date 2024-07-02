const email = document.getElementById("emailTxt").textContent;
const copyBtn = document.getElementById("copyBtn");
const scrollBtn = document.getElementById("goUpBtn");
const API_URL = "https://formspree.io/f/mzzppjky";

copyBtn.addEventListener("click", function () {
  copyToClipboard(email);
});

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function () {
    const icon = document.getElementById('btnIcon');
    const message = document.getElementById('copyMessage');
    const tooltip = document.getElementById('tooltipMessage');
    updateIcon(icon, 'bi-clipboard', 'bi-check-lg');
    toggleVisibility(message, 'inline');
    toggleVisibility(tooltip, 'none');

    setTimeout(function () {
      updateIcon(icon, 'bi-check-lg', 'bi-clipboard');
      toggleVisibility(tooltip, 'inline');
      toggleVisibility(message, 'none');
    }, 2000)
  }, function (err) {
    console.error("Error al copiar el texto: ", err);
  });
}

function updateIcon(icon, removeClass, addClass) {
  icon.classList.remove(removeClass);
  icon.classList.add(addClass);
}

function toggleVisibility(element, style) {
  element.style.display = style;
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

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
}

function goTopPage() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}