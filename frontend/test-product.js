// == POUR LA PAGE PRODUCT.HTML ==
const dataProduct = document.querySelector(".product__page");
let id = window.location.search.substr(1);
let data;
const getLensesId = document.querySelector("#lense");

// RECUPERER LES DONNEES DU PRODUIT CIBLE
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

  // AJOUTER LE TEMPLATE DU PRODUIT
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
                <option value="default">Choisissez une option</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
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

// == INITIALISATION DU PANIER ==
let cart = [];


// INITIALISER LE COMPTEUR DU PANIER
const getCartClass = document.querySelector(".cart");
let cartCounter;
if (cartCounter == 0) {
  localStorage.setItem("quantityInCart", "0");
} else {
  cartCounter = JSON.parse(localStorage.getItem("quantityInCart"));
};

// AFFICHER LE COMPTEUR SI REMPLI
getCartClass.classList.add("cart--active");

// AJOUTER LE PRODUIT AU PANIER
function addToCart() {
  cart = cart.push[JSON.stringify({id: data.id, name: data.name, price: data.price})];
  localStorage.setItem("productInCart", JSON.stringify(cart));
}

// AJOUTER UNE UNITEE AU COMPTEUR
function oneAddToCounter() {
  cartCounter++;
  localStorage.setItem("quantityInCart", JSON.stringify(cartCounter));
  getCartClass.innerHTML = cartCounter;
  addToCart();
  return cartCounter;
}

// RETIRER LE PRODUIT DU PANIER


// RETIRER UNE UNITEE AU COMPTEUR
function oneRemoveToCounter() {
  cartCounter--;
  getCartClass.innerHTML = cartCounter;
  // AFFICHER LE COMPTEUR APRES SUPPRESSION
  if (cartCounter <= 0) {
    cartCounter = 0;
    getCartClass.classList.remove("cart--active");
  }
  return cartCounter;
}

localStorage.setItem("productInCart", JSON.stringify(cart))