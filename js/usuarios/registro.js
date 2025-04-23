
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-registro");
  const ciudadSelect = document.getElementById("ciudad");
  const planSelect = document.getElementById("plan");

  // Cargar opciones desde archivo JSON
  fetch("../../config/ciudades_y_planes.json")
    .then(res => res.json())
    .then(data => {
      // Cargar ciudades
      data.ciudades.forEach(ciudad => {
        const option = document.createElement("option");
        option.value = ciudad.toLowerCase();
        option.textContent = ciudad;
        ciudadSelect.appendChild(option);
      });

      // Cargar planes
      data.planes.forEach(plan => {
        const option = document.createElement("option");
        option.value = plan.toLowerCase();
        option.textContent = plan;
        planSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Error al cargar ciudades y planes:", error);
    });

  // Validar formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const tyc = document.getElementById("tyc").checked;

    const regexPass = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

    if (!regexPass.test(password)) {
      alert("La contraseña debe tener al menos 8 caracteres y un símbolo.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (!tyc) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    // Simulación de creación de cuenta
    const nuevoUsuario = {
      nombre,
      email,
      ciudad: ciudadSelect.value,
      plan: planSelect.value,
      estado: "pendiente_activacion",
      pagado: false,
      fotoPerfil: null
    };

    // Guardar en localStorage (modo demo)
    localStorage.setItem("qrosspass_usuario", JSON.stringify(nuevoUsuario));
    alert("¡Cuenta creada correctamente! Realiza el pago para continuar.");
    form.reset();
  });
});
