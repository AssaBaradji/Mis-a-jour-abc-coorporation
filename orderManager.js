const pool = require("./db");

function handleError(action, error) {
  console.error(`${action} Erreur : ${error.message}`);
  throw new Error(`${action} Erreur : ${error.message}`);
}

async function withConnection(callback) {
  const connection = await pool.getConnection();
  try {
    return await callback(connection);
  } catch (error) {
    handleError("Database operation", error);
  } finally {
    connection.release();
  }
}

function validateInputs(inputs) {
  for (let input of inputs) {
    if (!input || input === "" || input === null) {
      throw new Error(
        "Entrée invalide détectée. Veuillez vérifier toutes les entrées."
      );
    }
  }
}

async function getOrders() {
  return withConnection(async (connection) => {
    const [rows] = await connection.execute("SELECT * FROM purchase_orders");
    if (rows.length === 0) {
      console.warn("Aucune commande trouvée.");
    }
    return rows;
  });
}

async function getOrderDetails(orderId) {
  return withConnection(async (connection) => {
    validateInputs([orderId]);

    const [orderRows] = await connection.execute(
      "SELECT * FROM purchase_orders WHERE id = ?",
      [orderId]
    );
    if (orderRows.length === 0) {
      throw new Error("Commande non trouvée.");
    }

    const [detailsRows] = await connection.execute(
      "SELECT * FROM order_details WHERE order_id = ?",
      [orderId]
    );

    return { order: orderRows[0], details: detailsRows };
  });
}

async function addOrder(
  date,
  deliveryAddress,
  trackNumber,
  status,
  customerId
) {
  return withConnection(async (connection) => {
    validateInputs([date, deliveryAddress, trackNumber, status, customerId]);

    const [result] = await connection.execute(
      "INSERT INTO purchase_orders (date, delivery_address, track_number, status, customer_id) VALUES (?, ?, ?, ?, ?)",
      [date, deliveryAddress, trackNumber, status, customerId]
    );
    console.log(
      "Commande ajoutée avec succès. ID de la commande :",
      result.insertId
    );
    return result.insertId;
  });
}

async function updateOrder(
  id,
  date,
  deliveryAddress,
  trackNumber,
  status,
  customerId
) {
  return withConnection(async (connection) => {
    validateInputs([
      id,
      date,
      deliveryAddress,
      trackNumber,
      status,
      customerId,
    ]);

    const [result] = await connection.execute(
      "UPDATE purchase_orders SET date = ?, delivery_address = ?, track_number = ?, status = ?, customer_id = ? WHERE id = ?",
      [date, deliveryAddress, trackNumber, status, customerId, id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Commande non trouvée ou aucune modification apportée.");
    }
    console.log("Commande mise à jour avec succès.");
    return result.affectedRows;
  });
}

async function deleteOrder(id) {
  return withConnection(async (connection) => {
    validateInputs([id]);

    await connection.execute("DELETE FROM order_details WHERE order_id = ?", [
      id,
    ]);

    const [result] = await connection.execute(
      "DELETE FROM purchase_orders WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      throw new Error("Commande non trouvée.");
    }
    console.log("Commande et ses détails supprimés avec succès.");
    return result.affectedRows;
  });
}

async function addOrderDetail(quantity, price, productId, orderId) {
  return withConnection(async (connection) => {
    validateInputs([quantity, price, productId, orderId]);

    const [result] = await connection.execute(
      "INSERT INTO order_details (quantity, price, product_id, order_id) VALUES (?, ?, ?, ?)",
      [quantity, price, productId, orderId]
    );
    console.log(
      "Détail de commande ajouté avec succès. ID du détail :",
      result.insertId
    );
    return result.insertId;
  });
}

async function updateOrderDetail(detailId, quantity, price) {
  return withConnection(async (connection) => {
    validateInputs([detailId, quantity, price]);

    const [result] = await connection.execute(
      "UPDATE order_details SET quantity = ?, price = ? WHERE id = ?",
      [quantity, price, detailId]
    );
    if (result.affectedRows === 0) {
      throw new Error(
        "Détail de commande non trouvé ou aucune modification apportée."
      );
    }
    console.log("Détail de commande mis à jour avec succès.");
    return result.affectedRows;
  });
}

module.exports = {
  getOrders,
  addOrder,
  addOrderDetail,
  updateOrder,
  deleteOrder,
  getOrderDetails,
  updateOrderDetail,
};
