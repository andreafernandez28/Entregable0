/* función para redirigir a página principal luego de iniciar sesión*/
function Redirect() {
    var usuario = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contraseña").value;

    if (usuario&&contraseña) {
        window.location.href="principal.html"
    } else {
        alert("Completar Usuario y Contraseña por favor")
    }  
  }