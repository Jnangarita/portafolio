const email = document.getElementById("emailTxt").textContent;
const copyBtn = document.getElementById("copyBtn");

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