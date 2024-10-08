const readlineSync = require("readline-sync");
const customerManager = require("./customerManager");
const productManager = require("./productManager");
const orderManager = require("./orderManager");
const paymentManager = require("./paymentManager");
const pool = require("./db");

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
    console.log("5. Voir un client par ID");
    console.log("0. Retour au menu principal");

    choice = readlineSync.question("Entrez votre choix : ");

    switch (choice) {
      case "1":
        let name = readlineSync.question("Nom : ");
        while (name === "") {
          console.log("Le nom du client est obligatoire...");
          name = readlineSync.question("Nom : ");
        }
        let address = readlineSync.question("Adresse : ");
        while (address === "") {
          console.log("l'address est obligatoire");
          address = readlineSync.question("address :");
        }
        const email = readlineSync.questionEMail("Email : ");
        let phone = readlineSync.question("Téléphone : ");
        while (phone === "") {
          console.log("Téléphone est obligatoire");
          phone = readlineSync.question("Télé :");
        }
        await customerManager.add(name, address, email, phone);
        break;

      case "2":
        const customers = await customerManager.get();
        console.log(customers);
        break;

      case "3":
        const id = readlineSync.questionInt("ID du client à mettre à jour : ");
        const customerExists = await customerManager.getById(id);

        if (!customerExists) {
          console.log(
            "Client non trouvé. Veuillez vérifier l'ID et réessayer."
          );
          break;
        }

        let newName = readlineSync.question("Nouveau nom : ");
        while (newName === "") {
          console.log("le nom est obligatoire");
          newName = readlineSync.question("nom : ");
        }
        let newAddress = readlineSync.question("Nouvelle adresse : ");
        while (newAddress === "") {
          console.log("l'adress est obligatoire");
          newAddress = readlineSync.question("address : ");
        }
        const newEmail = readlineSync.questionEMail("Nouvel email : ");
        let newPhone = readlineSync.question("Nouveau phone : ");
        while (newPhone === "") {
          console.log("Téléphone est obligatoire");
          newPhone = readlineSync.question("Téléphone : ");
        }
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
        const deleteId = readlineSync.questionInt(
          "ID du client à supprimer : "
        );
        await customerManager.destroy(deleteId);
        break;

      case "5":
        const viewId = readlineSync.questionInt("ID du client à voir : ");
        const customer = await customerManager.getById(viewId);
        if (customer) {
          console.log("Détails du client :");
          console.log(customer);
        } else {
          console.log("Client non trouvé.");
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
    console.log("5. Voir un produit par ID");
    console.log("0. Retour au menu principal");

    choice = readlineSync.question("Entrez votre choix : ");

    switch (choice) {
      case "1":
        let name = readlineSync.question("Nom du produit : ");
        while (name === "") {
          console.log("Le nom du produit est obligatoire...");
          name = readlineSync.question("Nom du produit : ");
        }
        const price = readlineSync.questionFloat("Prix : ");

        let description = readlineSync.question("Description : ");
        while (description === "") {
          console.log("La description est obligatoire...");
          description = readlineSync.question("Description : ");
        }
        const stock = readlineSync.questionInt("Stock : ");
        let category = readlineSync.question("Catégorie : ");
        while (category === "") {
          console.log("La catégorie du produit doit etre renseignée...");
          category = readlineSync.question("Catégorie : ");
        }
        let barcode = readlineSync.question("Code-barres : ");
        while (barcode === "") {
          console.log("Le code barre du produit est obligatoire...");
          barcode = readlineSync.question("Code-barres : ");
        }
        let status = readlineSync.question(
          "Statut (disponible/indisponible) : "
        );
        while (status === "") {
          console.log("Le statut est obligatoire...");
          status = readlineSync.question("Statut (disponible/indisponible) : ");
        }
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
        const id = readlineSync.questionInt("ID du produit à mettre à jour : ");
        let newName = readlineSync.question("Nouveau nom : ");
        while (newName === "") {
          console.log("le nom est obligatoire");
          newName = readlineSync.question("nom du produit : ");
        }
        const newPrice = readlineSync.questionFloat("Nouveau prix : ");
        let newDescription = readlineSync.question("Nouvelle description : ");
        while (newDescription === "") {
          console.log("veuilleza renseignez la description");
          newDescription = readlineSync.question("Description : ");
        }
        let newStock = readlineSync.question("Nouveau stock : ");
        while (newStock === "") {
          console.log("stock doit etre renseigner");
          newStock = readlineSync.question("Stock : ");
        }
        let newCategory = readlineSync.question("Nouvelle catégorie : ");
        while (newCategory == "") {
          console.log("category doit etre renseiger");
          newCategory = readlineSync.question("Catégorie: ");
        }
        let newBarcode = readlineSync.question("Nouveau code-barres : ");
        while (newBarcode === "") {
          console.log("renseigner barcode");
          newBarcode = readlineSync.question("Barcode: ");
        }
        let newStatus = readlineSync.question("Nouveau statut : ");
        while (newStatus === "") {
          console.log("le status est obligatoire");
          newStatus = readlineSync.question("Status : ");
        }
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
        break;

      case "4":
        const deleteId = readlineSync.question("ID du produit à supprimer : ");
        const result = await productManager.destroy(deleteId);
        if (result) {
          console.log("Produit supprimé avec succès.");
        }
        break;
      case "5":
        const viewId = readlineSync.question("ID du produit à voir : ");
        const product = await productManager.getById(viewId);
        if (product) {
          console.log("Détails du produit :");
          console.log(product);
        } else {
          console.log("Produit non trouvé.");
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

async function orderDetailMenu(newOrderId) {
  let choice = "";
  while (choice !== "2") {
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

        if (!productId || isNaN(productId) || productId <= 0) {
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
          await orderManager.addOrderDetail(
            quantity,
            price,
            productId,
            newOrderId
          );
          console.log("Produit ajouté à la commande avec succès.");
        } catch (error) {
          console.error(
            "Erreur lors de l'ajout du détail de commande : " + error.message
          );
        }
        break;

      case "2":
        console.log("Commande et ses détails enregistrés avec succès.");
        return;

      case "0":
        console.log("Retour au menu principal.");
        return;

      default:
        console.log("Choix invalide.");
    }
  }
}

async function orderMenu() {
  const connection = pool.getConnection();
  let choice = "";
  while (choice !== "0") {
    console.log("\n--- Gestion des commandes ---");
    console.log("1. Ajouter une commande avec ses détails");
    console.log("2. Lister les commandes avec les détails");
    console.log("3. Mettre à jour une commande avec ses détails");
    console.log("4. Supprimer une commande avec ses détails");
    console.log("5. Voir une commande par ID");
    console.log("0. Retour au menu principal");

    choice = readlineSync.question("Entrez votre choix : ");

    switch (choice) {
      case "1":
        let date = readlineSync.question("Date (YYYY-MM-DD) : ");
        while (date === "") {
          console.log("veuillez reseigner la date");
          date = readlineSync.question("Date : ");
        }
        let deliveryAddress = readlineSync.question("Adresse de livraison : ");
        while (deliveryAddress === "") {
          console.log("veuillez reseigner l'adresse de livraison");
          deliveryAddress = readlineSync.question("Adresse de livraison : ");
        }

        let trackNumber = readlineSync.question("Numéro de suivi : ");
        let [trackNumberExist] = await (
          await connection
        ).execute("SELECT * FROM purchase_orders Where track_number = ? ", [
          trackNumber,
        ]);
        while (trackNumber === "" || trackNumberExist.length > 0) {
          console.log("Le numéro de suivi doit etre unique est non null");
          trackNumber = readlineSync.question("Numéro de suivi : ");
          [trackNumberExist] = await (
            await connection
          ).execute("SELECT * FROM purchase_orders Where track_number = ? ", [
            trackNumber,
          ]);
        }
        let status = readlineSync.question("Statut (en cours/complété) : ");
        while (status === "") {
          console.log("veuillez reseigner le status");
          status = readlineSync.question("Status : ");
        }
        const customerId = readlineSync.questionInt("ID du client : ");

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
            "Erreur lors de l'ajout de la commande :"
            // error.message
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
        const updateId = readlineSync.questionInt(
          "ID de la commande à mettre à jour : "
        );

        let newDate = readlineSync.question("Nouvelle date (YYYY-MM-DD) : ");
        while (newDate === "") {
          console.log("veuillez saisir une nouvelle date");
          newDate = readlineSync.question("Nouvelle date : ");
        }
        let newDeliveryAddress = readlineSync.question(
          "Nouvelle adresse de livraison : "
        );
        while (newDeliveryAddress === "") {
          console.log("veuillez saisir une nouvelle adresse de livraison");
          newDeliveryAddress = readlineSync.question(
            "Nouvelle adresse de livraison : "
          );
        }
        let newTrackNumber = readlineSync.question(
          "Nouveau numéro de suivi : "
        );
        while (newTrackNumber === "") {
          console.log("veuillez saisir un nouveau numéro de suivi");
          newTrackNumber = readlineSync.question("Nouveau numéro de suivi: ");
        }
        let newStatus = readlineSync.question("Nouveau statut : ");
        while (newStatus === "") {
          console.log("veuillez saisir le nouveau status");
          newStatus = readlineSync.question("Nouveau status");
        }
        const newCustomerId = readlineSync.questionInt(
          "Nouvel ID du client : "
        );

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
              console.log("Commande mis à jour avec succée");
            }
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
      case "5":
        const viewId = readlineSync.questionInt("ID de la commande à voir : ");

        const order = await orderManager.getOrderById(viewId);

        if (order) {
          const details = await orderManager.getOrderDetailByOrderId(viewId);

          const orderDetails = {
            id: order.id,
            date: order.date,
            delivery_address: order.delivery_address,
            customer_id: order.customer_id,
            track_number: order.track_number,
            status: order.status,
            details: details.map((detail) => ({
              product_id: detail.product_id,
              quantity: detail.quantity,
              price: detail.price,
            })),
          };

          console.log("Détails de la commande :");
          console.log(orderDetails);
        } else {
          console.log("Commande non trouvée.");
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
    console.log("5. Voir un paiement par ID");
    console.log("0. Retour au menu principal");

    choice = readlineSync.question("Entrez votre choix : ");

    switch (choice) {
      case "1":
        const orderId = readlineSync.questionInt("ID de la commande : ");
        let date = readlineSync.question("Date du paiement : ");
        while (date === "") {
          console.log("la date doit etre renseignée");
          date = readlineSync.question("Date: ");
        }
        const amount = readlineSync.questionFloat("Montant : ");
        let paymentMethod = readlineSync.question("Méthode de paiement : ");
        while (paymentMethod === "") {
          console.log("la methode de paiement est etre specifiée");
          paymentMethod = readlineSync.question("Methode de paiement: ");
        }
        await paymentManager.addPayment(orderId, date, amount, paymentMethod);
        console.log("Paiement ajouté avec succès.");
        break;

      case "2":
        const payments = await paymentManager.getPayments();
        console.log(payments);
        break;

      case "3":
        const id = readlineSync.questionInt(
          "ID du paiement à mettre à jour : "
        );
        const order_id = readlineSync.questionInt("ID de la commande : ");

        let newdate = readlineSync.question("Nouvelle date : ");
        while (newdate === "") {
          console.log("vous devez renseigner la date");
          newdate = readlineSync.question("Nouvelle date: ");
        }
        const newamount = readlineSync.questionFloat("Nouveau montant : ");
        let newpaymentMethod = readlineSync.question("Nouvelle méthode : ");
        while (newpaymentMethod === "") {
          console.log("la methode de payement doit etre spécifiée");
          newpaymentMethod = readlineSync.question(
            "Nouvelle methode de paiement : "
          );
        }
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
        break;

      case "5":
        const viewId = readlineSync.question("ID du paiement à voir : ");
        const payment = await paymentManager.getPaymentById(viewId);
        if (payment) {
          console.log("Détails du paiement :");
          console.log(payment);
        } else {
          console.log("Paiement non trouvé.");
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
