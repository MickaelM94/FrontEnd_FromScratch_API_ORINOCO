/* Fonction permetant l'ajout d'article au panier (Local Storage) */
        const addToLocalStorage = () => {
            let quantity = document.getElementById("quantity");
            let itemDetails = {
                id: data._id,
                name: data.name,
                colorSelected: document.getElementById("select-color").value,
                quantity: quantity.value,
                priceForAll: price * quantity.value,
                pricePerUnit: price,
            };

let cartItem = JSON.parse(localStorage.getItem(itemDetails.id + itemDetails.colorSelected));
            /* Vérifie si le panier contient deja l'article dans la couleur demandée, si c'est le cas la quantité est augmentée sinon l'article est ajouté au panier */
            if (cartItem !== null) {
                itemDetails.quantity = parseInt(itemDetails.quantity) + parseInt(cartItem.quantity);
                itemDetails.priceForAll = price * itemDetails.quantity;
            }
            localStorage[itemDetails.id + itemDetails.colorSelected] = JSON.stringify(itemDetails);
            numberItemInCartNav();
        };
