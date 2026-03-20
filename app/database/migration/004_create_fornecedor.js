import Connection from '../connection.js';

export default async function up() {
  const client = await Connection.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS fornecedor (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        cpf_cnpj TEXT NOT NULL,
        telefone TEXT NOT NULL
      );
    `);
    console.log('✅ Migration 004_create_fornecedor executada.');
  } finally {
    client.release();
  }
}
