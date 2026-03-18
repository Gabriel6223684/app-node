import Connection from '../Connection.js';

export default async function up() {
  const client = await Connection.connect();
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS customer (
        id BIGSERIAL PRIMARY KEY,
        nome TEXT(150) NOT NULL,
        cpf text,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      );
    `;
    await client.query(sql);
    console.log('✅ Table customer created successfully!');
  } finally {
    client.release();
  }
}
