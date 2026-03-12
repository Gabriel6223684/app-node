const { BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');
// Importamos apenas a função 'query' do seu novo arquivo de conexão
const db = require('./database/connection');

// ... (imports permanecem iguais)

function MainWindowFactory() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            // '../' sobe da pasta 'main' para a pasta 'app'
            // 'preload/preload.js' entra na pasta correta
            preload: path.join(__dirname, '../preload/preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true
        }
    });

    // Se o index.html está em app/pages/index.html:
    mainWindow.loadFile(path.join(__dirname, '../pages/index.html'));
    // ... (restante do código)

    // --- PONTE DE COMUNICAÇÃO (IPC) ---
    // Agora o Main não sabe a senha, ele apenas repassa o pedido para o db.query
    ipcMain.handle('get-database-data', async (event, sql, params) => {
        try {
            // Chama a função que você configurou no connection.js
            return await db.query(sql, params);
        } catch (err) {
            console.error("Erro na operação de banco:", err);
            return { error: err.message };
        }
    });

    mainWindow.loadFile(path.join(__dirname, "index.html"));

    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
        if (process.env.NODE_ENV === "development") {
            mainWindow.webContents.openDevTools();
        }
    });

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: "deny" };
    });

    return mainWindow;
}

module.exports = MainWindowFactory;