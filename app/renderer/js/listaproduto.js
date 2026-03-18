const table = new DataTable('#tabela', {
    responsive: true,
    processing: true,
    serverSide: true,
    ajax: async (data, callback) => {
        const filter = {
            term: data?.search?.value,        //termo da opesquisa
            limit: data?.length,            //Limite de registro a ser selcionado do dba
            offset: data?.start,              //A pesquisa inicia no registro Ex: 5, 10
            orderType: data?.order[0]?.dir,         //Tipo de ordenação
            column: data?.order[0]?.column    //Coluna a ser filtrada
        }
        const response = await window.electronAPI.searchProducts(filter);
        callback({
            draw: response?.draw ?? data?.draw ?? 0,
            recordTotal: response?.recordTotal ?? 0,
            recordFiltred: response?.recordFiltred ?? 0,
            data: response?.data ?? []
        });
    },
    column: [
        { data: 'id', title: 'Código' },
        { data: 'name', title: 'Nome' },
        { data: 'price', title: 'Preço de venda' },
    ]
});