const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
    };

    try {
        const result = await window.electronAPI.saveProduct(data);
        console.log('Produto salvo com sucesso:', result);
        alert('Produto salvo com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        alert('Erro ao salvar produto!');
    }
});

const button = document.getElementById("save-button");

button.addEventListener("click", () => {

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    const product = {
        id: Date.now(), // exemplo de ID
        name: name,
        price: price
    };

    addProductToTable(product);

});