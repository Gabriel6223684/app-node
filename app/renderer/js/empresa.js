const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        nome: document.getElementById('nome').value,
        cnpj: document.getElementById('cnpj').value,
    };

    try {
        const result = await window.electronAPI.saveEmpresa(data);
        console.log('Empresa salva com sucesso:', result);
        alert('Empresa salva com sucesso!');
        window.electronAPI.openPage('listaempresa.html');
    } catch (error) {
        console.error('Erro ao salvar empresa:', error);
        alert('Erro ao salvar empresa!');
    }
});
