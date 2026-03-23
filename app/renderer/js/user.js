const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
    };

    try {
        const result = await window.electronAPI.saveUsuario(data);
        Swal.fire({
            title: "Usuário salvo com sucesso!",
            icon: "success"
        });
        console.log('Usuário salvo com sucesso:', result);
    } catch (error) {
        Swal.fire({
            title: "Erro ao salvar usuário:",
            text: error.message,
            icon: "error"
        });
        console.error('Erro ao salvar usuário:', error);
    }
});
