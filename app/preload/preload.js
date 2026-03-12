const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    abrirJanela: (pagina) => ipcRenderer.send('abrir-janela', pagina),
    
    // Nova função para fechar janela atual e ir para início
    irParaInicio: () => ipcRenderer.send('fechar-janela-e-ir-inicio'),

    // Nova função para salvar no banco
    enviarDados: (sql, params) => ipcRenderer.invoke('get-database-data', sql, params)
});

async function carregarUsuarios() {
    try {
        // Chamando a ponte que criamos no preload
        const rows = await window.databaseAPI.fetchData('SELECT * FROM usuarios LIMIT 10');

        console.log("Dados do pgAdmin:", rows);

        // Exemplo: Renderizar na tela
        const lista = document.getElementById('lista-usuarios');
        rows.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.nome} - ${user.email}`;
            lista.appendChild(li);
        });
    } catch (err) {
        console.error("Erro ao buscar dados:", err);
    }
}

// Executa ao carregar a página
carregarUsuarios();

// database/connection.js
const { Pool } = require('pg');

module.exports = {
    // O uso de params [] ajuda a prevenir SQL Injection
    query: (text, params) => pool.query(text, params).then(res => res.rows)
};