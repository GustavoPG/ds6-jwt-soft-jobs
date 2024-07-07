//userController.js
import { findUserByEmail, createUserModel } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//import { searchError } from '../utils/utils.js';

const getUser = async (req, res) => {
  try {
    const email = req.user.email; 
    const user = await findUserByEmail(email); 

    if (!user) {
      return res.status(404).json({ error: 'Email no Existe' });
    }
    res.status(200).json([user]);
  } catch (error) {
    console.error(`Error fetching user: ${error.message}`);
    res.status(500).json({ error: 'Error fetching user' });
  }
};

const loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;
      const findUser = await findUserByEmail(email);
      if (!findUser) {
        return res.status(404).json({ error: 'auth_1', message: 'Email no Registrado' });
      }

      const isPasswordValid = bcrypt.compareSync(password, findUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'auth_2', message: 'Contraseña incorrecta' });
      }
      
      const token = await createToken(findUser.email);
      res.status(200).json({
          message: `Bienvenido, ${findUser.email} has iniciado sesión`,
          code: 200,
          token,
      });
  } catch (error) {
    res.status(500).json({ error: 'server_error', message: error.message });
  }
};

const createToken = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1m' });
  return token;
};

// const sendErrorResponse = async (res, errorCode) => {
//     const errorFound = searchError(errorCode);
//     if (!errorFound || !errorFound[0] || !errorFound[0].status) {
//       return res.status(500).json({ error: 'Unknown error' });
//     }
//     return res.status(errorFound.status).json({ error: errorFound.message });
// };

const createNewUser = async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;
    if (!email || !password || !rol || !lenguage) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    const existUser = await findUserByEmail(email);
    if (existUser) {
      return res.status(409).json({ message: '¡Email ya existe!' });
    }

    const hashedPassword = bcrypt.hashSync(password);
    const newUser = await createUserModel(email, hashedPassword, rol, lenguage);
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
};

export { loginUser, createNewUser, getUser };