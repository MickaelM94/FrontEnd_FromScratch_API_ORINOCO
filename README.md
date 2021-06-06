# Projet n°5 Orinoco

## Démarrage du projet

You will need to have Node and npm installed locally on your machine.

Clone this repo. From within the project folder, run npm install. You can then run the server with node server. The server should run on localhost with default port 3000. 

## Fichiers de travail

Normalement tu n'auras pas à toucher aux fichiers HTML et CSS, les points bloquants sont sur les fichiers JS.

Les fichiers JS avec le préfixe "test" regroupent mes petits bouts de code expérimentaux donc tu peux ne pas y preter attention :)

## Problématiques

### product.js

Dans le fichier "product.js", tu verras que j'ai tenté de créer une fonction d'ajout au panier.

Elle n'est pas fonctionnelle.

Pour simuler le comportement attendu j'ai saisi des données en dur pour voir qu'elle sera le résulta sur la page panier.

#### Questions :

Comment faire pour récupérer les données de l'API pour l'ajouter à l'objet "product" qui hérite de la classe Products ?

### cart.js

La fonction du fichier cart.js récupère les données dans le local storage pour l'afficher sur la page.

#### Questions : Comment récupérer la valeur de la méthode "totalPrice" pour afficher le prix total du produit en fonction de la quantité ?



