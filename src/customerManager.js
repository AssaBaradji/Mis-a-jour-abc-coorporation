const pool = require("./db");

async function get() {
  const connection = await pool.getConnection();
  try {
    const [rows, _fields] = await connection.execute("SELECT * FROM customers");
    return rows;
  } catch (error) {
    throw new Error("Error fetching customers: " + error.message);
  } finally {
    connection.release();
  }
}

async function add(name, address, email, phone) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "INSERT INTO customers (name, address, email, phone) VALUES (?, ?, ?, ?)",
      [name, address, email, phone]
    );
    return result.insertId;
  } catch (error) {
    throw new Error("Error adding customer: " + error.message);
  } finally {
    connection.release();
  }
}

async function update(id, name, address, email, phone) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "UPDATE customers SET name = ?, address = ?, email = ?, phone = ? WHERE id = ?",
      [name, address, email, phone, id]
    );
    return result.affectedRows;
  } catch (error) {
    throw new Error("Error updating customer: " + error.message);
  } finally {
    connection.release();
  }
}

async function destroy(customerId) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "DELETE FROM customers WHERE id = ?",
      [customerId]
    );

    if (result.affectedRows === 0) {
      console.log("Le client n'a pas été trouvé.");
      return;
    }

    console.log("Client supprimé avec succès.");
  } catch (error) {
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      console.log(
        "Impossible de supprimer le client car il est lié à des commandes existantes."
      );
    } else {
      console.error("Erreur lors de la suppression du client :", error.message);
    }
  } finally {
    connection.release();
  }
}

async function getById(customerId) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT * FROM customers WHERE id = ?",
      [customerId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du client par ID :",
      error.message
    );
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = { get, add, update, destroy, getById };
