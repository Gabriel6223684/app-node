const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        nome: document.getElementById('nome').value,
        price: document.getElementById('price').value,
    };

    try {
        const result = await window.electronAPI.saveProduct(data);
        console.log('Empresa salvo com sucesso:', result);
        alert('Empresa salvo com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar empresa:', error);
        alert('Erro ao salvar empresa!');
    }
});