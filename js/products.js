/* Array para cargar datos + E2: min y max para el filtrado de productos por precio */
let productsArray = [];
let min = undefined;
let max = undefined;
let search = "";
const catID = localStorage.getItem("catID") /* E2: agrego el catid para mostrar todos los productos en lugar de solo los autos */

/* Función para recibir datos e imprimirlos en pantalla*/
function showProductsList(){

    let htmlContentToAppend = "";

    for (let i = 0; i < productsArray.products.length; i++)  { 
        let product = productsArray.products[i];
        
/* E2: Transforma los nombres de los productos en minúsculas para que luego el producto pueda figurar en la búsqueda */
        if(product.name.toLowerCase().includes(search.toLowerCase())){ 
           
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
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
/* E2: desafiate */
    document.getElementById("search").addEventListener("input", function(){

        search = document.getElementById("search").value;
        showProductsList(productsArray);

    });

});


