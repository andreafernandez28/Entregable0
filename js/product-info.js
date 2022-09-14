let productsInfoArray = [];
const prodId =  localStorage.getItem("prodId");


/* E3: añado event listener para obtener datos de json de productos */
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL + prodId + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
          
            productsInfoArray = resultObj.data;
            showProductsInfo (productsInfoArray);
        }
    });
        
})
/* E3: función para mostrar info de cada producto*/
function showProductsInfo () {

    let htmlContentToAppend = "";
    htmlContentToAppend = `
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                    <h1>`+ productsInfoArray.name +`</h1> 
                    <h6>Precio</h6> 
                    <p> `+ productsInfoArray.cost + " " + productsInfoArray.currency +`</p>
                    <h6>Descripción</h6> 
                    <p> `+ productsInfoArray.description +`</p> 
                    <h6>Vendidos</h6> 
                    <p> `+ productsInfoArray.soldCount+`</p> 
                </div>
            </div>   
        </div>  
        <div class="row">
            <h6>Fotos</h6> 
            <div class="column">
                <img src="` + productsInfoArray.images[0] + `" alt="img1" style="width:100%">
            </div>
            <div class="column">
                <img src="` + productsInfoArray.images[1] + `" alt="img2" style="width:100%">
            </div>
            <div class="column">
                <img src="` + productsInfoArray.images[2] + `" alt="img3" style="width:100%">
            </div>
            <div class="column">
                <img src="` + productsInfoArray.images[3] + `" alt="img4" style="width:100%">
            </div>
        </div>
          
     `
    document.getElementById('products-info').innerHTML += htmlContentToAppend;

}

