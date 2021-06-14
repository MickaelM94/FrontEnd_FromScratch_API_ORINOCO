// == POUR LE COMPTEUR DU PANIER ==
let cart = [];
if (localStorage.getItem("productsInCart")) {
  cart = JSON.parse(localStorage.getItem("productsInCart"));
}
const getCartClass = document.querySelector(".cart");
let cartCounter = 0;
cart.forEach((element) => {
  // PARCOURT LA LISTE DES PRODUITS DANS LE PANIER
  cartCounter += element[1]; // AJOUTE LA QUANTITÉ DU PRODUIT A LA VARIABLE
});
getCartClass.innerHTML = cartCounter; // AFFICHE LA QUANTITÉ DES PRODUITS DANS LE PANIER
getCartClass.classList.add("cart--active");

// == POUR LA PAGE PANIER ==
// CIBLER L'ELEMENT QUI AFFICHERA LES PRODUITS
let getCartClassList = document.querySelector(".cart__list");

// SEPARATEUR DE MILLIER
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// RECUPERER ET AFFICHER LES PRODUITS DU LOCAL STORAGE
cart = JSON.parse(localStorage.getItem("productsInCart"));
cart.forEach((element) => {
  getCartClassList.innerHTML += `
    <div id="${element[0]._id}" class="cart__product">
        <p class="cart__productName">${element[0].name}</p>
        <p class="cart__productPrice">${numberWithSpaces(element[0].price)}</p>
        <p class="cart__productQuantity"><button class="add">
        <i class="fas fa-plus"></i>
    </button></i><span class="quantity">
    ${element[1]}
    </span><button class="remove">
        <i class="fas fa-minus"></i>
    </button></p>
        <p>Total : <span class="total">
        ${numberWithSpaces(element[0].price * element[1])}
        </span></p>
        <p class="delete"><i class="far fa-trash-alt"></i></p>
    </div>
    `;
});
// CIBLER TOUS LES BOUTONS " + "
const getAddsClass = document.querySelectorAll(".add");

// AJOUTER UNE QUANTITÉ
getAddsClass.forEach((element) => {
  element.addEventListener("click", function (event) {
    console.log("L'id est " + event.target.id);
    // SI L'ID DU PRODUIT CLIQUÉ EST LE MÊME QUE L'ID D'UN PRODUIT DANS LE PANIER
    // if (event.target.id == element[0]._id) {
    //   element[1]++;
    // };
  });
  // localStorage.setItem("productsInCart", JSON.stringify(cart));
});

// CIBLER TOUS LES BOUTONS " - "
const getRemovesClass = document.querySelectorAll(".remove");

// CIBLER TOUS LES BOUTONS SUPPRIMER
const getDeletesClass = document.querySelectorAll(".delete");

// CALCULER LE TOTAL DE LA COMMANDE
let orderTotal = 0;
cart.forEach((element) => {
  orderTotal += element[0].price * element[1]; // MULTIPLIER LE PRIX PAR LA QUANTITÉ
});

// AFFICHER LE MONTANT TOTAL
let getorderTotalClass = document.querySelector(".orderTotal");
getorderTotalClass.innerHTML = numberWithSpaces(orderTotal);
