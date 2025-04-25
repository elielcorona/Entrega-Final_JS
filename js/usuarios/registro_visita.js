
function registrarVisitaUsuario(qrData) {
  // Datos del gimnasio actual
  const partner = JSON.parse(localStorage.getItem("qrosspass_partner")) || {};
  const gimnasio = partner.nombre || "Gimnasio Desconocido";
  const ciudad = partner.ciudad || "Ciudad";

  // Fecha actual
  const fechaHora = new Date();
  const fecha = fechaHora.toISOString().slice(0, 16).replace("T", " ");

  // Obtener historial actual
  const historial = JSON.parse(localStorage.getItem("qrosspass_historial")) || [];

  // Verificar duplicado por fecha y gimnasio (solo 1 por día permitido)
  const yaRegistrado = historial.some(v =>
    v.gimnasio === gimnasio &&
    v.fecha.split(" ")[0] === fecha.split(" ")[0]
  );

  if (yaRegistrado) {
    alert("Ya se registró una visita hoy en este gimnasio.");
    return;
  }

  // Agregar visita nueva
  historial.unshift({
    fecha: fecha,
    gimnasio: gimnasio,
    ciudad: ciudad,
    estado: "Redimido"
  });

  localStorage.setItem("qrosspass_historial", JSON.stringify(historial));
  alert("✅ Visita registrada correctamente.");
}
