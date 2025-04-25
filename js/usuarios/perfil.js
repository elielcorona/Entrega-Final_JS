
document.addEventListener("DOMContentLoaded", () => {
  const nombreInput = document.getElementById("perfil-nombre");
  const emailInput = document.getElementById("perfil-email");
  const ciudadSelect = document.getElementById("perfil-ciudad");
  const planInput = document.getElementById("perfil-plan");
  const estadoInput = document.getElementById("perfil-estado");
  const fotoImg = document.getElementById("perfil-foto");
  const form = document.getElementById("perfil-form");

  const usuario = JSON.parse(localStorage.getItem("qrosspass_usuario"));

  if (!usuario) {
    alert("No se encontró información del usuario.");
    return;
  }

  // Cargar ciudades desde JSON
  fetch("../../config/ciudades_y_planes.json")
    .then(res => res.json())
    .then(data => {
      ciudadSelect.innerHTML = "";
      data.ciudades.forEach(c => {
        const option = document.createElement("option");
        option.value = c;
        option.textContent = c;
        ciudadSelect.appendChild(option);
      });
      ciudadSelect.value = usuario.ciudad;
    });

  // Cargar datos del usuario
  nombreInput.value = usuario.nombre;
  emailInput.value = usuario.email;
  planInput.value = usuario.plan;
  estadoInput.value = usuario.estado;
  fotoImg.src = usuario.fotoPerfil || "../../assets/images/default-qr.png";

  // Guardar cambios
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    usuario.nombre = nombreInput.value.trim();
    usuario.ciudad = ciudadSelect.value;
    localStorage.setItem("qrosspass_usuario", JSON.stringify(usuario));
    alert("Cambios guardados correctamente.");
  });
});
