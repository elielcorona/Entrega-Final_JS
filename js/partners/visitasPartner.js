
document.addEventListener("DOMContentLoaded", () => {
  const btnSimularQR = document.getElementById("simularQR");

  function registrarVisitaUsuario(qrData) {
    const partner = JSON.parse(localStorage.getItem("qrosspass_partner")) || {};
    const gimnasio = partner.nombre || "Gimnasio Desconocido";
    const ciudad = partner.ciudad || "Ciudad";

    const fechaHora = new Date();
    const fecha = fechaHora.toISOString().slice(0, 16).replace("T", " ");

    const historial = JSON.parse(localStorage.getItem("qrosspass_historial")) || [];

    const yaRegistrado = historial.some(v =>
      v.gimnasio === gimnasio && v.fecha.split(" ")[0] === fecha.split(" ")[0]
    );

    if (yaRegistrado) {
      alert("Ya se registró una visita hoy en este gimnasio.");
      return;
    }

    historial.unshift({
      fecha: fecha,
      gimnasio: gimnasio,
      ciudad: ciudad,
      estado: "Redimido"
    });

    localStorage.setItem("qrosspass_historial", JSON.stringify(historial));
    alert("✅ Visita registrada correctamente.");
  }

  // Simulación de validación QR
  if (btnSimularQR) {
    btnSimularQR.addEventListener("click", () => {
      const qrData = "QR123456789"; // Simulado
      const valido = true; // Supongamos validación correcta
      if (valido) registrarVisitaUsuario(qrData);
      else alert("❌ Código no válido");
    });
  }
});
