const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

/* E2: eventlistener que recibe el nombre de usuario almacenado localmente y lo agrega al documento html*/
const user = document.getElementById("header")

document.addEventListener("DOMContentLoaded", function (e) {
  let usuario = localStorage.getItem("username");
  let showUsuario = usuario.replace(/["]+/g, '')

/* E4: añado dropdown menu */
  htmlContentToAppend = 
    ` <div class="nav-link dropdown"> Hola, ${showUsuario}</a>
          <div class="dropdown">
            <button class="dropbtn">▼</button>
                <div class="dropdown-content">
                  <a href="cart.html">Mi carrito</a>
                  <a href="my-profile.html">Mi perfil</a>
                  <a href="index.html">Cerrar sesión</a>
                </div>
              </div>
          </div>
      </div>
    `
  user.innerHTML = htmlContentToAppend;

});



