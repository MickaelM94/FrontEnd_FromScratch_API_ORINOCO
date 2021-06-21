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

// CIBLER LE PARAGRAPHE SI LE PANIER EST VIDE
let getEmptyClass = document.querySelector(".empty");

// CIBLER L'ELEMENT QUI AFFICHERA LES PRODUITS
let getCartClassList = document.querySelector(".cart__list");

// CIBLER L'ELEMENT QUI AFFICHERA LE FORMULAIRE
let getCartOrderClass = document.querySelector(".cart__order");

// SEPARATEUR DE MILLIER
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// CONDITION D'AFFICHAGE SI LE PANIER EST VIDE
if (cartCounter == 0) {
  getEmptyClass.style.display = "block";
  getCartOrderClass.style.display = "none";
} else {
  getEmptyClass.style.display = "none";
  // RECUPERER ET AFFICHER LES PRODUITS DU LOCAL STORAGE
  cart = JSON.parse(localStorage.getItem("productsInCart"));
  cart.forEach((element) => {
    getCartClassList.innerHTML += `
    <a href="../frontend/product.html?${element[0]._id}">
    <div id="${element[0]._id}" class="cart__product">
        <p class="cart__productName">${element[0].name}</p>
        <p class="cart__productPrice">${numberWithSpaces(element[0].price)}</p>
        <p>x<span class="quantity">${element[1]}</span></p>
        <p>Total : <span class="total">
        ${numberWithSpaces(element[0].price * element[1])}
        </span></p>
    </div>
    </a>
    `;
  });

  // CALCULER LE TOTAL DE LA COMMANDE
  let orderTotal = 0;
  cart.forEach((element) => {
    // MULTIPLIER LE PRIX PAR LA QUANTITÉ
    orderTotal += element[0].price * element[1]; 
  });

  // AFFICHER LE MONTANT TOTAL
  let getorderTotalClass = document.querySelector(".orderTotal");
  getorderTotalClass.innerHTML = numberWithSpaces(orderTotal);

  // RECUPERER L'ID DES PRODUITS DU PANIER
  let products = [];
  cart.forEach((element) => {
    products.push(element[0]._id);
  });

  // ENVOYER LA COMMANDE
  function sendOrder() {
    // RÉCUPÉRER LES DONNÉES DU FORMULAIRE
    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let email = document.querySelector("#email").value;
    let address = document.querySelector("#address").value;
    let city = document.querySelector("#city").value;

    let contact = {
      "firstName" : firstName,
      "lastName" : lastName,
      "email" : email,
      "address" : address,
      "city" : city,
    };

    let order_id = JSON.stringify(numberWithSpaces((Date.now())));

    console.log(contact);
    console.log(products);
    console.log(order_id);


    let orderToSend = { contact, products, order_id };
    confirm("Confirmez-vous l'envoi du formulaire ?");

    // DEFINIR LES PARAMETRES DE LA REQUETE
    const urlOrder = "http://localhost:3000/api/cameras/order";
    const postRequest = {
      method: "POST",
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderToSend)
    };

    fetch(urlOrder, postRequest)
    .then( (res) => {
      if (res.ok) {
        alert('Le formulaire a été envoyé');
        res.json()
      } else {
        alert("Erreur de type " + res.status);
      };
  });

  // FIN DE LA CONDITION "SI LE PANIER N'EST PAS VIDE"
}}
