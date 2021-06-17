// == POUR LA PAGE PRODUCT.HTML ==
const dataProduct = document.querySelector(".product__page");
let id = window.location.search.substr(1);
let data;
let cart = [];

if (localStorage.getItem("productsInCart")) {
  cart = JSON.parse(localStorage.getItem("productsInCart"));
}

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

// == POUR LE COMPTEUR DU PANIER ==
const getCartClass = document.querySelector(".cart");
let cartCounter = 0;
cart.forEach((element) => {
  // PARCOURT LA LISTE DES PRODUITS DANS LE PANIER
  cartCounter += element[1]; // AJOUTE LA QUANTITÉ DU PRODUIT A LA VARIABLE
});
getCartClass.innerHTML = cartCounter; // AFFICHE LA QUANTITÉ DES PRODUITS DANS LE PANIER
getCartClass.classList.add("cart--active");


// AJOUTER LE PRODUIT AU PANIER
function addToCart() {
  // SI LE PANIER EST VIDE
  if (cart.length == 0) {
    cart.push([data, 1]); // ON AJOUTE LE PRODUIT AVEC UNE QUANTITÉ A 1
  } else {
    let addElement = false; // BOOLÉEN QUI INDIQUE SI UN PRODUIT A ÉTÉ AJOUTÉ
    cart.forEach((element) => {
      // SI L'ID DU PRODUIT A AJOUTER EST DÉJA DANS LE TABLEAU
      if (element[0]._id == data._id) {
        element[1]++; // ON INCREMENTE LA QUANTITÉ
        addElement = true;
      }
    });
    // SI AUCUN PRODUIT A ÉTÉ AJOUTÉ AU PANIER
    if (!addElement) {
      cart.push([data, 1]); // ON AJOUTE LES DONNÉES DU PRODUIT AVEC LA QUANTITÉ A 1
    }
  }
  // ON ENVOIT LE CONTENU DU PANIER DANS LE LOCAL STORAGE.
  localStorage.setItem("productsInCart", JSON.stringify(cart));
}

// AJOUTER UNE UNITEE AU COMPTEUR
function oneAddToCounter() {
  addToCart();
  cartCounter++;
  // AFFICHER LE COMPTEUR APRES AJOUT
  getCartClass.innerHTML = cartCounter;
  getCartClass.classList.add("cart--active");
  return cartCounter;
}

// SUPPRIMER UN ARTICLE
function removeFromCart(product) {
  cart = cart.filter((element) => element[0] !== product);
  localStorage.setItem("productsInCart", JSON.stringify(cart));
}

// RETIRER LE PRODUIT DU PANIER
function removeToCart() {
  // SI LE PANIER N'EST PAS VIDE
  if (cart.length !== 0) {
    cart.forEach((element) => {
      // SI LE PRODUIT EST DÉJA PRÉSENT DANS LE TABLEAU
      if (element[0]._id == data._id) {
        element[1]--; // ON RETIRE UNE QUANTITÉ AU PRODUIT
        cartCounter--;
        // SI LA QUANTITÉ D'UN PRODUIT EST = 0
        if (element[1] == 0) {
          removeFromCart(element[0]);
        }
      }
    });
  }
  localStorage.setItem("productsInCart", JSON.stringify(cart));
}

// RETIRER UNE UNITEE AU COMPTEUR
function oneRemoveToCounter() {
  removeToCart();
  getCartClass.innerHTML = cartCounter;
  // AFFICHER LE COMPTEUR APRES SUPPRESSION
  if (cartCounter <= 0) {
    cartCounter = 0;
    getCartClass.classList.remove("cart--active");
  }
  return cartCounter;
}
