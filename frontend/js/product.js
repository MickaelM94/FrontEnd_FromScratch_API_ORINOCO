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

// CREER LA CLASSE PRODUIT QUI SERT DE MODELE DE PRODUIT DANS LE PANIER
class Products {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  get totalPrice() {
    return this.price * this.quantity;
  }
}

// INITIALISER L'OBJET PRODUIT ET LE PANIER QUI CONTIENDRA LES DONNEES
let product1 = new Products("init", 40, 2); //!!\\ METTRE LES DONNEES EN DYNAMIQUE
let product2 = new Products("init", 10, 2); //!!\\ METTRE LES DONNEES EN DYNAMIQUE

let cart = [];

// AJOUTER LE PRODUIT AU PANIER
function addToCart() {
  if (cart == product) {
    product.quantity++;
  } else {
    cart = [product1, product2] ;
  }
}

// == POUR LE COMPTEUR DU PANIER ==
const getCartClass = document.querySelector(".cart");
let cartCounter = 0; //!!\\ RECUPERER LA SOMME DES "PRODUCT.QUANTITY" DANS LA VARIABLE CART


//!!\\ COMPORTEMENT DU TABLEAU CART ATTENDU :
// LE TABLEAU "CART" S'INCREMENTE AVEC LES PRODUITS
cart = [product1, product2] ;
localStorage.setItem('productsInCart', JSON.stringify(cart));

// MISE A JOUR DU PANIER
function updateCart() {
  localStorage.setItem('productsInCart', JSON.stringify(cart));
}

// AJOUTER UNE UNITEE AU COMPTEUR
function oneAddToCounter() {
  addToCart();
  updateCart();
  cartCounter++;
  getCartClass.innerHTML = cartCounter;
  // AFFICHER LE COMPTEUR APRES AJOUT
  getCartClass.classList.add("cart--active");
  console.log(cart);
  return cartCounter;
}

// RETIRER LE PRODUIT DU PANIER
// function addToCart() {
//   localStorage.setItem("productInCart", JSON.stringify(data));
// }

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
