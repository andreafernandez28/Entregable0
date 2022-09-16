let productsInfoArray = [];
const prodId =  localStorage.getItem("prodId");
let commentsArray = [];

/* E3: añado event listener para obtener datos de json de productos */
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL + prodId + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
          
            productsInfoArray = resultObj.data;
            showProductsInfo (productsInfoArray);
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
                    <h6>Fotos</h6> 
                </div>
            </div>   
        </div>  
        <div class="row">

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
