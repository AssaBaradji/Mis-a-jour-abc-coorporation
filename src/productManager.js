const pool = require("./db");

async function get() {
  const connection = await pool.getConnection();
  try {
    const [rows, _fields] = await connection.execute("SELECT * FROM products");
    return rows;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  } finally {
    connection.release();
  }
}

async function add(name, price, description, stock, category, barcode, status) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "INSERT INTO products (name, price, description, stock, category, barcode, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, price, description, stock, category, barcode, status]
    );
    return result.insertId;
  } catch (error) {
    throw new Error("Error adding product: " + error.message);
  } finally {
    connection.release();
  }
}

async function update(
  id,
  name,
  price,
  description,
  stock,
  category,
  barcode,
  status
) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "UPDATE products SET name = ?, price = ?, description = ?, stock = ?, category = ?, barcode = ?, status = ? WHERE id = ?",
      [name, price, description, stock, category, barcode, status, id]
    );
    return result.affectedRows;
  } catch (error) {
    throw new Error("Error updating product: " + error.message);
  } finally {
    connection.release();
  }
}
async function getById(productId) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT * FROM products WHERE id = ?",
      [productId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du produit par ID :",
      error.message
    );
    throw error;
  } finally {
    connection.release();
  }
}

async function destroy(productId) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "DELETE FROM products WHERE id = ?",
      [productId]
    );

    if (result.affectedRows === 0) {
      console.log("Le produit n'a pas été trouvé.");
      return;
    }

    console.log("Produit supprimé avec succès.");
  } catch (error) {
    if (error.code === "ER_ROW_IS_REFERENCED_2") {
      console.log(
        "Impossible de supprimer le Produit car il est lié à des commandes existantes."
      );
    } else {
      console.error(
        "Erreur lors de la suppression du Produit :",
        error.message
      );
    }
  } finally {
    connection.release();
  }
}

module.exports = { get, add, update, destroy, getById };
