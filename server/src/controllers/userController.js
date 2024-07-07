//userController.js
import { findUserByEmail, createUserModel } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { searchError } from '../utils/utils.js';

const getUser = async (req, res) => {
  try {
    const email = req.user.email; // Obtiene el email del token decodificado
    const user = await findUserByEmail(email); // Busca el usuario por email

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
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
          return await sendErrorResponse(res, 'auth_1');
      }

      const isPasswordValid = bcrypt.compareSync(password, findUser.password);
      if (!isPasswordValid) {
          return await sendErrorResponse(res, 'auth_2');
      }
      
      const { id, email: userEmail, rol, lenguage } = findUser;
      const token = await createToken(userEmail);
      res.status(200).json({
          message: `Bienvenido, ${userEmail} has iniciado sesión`,
          code: 200,
          token,
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const createToken = async (email) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1m' });
  return token;
};


const sendErrorResponse = async (res, errorCode) => {
    const errorFound = searchError(errorCode);
    if (!errorFound || !errorFound[0] || !errorFound[0].status) {
      return res.status(500).json({ error: 'Unknown error' });
    }
    return res.status(errorFound.status).json({ error: errorFound.message });
};

const createNewUser = async (req, res) => {
    try {
      // Verifica que req.body contiene los datos necesarios
      const { email, password, rol, lenguage } = req.body;
      if (!email || !password || !rol || !lenguage) {
        throw new Error("Missing required fields");
      }
      const newUser = await createUserModel(email, password, rol, lenguage);
      res.status(201).json({ user: newUser });
    } catch (error) {
      res.status(400).json({ message: error.message }); 
    }
  };

export { loginUser, createNewUser, getUser };

