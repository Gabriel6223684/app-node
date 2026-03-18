import Connection from '../Connection.js';

export default async function up() {
  const client = await Connection.connect();
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        cpf text,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      );
    `;
    await client.query(sql);
    console.log('✅ Table users created successfully!');
  } finally {
    client.release();
  }
}
