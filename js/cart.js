let cartArray = []; /* E5: Array donde cargo datos de Cart-info*/


/* E5: EL donde recibo la info del carrito del usuario 25801 y la cargo al array anterior*/
document.addEventListener("DOMContentLoaded", function(e){

    let username = localStorage.getItem("username");
    let showUsername = username.replace(/["]+/g, '')

    getJSONData(CART_INFO_URL + showUsername + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cartArray = resultObj.data;
            showCartProducts(cartArray);
            
        }
    });
})

/* E5: Función con tabla para mostrar datos del producto agregado al carrito */
function showCartProducts(){

    let htmlContentToAppend = "";

    for (let i = 0; i < cartArray.articles.length; i++)  { 
        let articles = cartArray.articles[i];

            htmlContentToAppend += `
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <table class="table table-image">
                            <thead>
                                <tr>
                                    <th scope="col"> </th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Costo</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>

                                <td class="w-25">
                                    <img src="` + articles.image + `"  class="img-fluid img-thumbnail" >
                                </td>
                                    <td>`+ articles.name +`</td>
                                    <td>`+ articles.unitCost + " " + articles.currency +`</td>
                                    <td><input style="width: 40px" min="1" onchange="inputQuant()" type="number" name="cantidad" id="cantidad" value=`+ articles.count +`></td>
                                    <td id="total">`+ (articles.unitCost * articles.count) + " " + articles.currency +`</td>
                            </tr>
                            </tbody>
                        </table>   
                    </div>
                </div>
            </div>
            `
                document.getElementById("articles-container").innerHTML = htmlContentToAppend; 
            }
        }


/* E5: Función que toma el valor del input de cantidad y lo multiplica al costo del producto para mostrar el subtotal al añadir o quitar unidades */
function inputQuant(){
    let qant = document.getElementById("cantidad").value;
    for (let i = 0; i < cartArray.articles.length; i++)  { 
        let articles = cartArray.articles[i];
    
    document.getElementById("total").innerHTML = + articles.unitCost*qant + " " + articles.currency
    }
}

/* E5: desafío */ 

const prodId =  localStorage.getItem("prodId");
let addedProd= [];
document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_URL + prodId + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            addedProd = resultObj.data;
            addItems(addedProd);
            localStorage.getItem("addedItem", addedProd)
        }
    });
})
function addItems(){
    let htmlContentToAppend = "";

        htmlContentToAppend += `
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <table class="table table-image">
                        <tr>
                            <td class="w-25">
                            
                                <img src="` + addedProd.images[0] + `"  class="img-fluid img-thumbnail" >
                            </td>
                                <td>`+ addedProd.name +`</td>
                                <td>`+ addedProd.cost + " " + addedProd.currency +`</td>
                                <td><input style="width: 40px" min="1" onchange="inputAddedQuant()" type="number" name="cantidad" id="newCantidad" value="1"></td>
                                <td id="newTotal">`+ (addedProd.cost) + " " + addedProd.currency +`</td>
                        </tr>
                        </tbody>
                    </table>   
                </div>
            </div>
        </div>
        `
            document.getElementById("added-articles-container").innerHTML = htmlContentToAppend; 
}

function inputAddedQuant(){
    let qant = document.getElementById("newCantidad").value;

    
    document.getElementById("newTotal").innerHTML = + addedProd.cost*qant + " " + addedProd.currency
    
}

