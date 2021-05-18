// == POUR LA PAGE PRODUCT.HTML ==
const dataProduct = document.querySelector(".product__page");
let id = window.location.search.substr(1);
let data;
// RECUPERER L'ID DU PRODUIT
const fetchDatas = async () => {
  data = await fetch(`http://localhost:3000/api/cameras/${id}`).then((res) =>
    res.json()
  );
};
// SEPARATEUR DE MILLIER
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
// AFFICHER LES DONNEES DU PRODUIT
const showDatas = async () => {
  await fetchDatas();

  dataProduct.innerHTML = `
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
                <button onclick="oneAddToCounter()">
                    <i class="fas fa-plus"></i>
                </button>
                <button onclick="oneRemoveToCounter()">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
        </div>
         `;
};
showDatas();

// == POUR LE COMPTEUR DU PANIER ==
const getCart = document.querySelector(".cart");
const addToCart = document.querySelector(".addToCart");
let cartCounter = 0;

// AJOUTER UNE UNITEE AU COMPTEUR
function oneAddToCounter() {
  // AFFICHER LE COMPTEUR APRES AJOUT
  cartCounter++ ;
  getCart.classList.add("cart--active");
  getCart.innerHTML = cartCounter;
return cartCounter;
}

// RETIRER UNE UNITEE AU COMPTEUR
function oneRemoveToCounter() {
  // AFFICHER LE COMPTEUR APRES SUPPRESSION
    cartCounter-- ;
    getCart.innerHTML = cartCounter;
    if (cartCounter <= 0) {
        cartCounter = 0;
        getCart.classList.remove("cart--active");
    }
  return cartCounter;
}

// SYNCRONISER LA VALEUR DE LA VARIABLE DANS LE COMPTEUR VISIBLE

