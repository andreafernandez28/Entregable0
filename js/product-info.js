let productsInfoArray = [];
const prodId =  localStorage.getItem("prodId");
let commentsArray = [];
let relatedProducts = []; /* E4: array para recibir datos de productos relacionados */ 

/* E3: añado event listener para obtener datos de json de productos */
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL + prodId + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
          
            productsInfoArray = resultObj.data;
            relatedProducts = resultObj.data.relatedProducts; /* E4: cargo datos de json al array relatedProducts*/
            showProductsInfo (productsInfoArray);
            showRelated ()
        }
    });
})
/* E3: Añado Event Listener para obtener datos de comentarios*/
    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCT_INFO_COMMENTS_URL + prodId + EXT_TYPE).then(function(resultObj){
            if (resultObj.status === "ok"){
              
                commentsArray = resultObj.data;
                showComments (commentsArray);
            }
        });

    });

function showProductsInfo () {

    let htmlContentToAppend = "";
    htmlContentToAppend = `
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                    <h1>`+ productsInfoArray.name +`</h1> <br></br>
                    <h6>Precio</h6> 
                    <p> `+ productsInfoArray.cost + " " + productsInfoArray.currency +`</p>
                    <h6>Descripción</h6> 
                    <p> `+ productsInfoArray.description +`</p> 
                    <h6>Vendidos</h6> 
                    <p> `+ productsInfoArray.soldCount+`</p> 
                    <h6>Fotos</h6> 
                </div>
            </div>   
        </div>  

  
        <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="10000">
                    <img src="` + productsInfoArray.images[0] + `" class="d-block w-50" alt="img1">
                </div>
                <div class="carousel-item " data-bs-interval="2000">
                    <img src="` + productsInfoArray.images[1] + `"  class="d-block w-50" alt="img2" >
                </div>
                <div class="carousel-item ">
                    <img src="` + productsInfoArray.images[2] + `"  class="d-block w-50" alt="img3">
                </div>
                <div class="carousel-item ">
                    <img src="` + productsInfoArray.images[3] + `"  class="d-block w-50" alt="img4">
                </div>
            </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
           <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
           </button>
        </div>
     `
    document.getElementById('products-info').innerHTML += htmlContentToAppend;

}
/* E3: función para mostrar comentarios*/
function showComments(commentsArray){

    let htmlContentToAppend = "";
    for(let i = 0; i < commentsArray.length; i++){
        let comments = commentsArray[i];

        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-5">
                    <p><span class="fw-bold">${comments.user}</span> - <small class="text-muted">${comments.dateTime}</small> - ${addStars(comments.score)}</p>
                    </div>
                    <div class="row">
                        <div class="d-flex w-100 justify-content-between">
                        <p>${comments.description}</h4>
                            
                        </div>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("comments").innerHTML = htmlContentToAppend;
    }
/* E3: función para añadir estrellas según puntaje */
function addStars(starScore){
        
    let append = "";

    for(let i=0; i<5; i++){
         if(i<starScore){
            append += `<span class="fa fa-star checked"></span>`;
         }
         else{
            append += `<span class="fa fa-star"></span>`;
        }
    }
    return (append)
}

/* E3: Desafiate */

function formatDate() {
    let date = new Date ()
    return (
      [
        date.getFullYear(),
        (date.getMonth() + 1),
        (date.getDate()),
      ].join('-') +
      ' ' +
      [
        (date.getHours()),
        (date.getMinutes()),
        (date.getSeconds()),
      ].join(':')
    );
  }
  
function addComment() {
    let addOpinion = document.getElementById("opinion").value
    let stars = document.getElementById("stars").value
    let user = localStorage.getItem("username");
    let showUsuario = user.replace(/["]+/g, '')

    let htmlContentToAppend = "";

    htmlContentToAppend += `

        <div class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="d-flex w-100 justify-content-between">    
                    <p><span class="fw-bold">${showUsuario}</span> - <small class="text-muted">${formatDate()}</small> - ${addStars(stars)}</p>
                </div>
            </div>
            <div class="row">
                <div class="d-flex w-100 justify-content-between">
                 <p>${addOpinion}</p>
                 </div>
            </div>
        </div>
        `

    document.getElementById("comments").innerHTML += htmlContentToAppend;
};

document.getElementById("bttn").addEventListener("click", function(){

    addComment()
});

                                    /* E4: productos relacionados */

/* E4: almaceno el id de los productos relacionados para que al hacer click, se acceda a la página del producto*/
function setProdId(id) {
    localStorage.setItem("prodId", id);
    window.location = "product-info.html"
}

/* E4: función para mostrar los productos relacionados */
function showRelated (){
    let htmlContentToAppend = "";

    for (let i = 0; i < relatedProducts.length; i++)  { 
        let product =  relatedProducts[i];

        htmlContentToAppend += `
        <div class="column">
            <div class="col-6">
                <div onclick="setProdId(${product.id})" class="card mb-3 shadow-sm custom-card cursor-active" >
                    <img src="` + product.image + `" alt="img1" style="width:100%">
                    <p>`+ product.name +`</p> 
                </div>
            </div> 
        </div> 
        `
        document.getElementById("related").innerHTML = htmlContentToAppend; 
    }

}        

    