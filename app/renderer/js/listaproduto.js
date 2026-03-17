document.addEventListener("DOMContentLoaded", () => {
    new DataTable('#tabela', {
        serverSide: true,
        responsive: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/2.3.7/i18n/pt-BR.json'
        },
        ajax: (data, callback, settings) => {
            window.electronAPI.searchProducts(data).then(res => callback(res)).catch(err => console.error(err));
        },
        columns: [
            { data: 'id', title: 'Código' },
            { data: 'name', title: 'Nome' },
            { data: 'price', title: 'Valor', render: (data) => parseFloat(data).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }
        ]
    });
});
