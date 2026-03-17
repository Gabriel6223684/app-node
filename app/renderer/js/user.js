const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        cpf: document.getElementById('cpf').value,
    };

    try {
        const result = await window.electronAPI.saveUser(data);
        console.log('User salvo com sucesso:', result);
        alert('User salvo com sucesso!');
        window.electronAPI.openPage('listauser.html');
    } catch (error) {
        console.error('Erro ao salvar user:', error);
        alert('Erro ao salvar user!');
    }
});
