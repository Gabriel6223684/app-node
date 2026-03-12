const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') }); 

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = {
    query: (text, params) => pool.query(text, params).then(res => res.rows),
};

// Usamos uma função assíncrona para não travar a interface
async function query(text, params) {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Query executada:', { text, duration, rows: res.rowCount });
        return res.rows;
    } catch (error) {
        console.error('Erro na Query:', error);
        throw error;
    }
}

module.exports = { query };

const { BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');
const db = require('./database/connection'); // Importa sua conexão

function MainWindowFactory() {
    const mainWindow = new BrowserWindow({
        // ... suas configurações de width, height, etc ...
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
        }
    });

    // ESCUTADOR DE EVENTOS (IPC)
    // Aqui é onde a mágica acontece: o front pede, o back consulta o banco.
    ipcMain.handle('get-database-data', async (event, sql) => {
        try {
            return await db.query(sql);
        } catch (err) {
            return { error: err.message };
        }
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));

    // ... resto do seu código (ready-to-show, etc) ...

    return mainWindow;
}

module.exports = MainWindowFactory;
