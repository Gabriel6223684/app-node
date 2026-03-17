const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
    };

    try {
        const result = await window.electronAPI.saveCustomer(data);
        console.log('Customer salvo com sucesso:', result);
        alert('Customer salvo com sucesso!');
        window.electronAPI.openPage('listacustomer.html');
    } catch (error) {
        console.error('Erro ao salvar customer:', error);
        alert('Erro ao salvar customer!');
    }
});
