const pool = require("./db");

async function getPayments() {
  const connection = await pool.getConnection();
  try {
    const [rows, _fields] = await connection.execute("SELECT * FROM payments");
    return rows;
  } catch (error) {
    throw new Error("Error fetching payments: " + error.message);
  } finally {
    connection.release();
  }
}

async function addPayment(order_id, date, amount, payment_method) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "INSERT INTO payments (order_id, date, amount, payment_method) VALUES (?, ?, ?, ?)",
      [order_id, date, amount, payment_method]
    );
    return result.insertId;
  } catch (error) {
    throw new Error("Error adding payment: " + error.message);
  } finally {
    connection.release();
  }
}

async function updatePayment(
  id,
  order_id, 
  date,
  amount,
  payment_method
) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "UPDATE payments SET order_id = ?, date = ?, amount = ?, payment_method = ? WHERE id = ?",
      [order_id, date, amount, payment_method, id]
    );
    return result.affectedRows;
  } catch (error) {
    throw new Error("Error updating payment: " + error.message);
  } finally {
    connection.release();
  }
}

async function destroyPayment(id) {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.execute(
      "DELETE FROM payments WHERE id = ?",
      [id]
    );
    return result.affectedRows;
  } catch (error) {
    throw new Error("Error deleting payment: " + error.message);
  } finally {
    connection.release();
  }
}

module.exports = { getPayments, addPayment, destroyPayment, updatePayment };
