const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    abrirJanela: (pagina) => ipcRenderer.send('abrir-janela', pagina)
})