// SEPARATEUR DE MILLIER
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// RECUPERER LES DONNEES DE LA DERNIERE COMMANDE
let lastOrder = [];
let orderId;

function getLastOrder() {
  if (localStorage.getItem("lastOrder")) {
    lastOrder = JSON.parse(localStorage.getItem("lastOrder"));
    console.log(
      "Les produits du localstorage ont été ajoutés dans la variable 'lastOrder'"
    );
  }
  if (localStorage.getItem("orderId")) {
    orderId = localStorage.getItem("orderId");
  }
}

getLastOrder();

function showLastOrder() {
  // RECUPERER LES CLASSES DANS LE HTML
  let getNameClass = document.querySelector(".confirm__name");
  let getIdClass = document.querySelector(".confirm__id");
  let getPriceClass = document.querySelector(".confirm__price");

  // AFFICHER LES DONNEES DE LA DERNIERE COMMANDE
  getNameClass.innerHTML = lastOrder[0].firstName;
  getIdClass.innerHTML = orderId;
  getPriceClass.innerHTML = numberWithSpaces(lastOrder[0].price / 100);
}

showLastOrder();

// SUPPRIMER LES PRODUITS DU PANIER
localStorage.removeItem("productsInCart");
