
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productos-container");
  const filtros = document.getElementById("filtros");

  fetch("../../config/productos.json")
    .then(res => res.json())
    .then(productos => {
      let datos = [...productos];

      const categorias = [...new Set(productos.map(p => p.categoria))];
      const ciudades = [...new Set(productos.map(p => p.ciudad))];

      filtros.innerHTML = `
        <div class="row g-2 mb-4 align-items-end text-white">
          <div class="col-md-4">
            <label class="form-label small">Categoría</label>
            <select class="form-select form-select-sm bg-dark text-white border-info" id="filtroCategoria">
              <option value="">Todas</option>
              ${categorias.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label small">Ciudad</label>
            <select class="form-select form-select-sm bg-dark text-white border-info" id="filtroCiudad">
              <option value="">Todas</option>
              ${ciudades.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>
          <div class="col-md-4">
            <label class="form-label small">Ordenar por</label>
            <select class="form-select form-select-sm bg-dark text-white border-info" id="ordenarPor">
              <option value="">--</option>
              <option value="precioAsc">Precio: Menor a Mayor</option>
              <option value="precioDesc">Precio: Mayor a Menor</option>
              <option value="nombreAsc">Nombre: A - Z</option>
              <option value="nombreDesc">Nombre: Z - A</option>
            </select>
          </div>
        </div>
      `;

      const renderProductos = (items) => {
        container.innerHTML = "";
        items.forEach(p => {
          const col = document.createElement("div");
          col.className = "col-sm-6 col-md-4 col-lg-3";
          col.innerHTML = `
            <div class="card h-100 bg-dark text-white shadow border-info">
              <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}" style="object-fit: cover; height: 180px;">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${p.nombre}</h5>
                <p class="card-text small">${p.descripcion}</p>
                <div class="mt-auto">
                  <p class="fw-bold">$${p.precio}</p>
                  <button class="btn btn-info btn-sm w-100">Comprar</button>
                </div>
              </div>
            </div>
          `;
          container.appendChild(col);
        });
      };

      const aplicarFiltros = () => {
        let filtrados = [...datos];
        const categoria = document.getElementById("filtroCategoria").value;
        const ciudad = document.getElementById("filtroCiudad").value;
        const orden = document.getElementById("ordenarPor").value;

        if (categoria) filtrados = filtrados.filter(p => p.categoria === categoria);
        if (ciudad) filtrados = filtrados.filter(p => p.ciudad === ciudad);

        switch (orden) {
          case "precioAsc": filtrados.sort((a, b) => a.precio - b.precio); break;
          case "precioDesc": filtrados.sort((a, b) => b.precio - a.precio); break;
          case "nombreAsc": filtrados.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
          case "nombreDesc": filtrados.sort((a, b) => b.nombre.localeCompare(a.nombre)); break;
        }

        renderProductos(filtrados);
      };

      filtros.addEventListener("change", aplicarFiltros);
      renderProductos(datos);
    })
    .catch(err => {
      container.innerHTML = "<p class='text-warning'>No se pudieron cargar los productos.</p>";
      console.error("Error al cargar productos:", err);
    });
});
