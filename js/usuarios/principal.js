document.addEventListener("DOMContentLoaded", function() {
  inicializarCarruselPro();
});

function inicializarCarruselPro() {
  const carouselInner = document.getElementById('carousel-inner-pro');

  if (!carouselInner) return;

  fetch('../../config/bannersPro.json')

    .then(response => response.json())
    .then(gimnasiosPro => {
      if (gimnasiosPro.length === 0) {
        gimnasiosPro = [
          {
            nombre: "QrossPass Default",
            imagen: "assets/images/banners/qrosspass-default-banner.jpg",
            link: "#"
          }
        ];
      }

      gimnasiosPro.forEach((gym, index) => {
        const activeClass = index === 0 ? 'active' : '';

        const bannerHTML = `
          <div class="carousel-item ${activeClass}">
            <a href="${gym.link}">
              <img src="${gym.imagen}" class="d-block w-100 rounded-3 shadow" alt="${gym.nombre}">
            </a>
          </div>
        `;

        carouselInner.innerHTML += bannerHTML;
      });
    })
    .catch(error => {
      console.error('Error cargando los banners:', error);
    });
}
