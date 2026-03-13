const productButton = document.getElementById('product-button');
const userButton = document.getElementById('user-button');
const fornecedorButton = document.getElementById('fornecedor-button');

productButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listaproduto.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de produtos:', error);
    }
});

userButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listauser.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de usuários:', error);
    }
});

fornecedorButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listafornecedor.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de fornecedores:', error);
    }
});