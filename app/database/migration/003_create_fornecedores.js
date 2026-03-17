import Connection from '../Connection.js';

export default async function up() {
  const client = await Connection.connect();
  try {
    const sql = 'CREATE TABLE IF NOT EXISTS fornecedor (id SERIAL PRIMARY KEY, nome VARCHAR(150) NOT NULL, cnpj VARCHAR(18) NOT NULL, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL);';
    await client.query(sql);
    console.log('✅ Table fornecedor created successfully!');
  } finally {
    client.release();
  }
}
