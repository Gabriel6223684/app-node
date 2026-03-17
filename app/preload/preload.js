const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    openPage: (pageName) => ipcRenderer.invoke('window:open-page', pageName),
    goHome: () => ipcRenderer.invoke('window:open-page', 'index.html'),
    saveProduct: (data) => ipcRenderer.invoke('product:save', data),
    searchProducts: (data) => ipcRenderer.invoke('product:search', data),
    saveCustomer: (data) => ipcRenderer.invoke('customer:save', data),
    searchCustomers: (data) => ipcRenderer.invoke('customer:search', data),
    saveFornecedor: (data) => ipcRenderer.invoke('fornecedor:save', data),
    searchFornecedores: (data) => ipcRenderer.invoke('fornecedor:search', data),
});
