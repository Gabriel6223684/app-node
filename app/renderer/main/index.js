const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../../preload/preload.js'),
            contextIsolation: true
        }
    })

    mainWindow.loadFile('index.html')
}

ipcMain.on('abrir-janela', (event, pagina) => {

    const novaJanela = new BrowserWindow({
        width: 600,
        height: 600,
        parent: mainWindow,
        modal: true,
        webPreferences: {
            preload: path.join(__dirname, '../../preload/preload.js'),
            contextIsolation: true
        }
    })

    novaJanela.loadFile(path.join(__dirname, `../pages/${pagina}.html`))
})

app.whenReady().then(createWindow)