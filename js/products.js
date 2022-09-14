/* Array para cargar datos + E2: min y max para el filtrado de productos por precio */
let productsArray = [];
let min = undefined;
let max = undefined;
let search = "";
const catID = localStorage.getItem("catID"); /* E2: agrego el catid para mostrar todos los productos en lugar de solo los autos */

/* E3: función donde se guarda el ID del producto*/

function setProdId(id) {
    localStorage.setItem("prodId", id);
    window.location = "products.html"
}

/* E1: Función para recibir datos e imprimirlos en pantalla*/
function showProductsList(){

    let htmlContentToAppend = "";

    for (let i = 0; i < productsArray.products.length; i++)  { 
        let product = productsArray.products[i];

/* E2: Creo condicional para filtrar por rango de precios, a utilizar en el event listener con el botón de filtrar */

        product.cost=parseInt(product.cost);
        if((product.cost >= min || min == undefined) && (product.cost <= max || max == undefined)){ 

/* E2: Transforma los nombres de los productos en minúsculas para que luego el producto pueda figurar en la búsqueda */
            if(product.name.toLowerCase().includes(search.toLowerCase())){ 
            
/* E3: añado href para redirigir a products-info al hacer click en cada producto, obteniendo los datos almacenados en la función anterior */
                htmlContentToAppend += `
                <a href="product-info.html" onclick="setProdId(${product.id})" class="list-group-item list-group-item-action"> 
                    <div class="row">
                        <div class="col-3">
                            <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                        </div>
                    </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <div class="mb-1">
                                    <h4>`+ product.name +`</h4> 
                                    <p> `+ product.cost + " " + product.currency +`</p>
                                    <p> `+ product.description +`</p> 
                                </div>
                                    <small class="text-muted">` + product.soldCount + ` vendidos</small> 
                            </div>

                        </div>
                    </div>
                </div>
                `
                document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
            }
        }
    }   
}


/* A getJSONData()se le envía la dirección de Json para acceder al listado de autos. La función verifica el estado del objeto
 y se cargan los datos en el array de la línea 1. Finalmente se llama a la función showAutosList con el array como parámetro 
 para cargar los datos en pantalla*/

 

document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(PRODUCTS_URL + catID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProductsList(productsArray);
        }
    });
    
/* E2: agrego events listeners a la funcion donde se se accede al listado con getJSONdata para que se cumpla con cada filtro al hacer click en los respectivos botones*/
    document.getElementById("sortRelev").addEventListener("click", function(){

        productsArray.products.sort(function(a, b){
            return parseInt(b.soldCount) - parseInt(a.soldCount);
        });

        showProductsList(productsArray);
    });

    document.getElementById("precioAsc").addEventListener("click", function(){

        productsArray.products.sort(function(a, b){
            return parseInt(a.cost) - parseInt(b.cost);
        });

        showProductsList(productsArray);
    });

    document.getElementById("precioDesc").addEventListener("click", function(){

        productsArray.products.sort(function(a, b){
            return parseInt(b.cost) - parseInt(a.cost);
        });

        showProductsList(productsArray);
    });

    document.getElementById("filter").addEventListener("click", function(){

        if (document.getElementById("rangeMin").value !=""){
            min= parseInt(document.getElementById("rangeMin").value);
        }
        else{
            min = undefined;
        }

        if (document.getElementById("rangeMax").value !=""){
            max= parseInt(document.getElementById("rangeMax").value);
        }
        else{
            max = undefined;
        }

        showProductsList(productsArray);
    });

    document.getElementById("clean").addEventListener("click", function(){
        min = undefined;
        max = undefined;
        showProductsList(productsArray);

        document.getElementById("rangeMax").value ="";
        document.getElementById("rangeMin").value ="";

    });
/* E2: desafiate */
    document.getElementById("search").addEventListener("input", function(){

        search = document.getElementById("search").value;
        showProductsList(productsArray);

    });

});


