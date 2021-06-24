// == POUR LE COMPTEUR DU PANIER ==

// RECUPERER LE NOMBRE DE PRODUITS DANS LE PANIER
let cart = [];
let cartCounter = 0;
const getCartClass = document.querySelector(".cart");

function getCartCounter() {
  if (localStorage.getItem("productsInCart")) {
    cart = JSON.parse(localStorage.getItem("productsInCart"));
    console.log(
      "Les produits du localstorage ont été ajouté dans la variable 'cart'"
    );
  }
  // PARCOURT LA LISTE DES PRODUITS DANS LE PANIER
  cart.forEach((element) => {
    // AJOUTE LA QUANTITÉ DU PRODUIT A LA VARIABLE
    cartCounter += element[1];
  });
  // AFFICHE LA QUANTITÉ DES PRODUITS DANS LE PANIER
  getCartClass.innerHTML = cartCounter;
  if (cartCounter > 0) {
    getCartClass.classList.add("cart--active");
  }
}

getCartCounter();

// == POUR LA PAGE PRODUCT.HTML ==

// RECUPERER LES DONNEES DU PRODUIT CIBLE
const dataProduct = document.querySelector(".product__page");
let id = window.location.search.substr(1);
let product;

const fetchProduct = async () => {
  product = await fetch(`http://localhost:3000/api/cameras/${id}`).then((res) =>
    res.json()
  );
};

// SEPARATEUR DE MILLIER
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// AFFICHER LES DONNEES DU PRODUIT
const showProduct = async () => {
  await fetchProduct();

  // AJOUTER LE TEMPLATE DU PRODUIT
  dataProduct.innerHTML = `
         <img src="${product.imageUrl}" alt="">
        <div class="product__infos">
            <p class="product__title">
               ${product.name}
            </p>
            <p class="product__description">
               Description :<br>${product.description}
            </p>
            <label for="lenses">Lentilles :</label>
            <select name="lenses" id="lenses">
                <option value="default">Choisissez une option</option>
            </select>
            <div>
                <p>
                  ${numberWithSpaces(product.price / 100)}
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

  // AFFICHER LES DIFFERENTES LENTILLES
  getLensesId = document.querySelector("#lenses");
  value = 1;

  function showLenses() {
    product.lenses.forEach((element) => {
      getLensesId.innerHTML += `
        <option value="${value}">${element}</option>
        `;
      value++;
    });
  }

  showLenses();
};

showProduct();

// AJOUTER LE PRODUIT AU PANIER
function addToCart() {
  // SI LE PANIER EST VIDE
  if (cart.length == 0) {
    cart.push([product, 1]); // ON AJOUTE LE PRODUIT AVEC UNE QUANTITÉ A 1
    alert("Vous venez d'ajouter un " + product.name + " à votre panier");
  } else {
    let addElement = false; // BOOLÉEN QUI INDIQUE SI UN PRODUIT A ÉTÉ AJOUTÉ
    cart.forEach((element) => {
      // SI L'ID DU PRODUIT A AJOUTER EST DÉJA DANS LE TABLEAU
      if (element[0]._id == product._id) {
        element[1]++; // ON INCREMENTE LA QUANTITÉ
        alert(
          "Ajout au panier : Vous avez maintenant " +
            element[1] +
            " " +
            product.name +
            " dans votre panier"
        );
        addElement = true;
      }
    });
    // SI AUCUN PRODUIT A ÉTÉ AJOUTÉ AU PANIER
    if (!addElement) {
      cart.push([product, 1]); // ON AJOUTE LES DONNÉES DU PRODUIT AVEC LA QUANTITÉ A 1
      alert("Vous venez d'ajouter un " + product.name + " à votre panier");
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
function removeFromCart(productSelected) {
  cart = cart.filter((element) => element[0] !== productSelected);
  console.log("La variable 'cart' a été mise à jour");
  localStorage.setItem("productsInCart", JSON.stringify(cart));
}

// RETIRER LE PRODUIT DU PANIER
function removeToCart() {
  // SI LE PANIER N'EST PAS VIDE
  if (cart.length !== 0) {
    cart.forEach((element) => {
      // SI LE PRODUIT EST DÉJA PRÉSENT DANS LE TABLEAU
      if (element[0]._id == product._id) {
        element[1]--; // ON RETIRE UNE QUANTITÉ AU PRODUIT
        cartCounter--;
        if (element[1] > 0) {
          alert(
            "Retrait du panier : Vous avez maintenant " +
              element[1] +
              " " +
              product.name +
              " dans votre panier"
          );
        }
        // SI LA QUANTITÉ D'UN PRODUIT EST = 0
        if (element[1] == 0) {
          alert("Il n'y a plus de " + product.name + " dans votre panier");
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