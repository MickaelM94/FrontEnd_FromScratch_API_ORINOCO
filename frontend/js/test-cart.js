// CIBLER L'ELEMENT QUI AFFICHERA LES PRODUITS
let cart = document.querySelector('.cart__list');

// SEPARATEUR DE MILLIER
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

// RECUPERER ET AFFICHER LES PRODUITS DU LOCAL STORAGE
cartContent = JSON.parse(localStorage.getItem('productInCart'));
cartContent.forEach(element => {
    cart.innerHTML += `
    <div class="cart__product">
        <img src="/frontend/images/item.png" alt="">
        <p class="cart__productName">${element.name}</p>
        <p class="cart__productPrice">${numberWithSpaces(element.price)}</p>
        <p class="cart__productQuantity"><i class="fas fa-minus"></i><span class="quantity">${element.quantity}</span><i class="fas fa-plus"></i></p>
        <p>Total : <span class="total">${numberWithSpaces(element.totalPrice)}</span></p>
        <p class="delete"><i class="far fa-trash-alt"></i></p>
    </div>
    `
});
