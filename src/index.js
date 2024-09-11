const readlineSync = require("readline-sync");
const customerManager = require("./customerManager");
const productManager = require("./productManager");
const paymentManager = require("./paymentManager");

async function customerMenu() {
  let choice = "";
  while (choice !== "0") {
    console.log("\n--- Gestion des clients ---");
    console.log("1. Ajouter un client");
    console.log("2. Lister les clients");
    console.log("3. Mettre à jour un client");
    console.log("4. Supprimer un client");
    console.log("0. Retour au menu principal");

    choice = readlineSync.question("Entrez votre choix : ");

    switch (choice) {
      case "1":
        const name = readlineSync.question("Nom : ");
        const address = readlineSync.question("Adresse : ");
        const email = readlineSync.question("Email : ");
        const phone = readlineSync.question("Téléphone : ");
        await customerManager.add(name, address, email, phone);
        console.log("Client ajouté avec succès.");
        break;

      case "2":
        const customers = await customerManager.get();
        console.log(customers);
        break;

      case "3":
        const id = readlineSync.question("ID du client à mettre à jour : ");
        const newName = readlineSync.question("Nouveau nom : ");
        const newAddress = readlineSync.question("Nouvelle adresse : ");
        const newEmail = readlineSync.question("Nouvel email : ");
        const newPhone = readlineSync.question("Nouveau téléphone : ");
        await customerManager.update(
          id,
          newName,
          newAddress,
          newEmail,
          newPhone
        );
        console.log("Client mis à jour avec succès.");
        break;

      case "4":
        const deleteId = readlineSync.question("ID du client à supprimer : ");
        const result = await customerManager.destroy(deleteId);
        if (result) {
          console.log("Client supprimé avec succès.");
        }
        break;

      case "0":
        console.log("Retour au menu principal.");
        break;

      default:
        console.log("Choix invalide.");
    }
  }
}

async function productMenu() {
  let choice = "";
  while (choice !== "0") {
    console.log("\n--- Gestion des produits ---");
    console.log("1. Ajouter un produit");
    console.log("2. Lister les produits");
    console.log("3. Mettre à jour un produit");
    console.log("4. Supprimer un produit");
    console.log("0. Retour au menu principal");

    choice = readlineSync.question("Entrez votre choix : ");

    switch (choice) {
      case "1":
        const name = readlineSync.question("Nom du produit : ");
        const price = readlineSync.question("Prix : ");
        const description = readlineSync.question("Description : ");
        const stock = readlineSync.question("Stock : ");
        const category = readlineSync.question("Catégorie : ");
        const barcode = readlineSync.question("Code-barres : ");
        const status = readlineSync.question(
          "Statut (disponible/indisponible) : "
        );
        await productManager.add(
          name,
          price,
          description,
          stock,
          category,
          barcode,
          status
        );
        console.log("Produit ajouté avec succès.");
        break;

      case "2":
        const products = await productManager.get();
        console.log(products);
        break;

      case "3":
        const id = readlineSync.question("ID du produit à mettre à jour : ");
        const newName = readlineSync.question("Nouveau nom : ");
        const newPrice = readlineSync.question("Nouveau prix : ");
        const newDescription = readlineSync.question("Nouvelle description : ");
        const newStock = readlineSync.question("Nouveau stock : ");
        const newCategory = readlineSync.question("Nouvelle catégorie : ");
        const newBarcode = readlineSync.question("Nouveau code-barres : ");
        const newStatus = readlineSync.question("Nouveau statut : ");
        await productManager.update(
          id,
          newName,
          newPrice,
          newDescription,
          newStock,
          newCategory,
          newBarcode,
          newStatus
        );
        console.log("Produit mis à jour avec succès.");
        break;

      case "4":
        const deleteId = readlineSync.question("ID du produit à supprimer : ");
        const result = await productManager.destroy(deleteId);
        if (result) {
          console.log("Produit supprimé avec succès.");
        }
        break;

      case "0":
        console.log("Retour au menu principal.");
        break;

      default:
        console.log("Choix invalide.");
    }
  }
}

async function paymentMenu() {
  let choice = "";
  while (choice !== "0") {
    console.log("\n--- Gestion des paiements ---");
    console.log("1. Ajouter un paiement");
    console.log("2. Lister les paiements");
    console.log("3. Mettre à jour un paiement");
    console.log("4. Supprimer un paiement");
    console.log("0. Retour au menu principal");

    choice = readlineSync.question("Entrez votre choix : ");

    switch (choice) {
      case "1":
        const orderId = readlineSync.question("ID de la commande : ");
        const date = readlineSync.question("Date du paiement : ");
        const amount = readlineSync.question("Montant : ");
        const paymentMethod = readlineSync.question("Méthode de paiement : ");
        await paymentManager.addPayment(orderId, date, amount, paymentMethod);
        console.log("Paiement ajouté avec succès.");
        break;

      case "2":
        const payments = await paymentManager.getPayments();
        console.log(payments);
        break;

      case "3":
        const id = readlineSync.question("ID du paiement à mettre à jour : ");
        const order_id = readlineSync.question("ID de la commande : ");
        const newdate = readlineSync.question("Nouveau date : ");
        const newamount = readlineSync.question("Nouveau prix : ");
        const newpaymentMethod = readlineSync.question("Nouvelle Methode : ");
        await paymentManager.updatePayment(
          id,
          order_id,
          newdate,
          newamount,
          newpaymentMethod
        );
        console.log("Paiement mis à jour avec succès.");
        break;

      case "4":
        const deleteId = readlineSync.question("ID du paiement à supprimer : ");
        await paymentManager.destroyPayment(deleteId);
        console.log("Paiement supprimé avec succès.");
        break;

      case "0":
        console.log("Retour au menu principal.");
        break;

      default:
        console.log("Choix invalide.");
    }
  }
}

async function mainMenu() {
  let choice = "";
  while (choice !== "0") {
    console.log("\n--- Menu Principal ---");
    console.log("1. Gestion des clients");
    console.log("2. Gestion des produits");
    console.log("3. Gestion des commandes");
    console.log("4. Gestion des paiements");
    console.log("0. Quitter");

    choice = readlineSync.question("Entrez votre choix : ");

    switch (choice) {
      case "1":
        await customerMenu();
        break;

      case "2":
        await productMenu();
        break;

      case "3":
        await orderMenu();
        break;

      case "4":
        await paymentMenu();
        break;

      case "0":
        console.log("Quitter.");
        process.exit();
      default:
        console.log("Choix invalide, veuillez réessayer.");
        break;
    }
  }
}

mainMenu();
