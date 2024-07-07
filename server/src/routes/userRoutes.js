// userRouter.js
import { Router } from 'express';
import { loginUser, createNewUser, getUser  } from '../controllers/userController.js';
import { validparameters, validateParametersUser } from '../middlewares/validateMiddleware.js';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';
import { reportTransasction } from '../middlewares/reportMiddleware.js';

const router = Router();

router.use(reportTransasction);

// Rutas
router.post('/login',validparameters, loginUser);
router.post('/usuarios',validateParametersUser ,createNewUser);
router.get('/usuarios', validateToken, getUser);

export default router;