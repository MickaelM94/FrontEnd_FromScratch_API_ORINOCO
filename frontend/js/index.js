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

// == POUR LA PAGE INDEX.HTML ==

// REQUÊTE API POUR RECUPERER TOUS LES PRODUITS
const productList = document.querySelector(".products__list");
let cameras;

const fetchCameras = async () => {
  cameras = await fetch("http://localhost:3000/api/cameras").then((res) =>
    res.json()
  );
  console.log("Les données de l'API sont chargées");
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
               <p class="product__price">${numberWithSpaces(camera.price / 100)}</p>
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