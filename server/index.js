//index.js
import express from 'express';
import cors from 'cors';
import { logger } from 'logger-express';
import router from './src/routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(logger());

app.use('/', router);

app.listen(PORT, console.log(`Server on: http://localhost:${PORT}`));

