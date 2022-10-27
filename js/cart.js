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
        /* E6: añado las funciones al EL para que se carguen los datos de los products */
            costs ()
            shipmentCost()
            sumaTotal()
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
                                    <td><input style="width: 40px" min="1" onchange="inputQuant(); costs(); shipmentCost(); sumaTotal()" type="number" name="cantidad" id="cantidad" value=`+ articles.count +`></td>
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
        /* E6: añado las funciones al EL para que se carguen los datos de los products */
            costs ()
            shipmentCost() 
            sumaTotal()
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
                                <td><input style="width: 40px" min="1" onchange="inputAddedQuant(); costs(); shipmentCost(); sumaTotal()" type="number" name="cantidad" id="newCantidad" value="1"></td>
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

/* E6: Defino funciones para calcular la suma de los costos por producto */
function costs (){
    let qant = document.getElementById("newCantidad");
    let qant1 = document.getElementById("cantidad");
    for (let i = 0; i < cartArray.articles.length; i++)  { 
        let articles = cartArray.articles[i];
        let cost = articles.unitCost;
        let cost1 = addedProd.cost;

        if ((articles.currency === "UYU") && (addedProd.currency === "USD") ){

            document.getElementById("cost").innerHTML = + (cost/40*qant1.value+cost1*qant.value) +" USD";

        }if ((articles.currency === "UYU") && (addedProd.currency === "UYU") ){

            document.getElementById("cost").innerHTML = + (cost/40*qant1.value+cost1/40*qant.value) +" USD";
 
        }if ((articles.currency === "USD") && (addedProd.currency === "UYU") ){

            document.getElementById("cost").innerHTML = + (cost*qant1.value+cost1/40*qant.value) +" USD";

        }if ((articles.currency === "USD") && (addedProd.currency === "USD") ){

            document.getElementById("cost").innerHTML = + (cost*qant1.value+cost1*qant.value) +" USD";

        

    }

}
}
/* E6: el costo del envío según el tipo seleccionado */
function shipmentCost(){
    let option1 = document.getElementById("radio1");
    let option2 = document.getElementById("radio2");
    let option3= document.getElementById("radio3");

    let costo = parseInt(document.getElementById("cost").innerHTML);

    if (option1.checked){
        document.getElementById("shipping").innerHTML =+  (costo)*0.15 + " USD";
    } if (option2.checked){
        document.getElementById("shipping").innerHTML =+ (costo)*0.07 + " USD";
    } if (option3.checked){
        document.getElementById("shipping").innerHTML =+ (costo)*0.05 + " USD";
    }
    }


/* E6: y los totales */

function sumaTotal(){
  
    let costo = parseInt(document.getElementById("cost").innerHTML);
    let envío = parseInt(document.getElementById("shipping").innerHTML);

    document.getElementById("suma").innerHTML = + (costo) + (envío) + " USD"

}

/* E6: Añado función para mostrar campos de tarjeta de crédto y cuenta de banco */
// variable del modal, botón y cierre del modal
let modal = document.getElementById("myModal");
let btn = document.getElementById("choose");
let span = document.getElementsByClassName("close")[0];

// función que abre el modal
btn.onclick = function() {
  modal.style.display = "block";
}

// funciones que cierra el modal al hacer click en x o fuera del modal
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Función que inhabilita opción de ba al seleccionar cc
function creditCard(){
    let option4 = document.getElementById("radio4")
    let option5 = document.getElementById("radio5")
    let bA = document.getElementById("ba")
    option5.disabled = option4.checked ? false : true;
    option5.value="";
    if (option4.checked) {
        option5.disabled = true;
        bA.disabled = true;
    }
}
// Función que inhabilita cc al seleccionar ba
function bankAccount(){
    let option4 = document.getElementById("radio4")
    let option5 = document.getElementById("radio5")
    let name = document.getElementById("name")
    let num = document.getElementById("num")
    let cvv = document.getElementById("cvv")
    let date = document.getElementById("date")
    if (option5.checked){
        option4.disabled = true;
        name.disabled = true;
        num.disabled = true;
        cvv.disabled = true;
        date.disabled = true;
    }
}
// Función para guardar cambios y mostrarlos en htm

let name = document.getElementById("name");
let num = document.getElementById("num");
let cvv = document.getElementById("cvv");
let date = document.getElementById("date");
let ba = document.getElementById("ba");
let option4 = document.getElementById("radio4");
let option5 = document.getElementById("radio5");
let calle = document.getElementById("calle");
let numero = document.getElementById("numero");
let esquina = document.getElementById("esquina");
let choose = document.getElementById("choose");
let saveForm = document.getElementById("saveForm");

function save(){

    if(option4.checked)
    {
        if (name.value === ""){ 
        name.classList.add('is-invalid');

        modal.style.display = "block";
        }   
        if(num.value === ""){
            num.classList.add('is-invalid');

            modal.style.display = "block";
        }   
        if (cvv.value === ""){ 
            cvv.classList.add('is-invalid');

            modal.style.display = "block";
        }   
        if (date.value === ""){ 
            date.classList.add('is-invalid');

            modal.style.display = "block";
        }   
        if (name.value&&num.value&&cvv.value&&date.value !== ""){ 
                document.getElementById("paymentSelected").innerHTML =  "Tarjeta de crédito" 
                modal.style.display = "none";
        }
    }   
    if(option5.checked){
            if(ba.value === ""){
                ba.classList.add('is-invalid');
                
            }   
            if(ba.value !== ""){
                modal.style.display = "none";
                document.getElementById("paymentSelected").innerHTML = "Transferencia bancaria"
                
            }   
    }
    if ((option4.checked&&option5.checked)=== false){
        saveForm.classList.add('is-invalid');

    }
}



function buy(){


  if ((calle.value&&numero.value&&esquina.value)=== ""){ 

        location.href='#address'
        calle.classList.add('is-invalid');
        numero.classList.add('is-invalid');
        esquina.classList.add('is-invalid');
        alert("Complete todos los campos")
    }
      
    if (calle.value&&numero.value&&esquina.value !== ""){ 
        document.getElementById("address").innerHTML =  "Dirección: " + calle.value + " " 
        + numero.value +  "<br />" + "Esquina: " + esquina.value
    }
    if ((option4.checked&&option5.checked)=== false){
        choose.classList.add('is-invalid'); 
    }
    if (calle.value && numero.value && esquina.value && (option4.checked || option5.checked)) {

        alert("Compra exitosa")
    }  

}



