import Connection from '../connection.js';

export default async function up() {
  const client = await Connection.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS usuario (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        cpf TEXT NOT NULL,
        telefone TEXT NOT NULL
      );
    `);
    console.log('✅ Migration 003_create_usuario executada.');
  } finally {
    client.release();
  }
}
