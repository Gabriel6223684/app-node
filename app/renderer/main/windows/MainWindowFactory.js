// Importa BrowserWindow (cria janelas), Menu (controla menus) e ipcMain (escuta eventos do renderer) 
// do Electron
import { BrowserWindow, Menu, ipcMain } from 'electron';
// Importa o módulo
import path from 'node:path';
// Importa a função que converte uma URL de módulo ESM para caminho de arquivo físico
import { fileURLToPath } from 'node:url';
// Converte a URL do arquivo atual (import.meta.url) para um caminho absoluto no sistema de arquivos
const __filename = fileURLToPath(import.meta.url);
// Extrai o diretório onde este arquivo está localizado a partir do caminho absoluto
const __dirname = path.dirname(__filename);
// Define o diretório base onde todas as páginas HTML da aplicação estão localizadas (app/renderer/main)
const PAGES_DIR = path.resolve(__dirname, '..'); // app/renderer/main
//Importa o repositório de produtos para permitir a inserção de dados de produtos a partir do renderer via IPC
import ProductRepository from '../../../database/repositories/ProductRepository.js';
import CustomerRepository from '../../../database/repositories/CustomerRepository.js';
import FornecedorRepository from '../../../database/repositories/FornecedorRepository.js';
import UserRepository from '../../../database/repositories/UserRepository.js';
// Exporta a classe como padrão do módulo, tornando-a disponível para importação em outros arquivos
export default class MainWindowFactory {
    // Método estático — pode ser chamado direto na classe sem precisar instanciá-la: MainWindowFactory.createWindow()
    static createWindow() {
        // Remove completamente o menu nativo da aplicação (barra File, Edit, View, etc.)
        Menu.setApplicationMenu(null);
        // Cria a janela principal da aplicação com as configurações definidas no objeto abaixo
        const mainWindow = new BrowserWindow({
            // Define a largura da janela: usa a variável de ambiente APP_WIDTH ou 1280px como padrão
            width: Number(process.env.APP_WIDTH) || 1280,
            // Define a altura da janela: usa a variável de ambiente APP_HEIGHT ou 720px como padrão
            height: Number(process.env.APP_HEIGHT) || 720,
            // Configurações de segurança e comportamento do processo de renderização (renderer)
            webPreferences: {
                // Caminho absoluto do script preload que é executado antes do renderer ter acesso ao DOM
                preload: path.resolve(__dirname, '..', '..', '..', 'preload', 'preload.js'),
                // Isola o contexto do renderer do contexto do preload, impedindo acesso direto ao Node.js pelo renderer
                contextIsolation: true,
                // Desativa a integração do Node.js no renderer, bloqueando acesso a APIs nativas por segurança
                nodeIntegration: false,
            }
        });

        // Registra um handler IPC que escuta o evento 'window:open-page' disparado pelo renderer via ipcRenderer.invoke
        ipcMain.handle('window:open-page', async (_event, pageName) => {
            // Carrega o arquivo HTML correspondente ao nome da página recebida, dentro do diretório PAGES_DIR
            await mainWindow.loadFile(path.join(PAGES_DIR, pageName));
            return true; // Retorna true para indicar que a página foi carregada com sucesso
        });
        // Registra um handler IPC que escuta o evento 'window:save-product' 
        // disparado pelo renderer para salvar dados de produto
        ipcMain.handle('product:save', async (_event, productData) => {
            return await ProductRepository.insert(productData);
        });

        ipcMain.handle('product:search', async (_event, productData) => {
            return await ProductRepository.search(productData);
        });

        ipcMain.handle('user:save', async (_event, userData) => {
            return await UserRepository.insert(userData);
        });

        ipcMain.handle('user:search', async (_event, searchData) => {
            return await UserRepository.search(searchData);
        });


        ipcMain.handle('customer:save', async (_event, customerData) => {
            return await CustomerRepository.insert(customerData);
        });

        ipcMain.handle('customer:search', async (_event, customerData) => {
            return await CustomerRepository.search(customerData);
        });

        ipcMain.handle('fornecedor:save', async (_event, fornecedorData) => {
            return await FornecedorRepository.insert(fornecedorData);
        });

        ipcMain.handle('fornecedor:search', async (_event, fornecedorData) => { return await FornecedorRepository.search(fornecedorData); }); ipcMain.handle('empresa:save', async (_event, empresaData) => { return await EmpresaRepository.insert(empresaData); }); ipcMain.handle('empresa:search', async (_event, searchData) => { return await EmpresaRepository.search(searchData); });        // Carrega o arquivo index.html
        mainWindow.loadFile(path.join(PAGES_DIR, 'index.html'));
        // Retorna a instância da janela criada para que possa ser referenciada em outros lugares da aplicação
        return mainWindow;
    }
}