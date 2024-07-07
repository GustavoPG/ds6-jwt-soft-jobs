// config.js
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/// Cargar variables de entorno
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const pool = new pg.Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    allowExitOnIdle: true,
});

export default pool;