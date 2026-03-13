const voltarButton = document.getElementById('voltar-button');
const cadastroButton = document.getElementById('cadastro-button');

voltarButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.goHome();
    } catch (error) {
        console.error('Erro ao abrir a janela principal:', error);
    }
});

cadastroButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('produto.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de cadastro de produtos:', error);
    }
});

function addProductToTable(product) {

    const table = document.getElementById("product-table");

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
    `;

    table.appendChild(row);
}

async function loadProducts() {

    const products = await window.electronAPI.getProducts();

    const table = document.getElementById("product-table");

    table.innerHTML = "";

    products.forEach(product => {

        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        `;

        table.appendChild(row);

    });

}

loadProducts();