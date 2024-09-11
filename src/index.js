const readlineSync = require("readline-sync");
const customerManager = require("./customerManager");
const productManager = require("./productManager");
const orderManager = require("./orderManager");
const paymentManager = require("./paymentManager");

function isValidDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().startsWith(dateString);
}

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

async function orderDetailMenu() {
  let choice = "";
  while (choice !== "0") {
    console.log("\n--- Gestion des détails de commande ---");
    console.log("1. Ajouter des produits à la commande");
    console.log("2. Sauvegarder et quitter");
    console.log("0. Retour au menu principal");

    choice = readlineSync.question("Entrez votre choix : ");

    switch (choice) {
      case "1":
        const productId = readlineSync.question("ID du produit : ");
        let quantity = readlineSync.question("Quantité : ");
        const price = readlineSync.question("Prix : ");

        if (!productId || isNaN(productId)) {
          console.log("Erreur : L'ID du produit est invalide.");
          break;
        }

        if (!quantity || isNaN(quantity) || quantity <= 0) {
          console.log(
            "Erreur : La quantité doit être un nombre valide supérieur à 0."
          );
          break;
        }

        if (!price || isNaN(price) || price <= 0) {
          console.log(
            "Erreur : Le prix doit être un nombre valide supérieur à 0."
          );
          break;
        }
        try {
          await orderManager.addProductToOrder(productId, quantity, price);
          console.log("Produit ajouté à la commande avec succès.");
        } catch (error) {
          console.error(
            "Erreur lors de l'ajout du détail de commande : " + error.message
          );
        }
        break;

      case "2":
        console.log("Commande ajoutée avec succès avec l'ID :", newOrderId);
        return;

      case "0":
        console.log("Retour au menu principal.");
        break;

      default:
        console.log("Choix invalide.");
    }
  }
}

async function orderMenu() {
  let choice = "";
  while (choice !== "0") {
    console.log("\n--- Gestion des commandes ---");
    console.log("1. Ajouter une commande avec ses détails");
    console.log("2. Lister les commandes avec les détails");
    console.log("3. Mettre à jour une commande avec ses détails");
    console.log("4. Supprimer une commande avec ses détails");
    console.log("0. Retour au menu principal");

    choice = readlineSync.question("Entrez votre choix : ");

    switch (choice) {
      case "1":
        const date = readlineSync.question("Date (YYYY-MM-DD) : ");
        const deliveryAddress = readlineSync.question(
          "Adresse de livraison : "
        );
        const trackNumber = readlineSync.question("Numéro de suivi : ");
        const status = readlineSync.question("Statut (en cours/complété) : ");
        const customerId = readlineSync.question("ID du client : ");

        if (!isValidDate(date)) {
          console.log(
            "Date invalide. Veuillez entrer une date au format YYYY-MM-DD."
          );
          break;
        }

        try {
          const customerExists = await customerManager.getById(customerId);
          if (!customerExists) {
            console.log(
              `Erreur : Le client avec l'ID ${customerId} n'existe pas.`
            );
            break;
          }

          const newOrderId = await orderManager.addOrder(
            date,
            deliveryAddress,
            trackNumber,
            status,
            customerId
          );

          await orderDetailMenu(newOrderId);
        } catch (error) {
          console.error(
            "Erreur lors de l'ajout de la commande :",
            error.message
          );
        }
        break;

      case "2":
        try {
          const orders = await orderManager.getOrders();
          for (const order of orders) {
            const { order: orderData, details } =
              await orderManager.getOrderDetails(order.id);

            const orderObject = {
              id: orderData.id,
              date: orderData.date,
              delivery_address: orderData.delivery_address,
              track_number: orderData.track_number,
              status: orderData.status,
              customer_id: orderData.customer_id,
              details: details.map((detail) => ({
                product_id: detail.product_id,
                quantity: detail.quantity,
                price: detail.price,
              })),
            };

            console.log("Commande:", JSON.stringify(orderObject, null, 2));
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des commandes :",
            error.message
          );
        }
        break;

      case "3":
        const updateId = readlineSync.question(
          "ID de la commande à mettre à jour : "
        );

        const newDate = readlineSync.question("Nouvelle date (YYYY-MM-DD) : ");
        const newDeliveryAddress = readlineSync.question(
          "Nouvelle adresse de livraison : "
        );
        const newTrackNumber = readlineSync.question(
          "Nouveau numéro de suivi : "
        );
        const newStatus = readlineSync.question("Nouveau statut : ");
        const newCustomerId = readlineSync.question("Nouvel ID du client : ");

        try {
          if (!isValidDate(newDate)) {
            console.log(
              "Date invalide. Veuillez entrer une date au format YYYY-MM-DD."
            );
            break;
          }

          const affectedRows = await orderManager.updateOrder(
            updateId,
            newDate,
            newDeliveryAddress,
            newTrackNumber,
            newStatus,
            newCustomerId
          );

          if (affectedRows > 0) {
            console.log("Commande mise à jour avec succès.");
          } else {
            console.log("Aucune commande trouvée avec cet ID.");
          }

          const currentDetails = await orderManager.getOrderDetails(updateId);

          for (const detail of currentDetails.details) {
            console.log(
              `Produit ID: ${detail.product_id}, Quantité actuelle: ${detail.quantity}, Prix actuel: ${detail.price}`
            );

            const updateDetail = readlineSync.question(
              "Voulez-vous mettre à jour ce détail (o/n) ? "
            );

            if (updateDetail.toLowerCase() === "o") {
              const newQuantity = readlineSync.question(
                `Nouvelle quantité pour le produit ${detail.product_id} : `
              );
              const newPrice = readlineSync.question(
                `Nouveau prix pour le produit ${detail.product_id} : `
              );

              await orderManager.updateOrderDetail(
                detail.id,
                newQuantity,
                newPrice
              );
              console.log(`Détail du produit ${detail.product_id} mis à jour.`);
            }
          }

          const addMoreDetails = readlineSync.question(
            "Voulez-vous ajouter un nouveau produit à cette commande (o/n) ? "
          );
          if (addMoreDetails.toLowerCase() === "o") {
            const newProductId = readlineSync.question(
              "ID du nouveau produit : "
            );
            const newProductQuantity = readlineSync.question(
              "Quantité du nouveau produit : "
            );
            const newProductPrice = readlineSync.question(
              "Prix du nouveau produit : "
            );

            await orderManager.addOrderDetail(
              updateId,
              newProductId,
              newProductQuantity,
              newProductPrice
            );
            console.log("Nouveau produit ajouté à la commande.");
          }
        } catch (error) {
          console.error(
            "Erreur lors de la mise à jour de la commande :",
            error.message
          );
        }
        break;

      case "4":
        const deleteId = readlineSync.question(
          "ID de la commande à supprimer : "
        );

        try {
          const affectedRows = await orderManager.destroyOrder(deleteId);
          if (affectedRows > 0) {
            console.log("Commande supprimée avec succès.");
          } else {
            console.log("Aucune commande trouvée avec cet ID.");
          }
        } catch (error) {
          console.error(
            "Erreur lors de la suppression de la commande :",
            error.message
          );
        }
        break;

      case "0":
        console.log("Retour au menu principal.");
        return;

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
