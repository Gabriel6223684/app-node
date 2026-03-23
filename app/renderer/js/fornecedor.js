const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        cpf_cnpj: document.getElementById('cpf_cnpj').value,
        telefone: document.getElementById('telefone').value
    };

    try {
        const result = await window.electronAPI.saveFornecedor(data);
        Swal.fire({
            title: "Fornecedor salvo com sucesso!",
            icon: "success"
        });
        console.log('Fornecedor salvo com sucesso:', result);
    } catch (error) {
        Swal.fire({
            title: "Erro ao salvar fornecedor:",
            text: error.message,
            icon: "error"
        });
        console.error('Erro ao salvar fornecedor:', error);
    }
});
