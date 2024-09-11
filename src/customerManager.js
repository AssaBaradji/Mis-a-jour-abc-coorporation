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

async function destroy(id) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "DELETE FROM customers WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  } catch (error) {
    throw new Error("Error deleting customer: " + error.message);
  } finally {
    connection.release();
  }
}

module.exports = { get, add, update, destroy };
