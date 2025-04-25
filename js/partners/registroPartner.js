
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroPartnerForm");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const password = document.getElementById("password").value.trim();

    const calle = document.getElementById("calle").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const colonia = document.getElementById("colonia").value.trim();
    const cp = document.getElementById("cp").value.trim();
    const ciudad = document.getElementById("ciudad").value.trim();

    const categoria = document.getElementById("categoria").value;
    const color = document.getElementById("color").value;

    const logo = document.getElementById("logo").files[0];
    const docIne = document.getElementById("doc-ine").files[0];
    const docDomicilio = document.getElementById("doc-domicilio").files[0];
    const docRfc = document.getElementById("doc-rfc").files[0];
    const fotoLocal = document.getElementById("foto-local").files[0];

    if (!nombre || !email || !telefono || !password || password.length < 8 || !/[^A-Za-z0-9]/.test(password)) {
      alert("Por favor completa todos los campos correctamente.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      const base64Logo = reader.result;

      const partnerData = {
        nombre,
        email,
        telefono,
        password,
        direccion: { calle, numero, colonia, cp, ciudad },
        categoria,
        color,
        logo: base64Logo,
        estado: "pendiente",
        documentos: {
          ine: docIne.name,
          domicilio: docDomicilio.name,
          rfc: docRfc.name,
          fotoLocal: fotoLocal.name
        }
      };

      localStorage.setItem("qrosspass_partner", JSON.stringify(partnerData));
      alert("Tu solicitud ha sido enviada. Validaremos tu información y te contactaremos pronto.");
      window.location.href = "principal.html";
    };

    reader.readAsDataURL(logo);
  });
});
