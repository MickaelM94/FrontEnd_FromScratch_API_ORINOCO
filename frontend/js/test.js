// SUPPRIMER UN ARTICLE
function removeFromCart(product) {
    cart = cart.filter((element) => element[0] !== product);
    cartCounter--;
  }