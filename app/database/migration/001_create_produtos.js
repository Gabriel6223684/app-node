import Connection from '../Connection.js';

export default async function up() {
  const client = await Connection.connect();
  try {
    const sql = 'CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, price DECIMAL(10,2) NOT NULL DEFAULT 0.00);';
    await client.query(sql);
    console.log('✅ Migration 001_create_produtos executada.');
  } finally {
    client.release();
  }
}
