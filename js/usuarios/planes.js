
document.addEventListener("DOMContentLoaded", () => {
  const planActualContainer = document.getElementById("plan-actual");
  const cardsPlanesContainer = document.getElementById("cards-planes");

  const planesDisponibles = [
    {
      nombre: "Multigym Mensual",
      id: "mensual",
      precio: 449,
      beneficios: [
        "Acceso a todos los gimnasios afiliados",
        "Sin contratos ni penalizaciones",
        "Ideal para probar QrossPass"
      ]
    },
    {
      nombre: "Multigym Trimestral",
      id: "trimestral",
      precio: 399,
      beneficios: [
        "Todos los beneficios del plan mensual",
        "Precio preferencial por 3 meses",
        "Flexibilidad + ahorro"
      ]
    },
    {
      nombre: "Multigym Anual",
      id: "anual",
      precio: 379,
      beneficios: [
        "Accede todo el año sin interrupciones",
        "El mejor precio mensual",
        "Ideal para usuarios constantes"
      ]
    },
    {
      nombre: "Multigym Pro",
      id: "pro",
      precio: 549,
      beneficios: [
        "Acceso sin límites ni restricciones",
        "Clases grupales y especiales incluidas",
        "Invitado mensual gratuito",
        "Soporte prioritario"
      ]
    }
  ];

  const usuario = JSON.parse(localStorage.getItem("qrosspass_usuario"));

  if (!usuario) {
    planActualContainer.innerHTML = "<p class='text-warning'>No se encontró información del usuario.</p>";
    return;
  }

  if (usuario.pagado) {
    planActualContainer.innerHTML = `
      <div class="card bg-dark border border-info shadow-sm p-3">
        <h4 class="text-info">${usuario.plan.charAt(0).toUpperCase() + usuario.plan.slice(1)}</h4>
        <p class="mb-0">Estado: <strong>${usuario.estado === "activo" ? "Activo" : "Pendiente de activación"}</strong></p>
        <p class="mb-0">Ciudad: ${usuario.ciudad}</p>
        <p class="mb-0">Correo: ${usuario.email}</p>
      </div>
    `;
  } else {
    planActualContainer.innerHTML = "<p class='text-light'>Aún no has pagado un plan. Elige el que más se ajuste a ti.</p>";
  }

  planesDisponibles.forEach(plan => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-3";
    const esActual = usuario.plan === plan.id;

    const btn = document.createElement("button");
    btn.className = `btn btn-sm ${esActual ? "btn-outline-light" : "btn-info"} w-100`;
    btn.innerText = esActual ? "Plan Actual" : "Seleccionar Plan";
    btn.disabled = esActual;

    if (!esActual) {
      btn.addEventListener("click", () => {
        const nuevoUsuario = { ...usuario, plan: plan.id };
        localStorage.setItem("qrosspass_usuario", JSON.stringify(nuevoUsuario));
        window.location.href = "pago.html";
      });
    }

    const card = document.createElement("div");
    card.className = `card h-100 bg-dark text-white p-4 border ${esActual ? "border-warning" : "border-info"} shadow`;
    card.innerHTML = `
      <h5 class="mb-1 ${esActual ? "text-warning" : ""}">${plan.nombre}</h5>
      <p class="mb-2">Desde <strong>$${plan.precio}/mes</strong></p>
      <ul class="text-start small ps-3">
        ${plan.beneficios.map(b => `<li>${b}</li>`).join("")}
      </ul>
    `;

    card.querySelector("ul").after(btn);
    col.appendChild(card);
    cardsPlanesContainer.appendChild(col);
  });
});
