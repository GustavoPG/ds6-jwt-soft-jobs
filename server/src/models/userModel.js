
// usermodel.js
import pool from "../../database/config.js";
import bcrypt from "bcryptjs";

const createUserModel = async ( email, password, rol, lenguage ) => {
    const hashedPassword = bcrypt.hashSync(password);
    const SQLquery = {
        text: 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [email, hashedPassword, rol, lenguage],
    };
    const response = await pool.query(SQLquery);
    return response.rows[0];
};

const findUserByEmail = async (email) => { 
  const SQLquery = {
      text: "SELECT * FROM usuarios WHERE email = $1",
      values: [email],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
}

const findUserById = async (id) => {
  const SQLquery = {
      text: "SELECT * FROM usuarios WHERE id = $1",
      values: [id],
  };
  const response = await pool.query(SQLquery);
  return response.rows[0];
};


export { createUserModel, findUserByEmail, findUserById };


