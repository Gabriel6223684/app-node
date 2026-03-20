import Connection from '../connection.js';

export default async function up() {
  const client = await Connection.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS cliente (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        cpf TEXT NOT NULL,
        telefone TEXT NOT NULL
      );
    `);
    console.log('✅ Migration 002_create_cliente executada.');
  } finally {
    client.release();
  }
}
