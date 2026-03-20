# Plano de Correção: Fazer Cadastros e Listas Funcionarem (Todos)

Status: ✅ **Aprovado pelo usuário** - Proceder com implementação passo a passo.

## Passos do Plano:

### 1. **Limpar e Corrigir Migrations do Banco** ✅ Concluído
- ✅ Criadas e corrigidas todas migrations (Drizzle sql + client.query)
- ✅ run.js com env import ✅

### 2. **Corrigir Repositórios** [Pendente] 
- `ClienteRepository.js` (tabela cliente, colunas corretas, SQL fixo)
- `FornecedorRepository.js` 
- `ProductRepository.js`
- `UsuarioRepository.js`

### 3. **Implementar IPC Handlers no Main Process** [Pendente]
- Criar handlers para save/search de todos os módulos
- Registrar no main process

### 4. **Testar Infra** [Pendente]
```
docker-compose up -d
node app/database/migration/run.js
npm start
```
- Testar cadastro/lista cliente → fornecedor → produto → usuario

### 5. **Finalizar e Validar** [Pendente]
- Verificar sem erros no console
- Dados persistem no banco
- DataTables carregam corretamente

**Próximo passo atual: Configurar variáveis de ambiente DB (env.js/docker-compose) → Fixar repositories → Testar app.**

