// validarQR.js - Lógica para escanear y validar QR en QrossPass

let usuariosSimulados = [];

// Cargar datos simulados de usuarios
fetch('../../config/partners/usuariosSimulados.json')
  .then(response => response.json())
  .then(data => {
    usuariosSimulados = data;
    inicializarEscaner();
  })
  .catch(error => console.error('Error cargando usuarios simulados:', error));

function inicializarEscaner() {
  const html5QrCode = new Html5Qrcode("reader");

  Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
      html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: 250
        },
        qrCodeMessage => {
          html5QrCode.stop();
          validarQR(qrCodeMessage);
        },
        errorMessage => {
          // Silenciar errores de escaneo
        }
      );
    }
  }).catch(err => console.error('No se pudo iniciar la cámara:', err));
}

function validarQR(qrCode) {
  const usuario = usuariosSimulados.find(u => u.qr === qrCode);

  if (!usuario) {
    Swal.fire({
      icon: 'error',
      title: 'QR no válido',
      text: 'Este código no corresponde a ningún usuario registrado.'
    }).then(() => location.reload());
    return;
  }

  mostrarDatosUsuario(usuario);
}

function mostrarDatosUsuario(usuario) {
  document.getElementById('nombre-usuario').textContent = usuario.nombre;
  document.getElementById('plan-usuario').textContent = usuario.plan;
  document.getElementById('vigencia-usuario').textContent = usuario.vigencia;
  document.getElementById('acompanantes-usuario').textContent = usuario.acompanantesDisponibles;

  document.getElementById('resultado-usuario').classList.remove('d-none');

  document.getElementById('btn-acceso').onclick = () => aprobarAcceso(usuario, false);
  document.getElementById('btn-acompanante').onclick = () => aprobarAcceso(usuario, true);

  if (usuario.plan !== 'Multigym Pro' || usuario.acompanantesDisponibles <= 0) {
    document.getElementById('btn-acompanante').disabled = true;
  }
}

function aprobarAcceso(usuario, esAcompanante) {
  if (esAcompanante && usuario.acompanantesDisponibles <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'No quedan acompañantes',
      text: 'Ya no tiene visitas de acompañante disponibles este mes.'
    });
    return;
  }

  if (esAcompanante) {
    usuario.acompanantesDisponibles -= 1;
    actualizarUsuario(usuario);
  }

  registrarCheckin(usuario, esAcompanante);
}

function registrarCheckin(usuario, esAcompanante) {
  const fecha = new Date().toISOString();
  const registro = {
    nombre: usuario.nombre,
    fecha: fecha,
    tipo: esAcompanante ? 'Acompañante' : 'Titular'
  };

  // Simulación: guardar en localStorage
  const registros = JSON.parse(localStorage.getItem('checkins')) || [];
  registros.push(registro);
  localStorage.setItem('checkins', JSON.stringify(registros));

  Swal.fire({
    icon: 'success',
    title: esAcompanante ? 'Acompañante registrado' : 'Acceso aprobado',
    text: 'Registro exitoso.'
  }).then(() => location.reload());
}

function actualizarUsuario(usuarioActualizado) {
  const index = usuariosSimulados.findIndex(u => u.qr === usuarioActualizado.qr);
  if (index !== -1) {
    usuariosSimulados[index] = usuarioActualizado;
    // Simulación: guardar cambios en localStorage si quieres persistir
  }
}
