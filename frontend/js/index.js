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

// == POUR LA PAGE INDEX.HTML ==
const productList = document.querySelector(".products__list");
let cameras;
// REQUÊTE API
const fetchCameras = async () => {
  cameras = await fetch("http://localhost:3000/api/cameras").then((res) =>
    res.json()
  );
  console.log ("Les données de l'API sont chargées")
};

// SEPARATEUR DE MILLIER
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// AFFICHER LES DONNEES EN LISTE
const showCameras = async () => {
  await fetchCameras();
  productList.innerHTML = cameras
    .map(
      (camera) =>
        `
         <!-- PRODUCT -->
          <div class="product">
            <div class="product__header">
               <img  src="${
                 camera.imageUrl
               }" alt="Appareil photo de collection, modèle ${camera.name}" />
            </div>
            <div class="product__body">
               <p class="product__title">${camera.name}</p>
               <p class="product__description">
                  ${camera.description}
               </p>
               <p class="product__price">${numberWithSpaces(camera.price)}</p>
               <a class="product__link btn btn-outline-secondary" href="../frontend/product.html?${
                 camera._id
               }">
                  Voir l'article
               </a>
            </div>
          </div>
         `
    )
    .join("");
};
showCameras();
