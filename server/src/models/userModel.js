// userModel.js
import pool from "../../database/config.js";
//import bcrypt from "bcryptjs";

const createUserModel = async (email, hashedPassword, rol, lenguage) => {
  const SQLquery = {
    text: 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [email, hashedPassword, rol, lenguage],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
};

const findUserByEmail = async (email) => {
  const SQLquery = {
    text: "SELECT id, email, password, rol, lenguage FROM usuarios WHERE email = $1",
    values: [email],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
}

export { createUserModel, findUserByEmail };