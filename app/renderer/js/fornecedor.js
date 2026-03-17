const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        nome: document.getElementById('nome').value,
        cnpj: document.getElementById('cnpj').value,
    };

    try {
        const result = await window.electronAPI.saveFornecedor(data);
        console.log('Fornecedor salvo com sucesso:', result);
        alert('Fornecedor salvo com sucesso!');
        window.electronAPI.openPage('listafornecedor.html');
    } catch (error) {
        console.error('Erro ao salvar fornecedor:', error);
        alert('Erro ao salvar fornecedor!');
    }
});
