const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openPage: (pageName) => ipcRenderer.invoke('window:open-page', pageName),
    goHome: () => ipcRenderer.invoke('window:open-page', 'index.html'),
    saveProduct: (data) => ipcRenderer.invoke('product:save', data),
    saveCliente: (data) => ipcRenderer.invoke('cliente:save', data),
    saveUsuario: (data) => ipcRenderer.invoke('usuario:save', data),
    saveFornecedor: (data) => ipcRenderer.invoke('fornecedor:save', data),
});