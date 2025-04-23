
document.addEventListener("DOMContentLoaded", () => {
  const resumen = document.getElementById("resumen-usuario");
  const btnPagar = document.getElementById("btn-pagar");

  const usuario = JSON.parse(localStorage.getItem("qrosspass_usuario"));

  if (!usuario || usuario.pagado) {
    resumen.innerHTML = "<p class='text-warning'>No hay información de usuario pendiente de pago.</p>";
    btnPagar.disabled = true;
    return;
  }

  resumen.innerHTML = `
    <p><strong>Nombre:</strong> ${usuario.nombre}</p>
    <p><strong>Email:</strong> ${usuario.email}</p>
    <p><strong>Ciudad:</strong> ${usuario.ciudad}</p>
    <p><strong>Plan:</strong> ${usuario.plan}</p>
    <p><strong>Total a pagar:</strong> $${usuario.plan === 'pro' ? 549 : usuario.plan === 'anual' ? 379 : usuario.plan === 'trimestral' ? 399 : 449}/mes</p>
  `;

  btnPagar.addEventListener("click", () => {
    // Simulación de pago con MercadoPago (sandbox o futura integración real)
    alert("Redirigiendo a MercadoPago...");
    
    // Simular resultado del pago
    setTimeout(() => {
      usuario.pagado = true;
      usuario.estado = "pendiente_activacion";
      localStorage.setItem("qrosspass_usuario", JSON.stringify(usuario));
      alert("¡Pago realizado con éxito! Tu cuenta ahora está lista para activarse en el gimnasio.");
      window.location.href = "../../pages/usuarios/principal.html";
    }, 1500);
  });
});
