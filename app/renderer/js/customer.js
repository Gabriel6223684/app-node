const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value
    };

    try {
        const result = await window.electronAPI.saveCliente(data);
        Swal.fire({
            title: "Cliente salvo com sucesso!",
            icon: "success"
        });
        console.log('Cliente salvo com sucesso:', result);
    } catch (error) {
        Swal.fire({
            title: "Erro ao salvar cliente:",
            text: error.message,
            icon: "error"
        });
        console.error('Erro ao salvar cliente:', error);
    }
});
