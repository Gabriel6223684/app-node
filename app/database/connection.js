import { Pool } from 'pg';

// dotenv with defaults - no import needed
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'senac';
process.env.DB_NAME = process.env.DB_NAME || 'development_db';
process.env.DB_USER = process.env.DB_USER || 'senac';
process.env.DB_HOST = process.env.DB_HOST || 'localhost';
process.env.DB_PORT = process.env.DB_PORT || '5432';

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME || 'development_db',
    user: process.env.DB_USER || 'senac',
    password: process.env.DB_PASSWORD || 'senac',
    max: Number(process.env.DB_POOL_MAX || 10),
    idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS || 10000),
    connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT_MS || 5000),
    application_name: process.env.DB_APP_NAME || 'deskivo-electron',
});

export default class Connection {
    static async connect() {
        return await pool.connect();
    }
}