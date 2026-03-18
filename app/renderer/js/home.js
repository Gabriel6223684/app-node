const btnProdutos = document.getElementById('btn-produtos');
const btnEmpresas = document.getElementById('btn-empresas');
const btnFornecedores = document.getElementById('btn-fornecedores');
const btnUsuarios = document.getElementById('btn-usuarios');
const btnCustomers = document.getElementById('btn-customers');

btnProdutos.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listaproduto.html');
    } catch (error) {
        console.error('Erro ao abrir lista de produtos:', error);
    }
});

btnFornecedores.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listafornecedor.html');
    } catch (error) {
        console.error('Erro ao abrir lista de fornecedores:', error);
    }
});

btnUsuarios.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listauser.html');
    } catch (error) {
        console.error('Erro ao abrir lista de usuários:', error);
    }
});

btnCustomers.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listacustomer.html');
    } catch (error) {
        console.error('Erro ao abrir lista de customers:', error);
    }
});
