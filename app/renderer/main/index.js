const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            // Verifique se este caminho do preload está correto em relação a este arquivo
            preload: path.join(__dirname, '../../preload/preload.js'),
            contextIsolation: true
        }
    });

    // USAR PATH.JOIN COM __DIRNAME É O SEGREDO:
    // Se o index.html estiver na mesma pasta que este arquivo JS:
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    // Se o index.html estiver uma pasta acima:
    // mainWindow.loadFile(path.join(__dirname, '../index.html'));
}

// Dentro do seu arquivo principal (main.js ou similar)
ipcMain.on('abrir-janela', (event, pagina) => {
    const novaJanela = new BrowserWindow({
        width: 800,
        height: 600,
        parent: mainWindow, // Mantém como filha da principal
        modal: true,
        webPreferences: {
            preload: path.join(__dirname, '../../preload/preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    // Ajuste o caminho conforme sua estrutura (ex: pasta 'pages')
    const caminhoPagina = path.join(__dirname, `../pages/${pagina}.html`);
    novaJanela.loadFile(caminhoPagina);

    novaJanela.once('ready-to-show', () => novaJanela.show());
});

// IPC para fechar janela atual e carregar página principal
ipcMain.on('fechar-janela-e-ir-inicio', (event) => {
    const janelaAtual = BrowserWindow.fromWebContents(event.sender);
    if (janelaAtual) {
        // Carregar a página principal antes de fechar
        mainWindow.loadFile(path.join(__dirname, 'index.html')).then(() => {
            janelaAtual.close();
        });
    }
});

app.whenReady().then(createWindow)