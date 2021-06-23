// SEPARATEUR DE MILLIER
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// RECUPERER LES DONNEES DE LA DERNIERE COMMANDE
let lastOrder = [];

function getLastOrder() {
  if (localStorage.getItem("lastOrder")) {
    lastOrder = JSON.parse(localStorage.getItem("lastOrder"));
    console.log(
      "Les produits du localstorage ont été ajoutés dans la variable 'lastOrder'"
    );
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
  getIdClass.innerHTML = lastOrder[0].id;
  getPriceClass.innerHTML = numberWithSpaces(lastOrder[0].price);
}

showLastOrder();

// SUPPRIMER LES PRODUITS DU PANIER
localStorage.removeItem("productsInCart");
