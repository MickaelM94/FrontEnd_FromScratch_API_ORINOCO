// == POUR LE COMPTEUR DU PANIER ==
let cart = [];
let cartCounter = 0;
const getCartClass = document.querySelector(".cart");

// RECUPERER LE NOMBRE DE PRODUITS DANS LE PANIER
function getCartCounter() {
  if (localStorage.getItem("productsInCart")) {
    cart = JSON.parse(localStorage.getItem("productsInCart"));
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

// == POUR LA PAGE PANIER ==

let getEmptyClass = document.querySelector(".empty");
let getCartClassList = document.querySelector(".cart__list");
let getCartOrderClass = document.querySelector(".cart__order");

// SEPARATEUR DE MILLIER
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// SEPARATEUR DE MILLIER AVEC TIRET
function numberWithHyphen(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "-");
}

// CONDITION D'AFFICHAGE SI LE PANIER EST VIDE
if (cartCounter == 0) {
  getEmptyClass.style.display = "block";
  getCartOrderClass.style.display = "none";
} else {
  // AFFICHER LE CONTENU DU PANIER
  function showCart() {
    getEmptyClass.style.display = "none";
    // RECUPERER ET AFFICHER LES PRODUITS DU LOCAL STORAGE
    cart = JSON.parse(localStorage.getItem("productsInCart"));
    cart.forEach((element) => {
      getCartClassList.innerHTML += `
      <a href="../frontend/product.html?${element[0]._id}">
      <div id="${element[0]._id}" class="cart__product">
          <p class="cart__productName">${element[0].name}</p>
          <p class="cart__productPrice">${numberWithSpaces(
            element[0].price
          )}</p>
          <p>x<span class="quantity">${element[1]}</span></p>
          <p>Total : <span class="total">
          ${numberWithSpaces(element[0].price * element[1])}
          </span></p>
      </div>
      </a>
      `;
    });
  }

  showCart();

  // CALCULER LE TOTAL DE LA COMMANDE
  let orderTotal = 0;

  function calculateTotal() {
    orderTotal = 0;
    cart.forEach((element) => {
      // MULTIPLIER LE PRIX PAR LA QUANTITÉ
      orderTotal += element[0].price * element[1];
    });
    // AFFICHER LE MONTANT TOTAL
    let getorderTotalClass = document.querySelector(".orderTotal");
    getorderTotalClass.innerHTML = numberWithSpaces(orderTotal);
  }

  calculateTotal();

  // RECUPERER L'ID DES PRODUITS DU PANIER
  let products = [];

  function getIdsOfCart() {
    cart.forEach((element) => {
      products.push(element[0]._id);
    });
  }

  getIdsOfCart();

  // ENVOYER LA COMMANDE
  function sendOrder() {
    // RÉCUPÉRER LES DONNÉES DU FORMULAIRE
    let firstName;
    let lastName;
    let email;
    let address;
    let city;
    let contact = {};

    function createContact() {
      firstName = document.querySelector("#firstName").value;
      lastName = document.querySelector("#lastName").value;
      email = document.querySelector("#email").value;
      address = document.querySelector("#address").value;
      city = document.querySelector("#city").value;

      contact = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        city: city,
      };
    }

    createContact();

    // CREER L'ID DE LA COMMANDE
    let order_id;

    function createIdOrder() {
      order_id = JSON.stringify(numberWithHyphen(Date.now()));
    }

    createIdOrder();

    // CREER LE BODY DE LA REQUETE A ENVOYER A L'API
    let orderToSend = {};

    function createBodyRequest() {
      orderToSend = { contact, products, order_id };
      console.log(orderToSend);
    }

    createBodyRequest();

    // CREER LES PARAMETRES DE LA REQUETE
    let urlOrder;
    let postRequest;

    function createParamsRequest() {
      urlOrder = "http://localhost:3000/api/cameras/order";
      postRequest = {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderToSend),
      };
    }

    createParamsRequest();

    // ENVOYER LES DONNEES A L'API
    fetch(urlOrder, postRequest).then((res) => {
      if (res.ok) {
        alert(
          "La commande a été envoyée et vous allez être redirigé vers la page de confirmation."
        );
        document.location.href = "../frontend/confirm.html";
        res.json();
      } else {
        alert("Erreur de type " + res.status);
      }
    });

    // CONSERVER LES DONNEES DE LA COMMANDE
    let lastOrder = [];
    let orderSummary = {};

    function saveOrder() {
      // ENREGISTRER LA COMMANDE
      orderSummary = {
        firstName: firstName,
        price: orderTotal,
        id: order_id,
      };

      // TRANSFERER DANS LE LOCALSTORAGE
      lastOrder.push(orderSummary);
      console.log(lastOrder);
      localStorage.setItem("lastOrder", JSON.stringify(lastOrder));
    };

    saveOrder();
  };

  // FIN DE LA CONDITION "SI LE PANIER N'EST PAS VIDE"
};
