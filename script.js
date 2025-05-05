let form = document.getElementById("form");

function validarFormulario(e) {
  e.preventDefault(); // Evita el envío del formulario por defecto

  let name = document.getElementById("nombre").value;
  let password = document.getElementById("contrasena").value;

  if (name !== "Liderly") {
    alert("Nombre de usuario no válido. Por favor, usa: Liderly");
    return;
  }

  if (password !== "123456") {
    alert("Contraseña no válida. Por favor, usa: 123456");
    return;
  }

  let saludo = obtenerSaludo();
  alert(`Hola, ${saludo} ${name}, bienvenido`);

  // Redirigir a otra página después de cerrar la alerta
  window.location.href = "./catalog/index.html";
}

function obtenerSaludo() {
  let hora = new Date().getHours();
  if (hora >= 5 && hora < 12) {
    return "buenos días";
  } else if (hora >= 12 && hora < 18) {
    return "buenas tardes";
  } else {
    return "buenas noches";
  }
}

form.addEventListener("submit", validarFormulario);