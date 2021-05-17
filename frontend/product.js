// == POUR LA PAGE PRODUCT.HTML ==
const dataProduct = document.querySelector(".product__page");
let id = window.location.search.substr(1);
let data;
// RECUPERER L'ID DU PRODUIT
const fetchDatas = async() => {
   data = await fetch(`http://localhost:3000/api/cameras/${id}`).then(res => res.json());
};
// SEPARATEUR DE MILLIER
function numberWithSpaces(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
// AFFICHER LES DONNEES DU PRODUIT
const showDatas = async() => {
   await fetchDatas();
   console.log(data);

   dataProduct.innerHTML = (
         `
         <img src="${data.imageUrl}" alt="">
        <div class="product__infos">
            <p class="product__title">
               ${data.name}
            </p>
            <p class="product__description">
               Description :<br>${data.description}
            </p>
            <label for="lenses">Lentilles :</label>
            <select name="lenses" id="lenses">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
            </select>
            <div>
                <p>
                  ${numberWithSpaces(data.price)}
                </p>
                <button type="button">
                    <i class="fas fa-cart-plus"></i>
                </button>
            </div>
        </div>
         `
   );
};
showDatas();
