// == POUR LE COMPTEUR DU PANIER ==

// RECUPERER LE NOMBRE DE PRODUITS DANS LE PANIER
let cart = [];
let cartCounter = 0;
const getCartClass = document.querySelector(".cart");

function getCartCounter() {
  if (localStorage.getItem("productsInCart")) {
    cart = JSON.parse(localStorage.getItem("productsInCart"));
    console.log(
      "Les produits du localstorage ont été ajoutés dans la variable 'cart'"
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

// == POUR LA PAGE PANIER ==

// SEPARATEUR DE MILLIER
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// SEPARATEUR DE MILLIER AVEC TIRET
function numberWithHyphen(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "-");
}

// RECUPERER LES CLASSES CSS
let getEmptyClass = document.querySelector(".empty");
let getCartClassList = document.querySelector(".cart__list");
let getCartOrderClass = document.querySelector(".cart__order");

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
            element[0].price / 100
          )}</p>
          <p>x<span class="quantity">${element[1]}</span></p>
          <p>Total : <span class="total">
          ${numberWithSpaces((element[0].price / 100) * element[1])}
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
    cart.forEach((element) => {
      // MULTIPLIER LE PRIX PAR LA QUANTITÉ
      orderTotal += element[0].price * element[1];
    });
    // AFFICHER LE MONTANT TOTAL
    let getorderTotalClass = document.querySelector(".orderTotal");
    getorderTotalClass.innerHTML = numberWithSpaces(orderTotal / 100);
  }

  calculateTotal();

  // RECUPERER L'ID DES PRODUITS DU PANIER
  let products = [];

  function getIdsOfProducts() {
    cart.forEach((element) => {
      products.push(element[0]._id);
      console.log(
        "L'ID du produit " +
          element[0].name +
          " a été ajouté à la variable 'products'"
      );
    });
  }

  getIdsOfProducts();

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

      console.log("L'objet 'contact' a bien été créé à partir du formulaire");
    }

    createContact();

    // CREER LE BODY DE LA REQUETE A ENVOYER A L'API
    let orderToSend = {};

    function createBodyRequest() {
      orderToSend = { contact, products };
      console.log("La fonction createBodyRequest a été éxécutée avec succès");
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
      console.log("La fonction createParamsRequest a été éxécutée avec succès");
    }

    createParamsRequest();

    // ENVOYER LES DONNEES A L'API
    fetch(urlOrder, postRequest).then((res) => {
      if (res.ok) {
        alert(
          "La commande a été envoyée et vous allez être redirigé vers la page de confirmation."
        );
        // RECUPERER L'ID DE LA COMMANDE
        res.json().then((response) => {
          localStorage.setItem("orderId", response.orderId);
        });
        document.location.href = "../frontend/confirm.html";
      } else {
        alert("Erreur de type " + res.status);
      }
    });

    // CONSERVER LES DONNEES DE LA COMMANDE
    let lastOrder = [];
    let orderSummary = {};

    function saveOrder() {
      orderSummary = {
        firstName: firstName,
        price: orderTotal,
      };
      // TRANSFERER DANS LE LOCALSTORAGE
      lastOrder.push(orderSummary);
      console.log("La fonction saveOrder a été éxécutée avec succès");
      localStorage.setItem("lastOrder", JSON.stringify(lastOrder));
    }

    saveOrder();
  }

  // FIN DE LA CONDITION "SI LE PANIER N'EST PAS VIDE"
}
