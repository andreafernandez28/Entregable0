/* función para redirigir a página principal luego de iniciar sesión*/

function Redirect() {
    var usuario = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contraseña").value;

    if (usuario&&contraseña) {
        window.location.href="principal.html"
        /* E2: Almaceno el nombre de usuario al inicial sesión y lo convierto en una cadena JSON */
        localStorage.setItem("username",JSON.stringify(usuario)) 
    }  
}
