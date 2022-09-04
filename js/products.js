const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_ASC_BY_PRICE = "$->$$";
const ORDER_DESC_BY_PRICE = "$$->$";
const ORDER_BY_PROD_COUNT = "Precio";
const ORDER_BY_MAX_PRICE = "Cant.Max";
const ORDER_BY_MIN_PRICE = "Cant.Min";

let arrayFiltro = [];

function comparacion(a,b){
    return a.name.localeCompare(b.name)
}

function mostrarOrdenado(criterio, array){
let result = [];
    if(criterio === ORDER_ASC_BY_NAME){
        arrayFiltro = array.sort(comparacion)
    }
    if (criterio === ORDER_DESC_BY_NAME){
        arrayFiltro = array.reverse(comparacion)
    }
    if (criterio === ORDER_ASC_BY_PRICE){
        arrayFiltro = array.sort((a,b) => {return a.cost - b.cost} )
    }
    if (criterio === ORDER_DESC_BY_PRICE){
        arrayFiltro = array.reverse((a,b) => {return a.cost - b.cost} )
    }
    if (criterio === ORDER_BY_PROD_COUNT){
        arrayFiltro = array.sort((a,b) => {return a.soldCount - b.soldCount} )
    }

    document.getElementById("cat-list-container").innerHTML= ""
    showCategoriesList(arrayFiltro)
}



document.addEventListener("DOMContentLoaded", function(){
    fetch( PRODUCTS_URL + localStorage.getItem('catID') + EXT_TYPE)
    .then(res => res.json())
    .then(data =>{
        const ArrayDatos = data
        arrayFiltro = data.products
        document.getElementById('cat-name').innerHTML = ArrayDatos.catName
        showCategoriesList(arrayFiltro)
    });

// ordenador de productos 

document.getElementById('sortAsc').addEventListener("click", function(){
    mostrarOrdenado(ORDER_ASC_BY_NAME, arrayFiltro);
});
document.getElementById('sortDesc').addEventListener("click", function(){
    mostrarOrdenado(ORDER_DESC_BY_NAME, arrayFiltro);
});

document.getElementById('sortPriceAsc').addEventListener("click", function(){
    mostrarOrdenado(ORDER_ASC_BY_PRICE, arrayFiltro);
});

document.getElementById('sortPriceDesc').addEventListener("click", function(){
    mostrarOrdenado(ORDER_DESC_BY_PRICE, arrayFiltro);
});

document.getElementById('sortByCount').addEventListener("click", function(){
    mostrarOrdenado(ORDER_BY_PROD_COUNT, arrayFiltro);
});




});

let categoriesArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        let category = array[i];
        htmlContentToAppend += `
        <div class= "list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name + ` - `  + category.currency + ` ` + category.cost + `</h4> 
                        <p> `+ category.description +`</p> 
                        </div>
                        <small class="text-muted">` + category.soldCount + ` vendidos </small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
}

if(localStorage.getItem('user') != undefined){
    document.getElementById("loginUser").innerHTML = localStorage.getItem('user');
}

