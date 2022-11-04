/* E7: función que redirige a inicio de sesión al cargar la página si el usuario no está logeado + mostrar mail almacenado en LS en input */
let email = document.getElementById("email");
let usuario = localStorage.getItem("username");
let showUsuario = usuario.replace(/["]+/g, '')
let name = document.getElementById("name");
let lastname = document.getElementById("lastname");
let phone = document.getElementById("phone");
let secName = document.getElementById("secName");
let secLastname = document.getElementById("secLastname");
let profile = document.getElementById("profile");

document.addEventListener("DOMContentLoaded", function (e) {
    
    if (!usuario){
        window.location.href="index.html"
    } if (usuario){
        email.value = showUsuario;
    }
})

/* E7: función para validar campos al hacer click en btn */

function savePf(){

    if (!name.value){
       name.classList.add("is-invalid");
    }
    if (!lastname.value){
        lastname.classList.add("is-invalid");
    }
    if (!phone.value){
        phone.classList.add("is-invalid");
    }

    if (name.value){
        localStorage.setItem("name", JSON.stringify(name.value));
     }
     if (lastname.value){
        localStorage.setItem("lastname", JSON.stringify(lastname.value));
     }
     if (phone.value){
        localStorage.setItem("phone", JSON.stringify(phone.value));
     }
     if (secName.value){
        localStorage.setItem("secName", JSON.stringify(secName.value));
     }
     if (secLastname.value){
        localStorage.setItem("secLastname", JSON.stringify(secLastname.value));
     }
     if (name.value && lastname.value && phone.value && email.value && secName.value && secLastname.value){
        document.getElementById("profile").innerHTML =  "Nombre: " + localStorage.getItem("name").replace(/["]+/g, '') + " " 
        + localStorage.getItem("secName").replace(/["]+/g, '') +  " " + localStorage.getItem("lastname").replace(/["]+/g, '') + " " + 
        localStorage.getItem("secLastname").replace(/["]+/g, '') + "<br></br>" +
        "Teléfono: " + localStorage.getItem("phone").replace(/["]+/g, '') + "<br></br>" + "Email: " + showUsuario
    }
    if (name.value && lastname.value && phone.value && email.value){
        document.getElementById("profile").innerHTML =  "Nombre: " + localStorage.getItem("name").replace(/["]+/g, '') + " " 
        + " " + localStorage.getItem("lastname").replace(/["]+/g, '') + " "  + "<br></br>" +
        "Teléfono: " + localStorage.getItem("phone").replace(/["]+/g, '') + "<br></br>" + "Email: " + showUsuario
    }
    if (name.value && lastname.value && phone.value && email.value && secName.value){
        document.getElementById("profile").innerHTML =  "Nombre: " + localStorage.getItem("name").replace(/["]+/g, '') + " " 
        + localStorage.getItem("secName").replace(/["]+/g, '') + " " + localStorage.getItem("lastname").replace(/["]+/g, '') + " "  
        + "<br></br>" + "Teléfono: " + localStorage.getItem("phone").replace(/["]+/g, '') + "<br></br>" + "Email: " + showUsuario
    }
    if (name.value && lastname.value && phone.value && email.value && secLastname.value){
        document.getElementById("profile").innerHTML =  "Nombre: " + localStorage.getItem("name").replace(/["]+/g, '') + " " 
        + " " + localStorage.getItem("lastname").replace(/["]+/g, '') + " "  + localStorage.getItem("secLastname").replace(/["]+/g, '') + 
        "<br></br>" + "Teléfono: " + localStorage.getItem("phone").replace(/["]+/g, '') + "<br></br>" + "Email: " + showUsuario
    }
}

/* E7: Desafío */
let upload = document.getElementById("upload");

var loadFile = function(event) {
	var pfp = document.getElementById("pfp")
	pfp.src = URL.createObjectURL(event.target.files[0]);
    
    if(!upload.select){
        pfp.scr = img/pfp.jpg
    }
};
