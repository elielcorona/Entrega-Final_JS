
document.addEventListener("DOMContentLoaded", () => {
  const kpiContenedor = document.getElementById("kpis-dinamicos");
  const tablaHistorial = document.getElementById("tabla-historial");
  const btnCSV = document.getElementById("descargar-csv");

  const visitas = JSON.parse(localStorage.getItem("qrosspass_historial")) || [];

  if (visitas.length === 0) {
    tablaHistorial.innerHTML = "<tr><td colspan='5' class='text-center text-warning'>Aún no tienes visitas registradas.</td></tr>";
    return;
  }

  const formatearHora = (str) => str.split(" ")[1].slice(0, 5);
  const formatearFecha = (str) => str.split(" ")[0];

  const horarioMasFrecuente = () => {
    const rangos = {
      "6:00–8:00 AM": 0,
      "8:00–10:00 AM": 0,
      "16:00–18:00 PM": 0,
      "18:00–20:00 PM": 0
    };
    visitas.forEach(v => {
      const hora = parseInt(v.fecha.split(" ")[1].split(":")[0]);
      if (hora >= 6 && hora < 8) rangos["6:00–8:00 AM"]++;
      else if (hora >= 8 && hora < 10) rangos["8:00–10:00 AM"]++;
      else if (hora >= 16 && hora < 18) rangos["16:00–18:00 PM"]++;
      else if (hora >= 18 && hora < 20) rangos["18:00–20:00 PM"]++;
    });
    return Object.entries(rangos).sort((a, b) => b[1] - a[1])[0][0];
  };

  const kpis = [
    { titulo: "Total de Visitas", valor: visitas.length },
    { titulo: "Última Visita", valor: formatearFecha(visitas[0].fecha) },
    { titulo: "Gimnasio más Visitado", valor: (() => {
        const conteo = {};
        visitas.forEach(v => conteo[v.gimnasio] = (conteo[v.gimnasio] || 0) + 1);
        return Object.entries(conteo).sort((a, b) => b[1] - a[1])[0][0];
      })()
    },
    { titulo: "Ciudades Visitadas", valor: [...new Set(visitas.map(v => v.ciudad))].join(", ") },
    { titulo: "Horario más Frecuente", valor: horarioMasFrecuente() }
  ];

  kpis.forEach(kpi => {
    const div = document.createElement("div");
    div.className = "col-md-4 col-lg-3";
    div.innerHTML = \`
      <div class="kpi-card p-3 h-100 text-center shadow-sm">
        <h6 class="text-info mb-2">\${kpi.titulo}</h6>
        <p class="fs-5 fw-bold">\${kpi.valor}</p>
      </div>
    \`;
    kpiContenedor.appendChild(div);
  });

  visitas.forEach(v => {
    const tr = document.createElement("tr");
    tr.innerHTML = \`
      <td class="text-center">\${formatearFecha(v.fecha)}</td>
      <td class="text-center">\${formatearHora(v.fecha)}</td>
      <td>\${v.gimnasio}</td>
      <td>\${v.ciudad}</td>
      <td class="text-center"><span class="badge text-bg-success">\${v.estado}</span></td>
    \`;
    tablaHistorial.appendChild(tr);
  });

  btnCSV.addEventListener("click", () => {
    let csv = "Fecha,Hora,Gimnasio,Ciudad,Estado\n";
    visitas.forEach(v => {
      const [fecha, hora] = v.fecha.split(" ");
      csv += \`\${fecha},\${hora},\${v.gimnasio},\${v.ciudad},\${v.estado}\n\`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "historial_qrosspass.csv";
    a.click();
    URL.revokeObjectURL(url);
  });
});
