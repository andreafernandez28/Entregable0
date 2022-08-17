/* Array para cargar datos */
let autosArray = [];

/* Función para recibir datos e imprimirlos en pantalla*/
function showAutosList(){
    let htmlContentToAppend = "";

    for (let i = 0; i < autosArray.products.length; i++)  { 
        let auto = autosArray.products[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + auto.image + `" alt="product image" class="img-thumbnail">
                </div>
            </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                            <h4>`+ auto.name +`</h4> 
                            <p> `+ auto.cost + " " + auto.currency +`</p>
                            <p> `+ auto.description +`</p> 
                        </div>
                            <small class="text-muted">` + auto.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }   
}
/* A getJSONData()se le envía la dirección de Json para acceder al listado de autos. La función verifica el estado del objeto
 y se cargan los datos enel array de la línea 1. Finalmente se llama a la función showAutosList con el array como parámetro 
 para cargar los datos en pantalla*/

document.addEventListener("DOMContentLoaded", function(e){
    
    getJSONData(PRODUCTS_URL + "101" + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            autosArray = resultObj.data;
            showAutosList(autosArray);
        }
    });
});