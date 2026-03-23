const table = new DataTable('#tabela', {
    responsive: true,
    processing: true,
    serverSide: true,
    ajax: async (data, callback) => {
        const filter = {
            term: data?.search?.value,
            limit: data?.length,
            offset: data?.start,
            orderType: data?.order[0]?.dir,
            column: data?.order[0]?.column
        }
        try {
            const response = await window.electronAPI.searchCliente(filter);
            callback({
                draw: response?.draw ?? data?.draw ?? 0,
                recordsTotal: response?.recordsTotal ?? 0,
                recordsFiltered: response?.recordsFiltered ?? 0,
                data: response?.data ?? []
            });
        } catch (error) {
            console.error(`Erro: ${error.message}`);
            callback({
                draw: 0,
                recordsTotal: 0,
                recordsFiltered: 0,
                data: []
            });
        }
    },
    columns: [
        { data: 'id', title: 'Código' },
        { data: 'name', title: 'Nome' },
        { data: 'cpf', title: 'CPF' },
        { data: 'telefone', title: 'Telefone' }
    ]
});
