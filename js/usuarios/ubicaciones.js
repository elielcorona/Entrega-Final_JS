
document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map").setView([21.0, -100.0], 6);
  const lista = document.getElementById("lista-gimnasios");
  const filtroCiudad = document.getElementById("filtro-ciudad");
  const filtroTipo = document.getElementById("filtro-tipo");

  let todos = [];
  let marcadores = [];
  let userMarker = null;
  let userCoords = null;

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    userCoords = [latitude, longitude];
    map.setView(userCoords, 12);
    userMarker = L.circleMarker(userCoords, {
      radius: 6,
      color: "#66FCF1",
      fillOpacity: 0.8
    }).addTo(map).bindPopup("Estás aquí");
  });

  // Botón flotante para volver a ubicación
  const controlUbicacion = L.control({ position: "bottomleft" });
  controlUbicacion.onAdd = () => {
    const div = L.DomUtil.create("div", "leaflet-bar leaflet-control");
    div.innerHTML = `
      <button title="Mi ubicación" style="width: 36px; height: 36px; background:#107bb9; border:none; border-radius:6px; display:flex; align-items:center; justify-content:center;">
        <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-crosshair" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" x2="18" y1="12" y2="12"/><line x1="6" x2="2" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="2"/><line x1="12" x2="12" y1="22" y2="18"/></svg>
      </button>
    `;
    div.onclick = () => {
      if (userCoords) {
        map.setView(userCoords, 13);
        if (userMarker) userMarker.openPopup();
      } else {
        alert("Ubicación no detectada todavía.");
      }
    };
    return div;
  };
  controlUbicacion.addTo(map);

  fetch("../../config/ubicaciones.json")
    .then((res) => res.json())
    .then((data) => {
      todos = data.gimnasios;
      renderFiltros();
      renderMapaYLista(todos);
    });

  const renderFiltros = () => {
    const ciudades = [...new Set(todos.map(g => g.ciudad))];
    const tipos = [...new Set(todos.map(g => g.tipo))];

    ciudades.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      filtroCiudad.appendChild(opt);
    });

    tipos.forEach(t => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent = t;
      filtroTipo.appendChild(opt);
    });

    filtroCiudad.addEventListener("change", aplicarFiltros);
    filtroTipo.addEventListener("change", aplicarFiltros);
  };

  const aplicarFiltros = () => {
    const ciudad = filtroCiudad.value;
    const tipo = filtroTipo.value;

    let filtrados = [...todos];

    if (ciudad) filtrados = filtrados.filter(g => g.ciudad === ciudad);
    if (tipo) filtrados = filtrados.filter(g => g.tipo === tipo);

    renderMapaYLista(filtrados);
  };

  const renderMapaYLista = (gimnasios) => {
    marcadores.forEach(m => map.removeLayer(m));
    marcadores = [];

    lista.innerHTML = "";
    if (gimnasios.length === 0) {
      lista.innerHTML = "<p class='text-warning text-center'>No se encontraron gimnasios con esos filtros.</p>";
      return;
    }

    gimnasios.forEach(g => {
      const marker = L.marker([g.lat, g.lng])
        .addTo(map)
        .bindPopup(`
          <strong>${g.nombre}</strong><br>${g.direccion}<br>${g.tipo} - ${g.ciudad}<br>
          <a href="https://www.google.com/maps/search/?api=1&query=${g.lat},${g.lng}" target="_blank" class="btn btn-sm btn-light mt-2">¿Cómo llegar?</a>
        `);
      marcadores.push(marker);

      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-4";
      col.innerHTML = `
        <div class="card bg-dark p-3 h-100">
          <h5 class="text-info">${g.nombre}</h5>
          <p class="mb-1 small">${g.direccion}</p>
          <p class="mb-1 small"><strong>${g.tipo}</strong> - ${g.ciudad}</p>
          <a href="https://www.google.com/maps/search/?api=1&query=${g.lat},${g.lng}" target="_blank" class="btn btn-sm btn-outline-light mt-2">¿Cómo llegar?</a>
        </div>
      `;
      lista.appendChild(col);
    });

    if (gimnasios.length > 0) {
      const grupo = L.featureGroup(marcadores);
      map.fitBounds(grupo.getBounds().pad(0.2));
    }
  };
});
