import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrations = [
  './001_create_produtos.js',
  './users.js',
  './customer.js',
  './002_create_fornecedores.js'
];

async function runMigrations() {
  for (const migrationPath of migrations) {
    try {
  const migrationModule = await import(`./${path.basename(migrationPath)}`);
      const migration = migrationModule.default;
      await migration();
      console.log(`Migration ${migrationPath} executada com sucesso.`);
    } catch (error) {
      console.error(`Erro na migration ${migrationPath}:`, error);
    }
  }
}

runMigrations().then(() => {
  console.log('Todas migrations executadas!');
}).catch(console.error);
