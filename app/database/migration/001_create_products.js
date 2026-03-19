import Connection from '../connection.js';

export default async function up() {
  const client = await Connection.connect();
  try {
    const sql = 'CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, nome VARCHAR(255) NOT NULL, price NUMERIC(18,4) NOT NULL DEFAULT 0.0000);';
    await client.query(sql);
    console.log('✅ Migration 001_create_products executada.');
  } finally {
    client.release();
  }
}
