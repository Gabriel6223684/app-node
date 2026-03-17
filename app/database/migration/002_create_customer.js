import { drizzle } from 'drizzle-orm/node-postgres';
import Connection from '../Connection.js';
import { customer } from '../schema.js';

export default async function createCustomerTable() {
  const client = await Connection.connect();
  const db = drizzle(client);
  try {
    await db.run(sql`
      CREATE TABLE IF NOT EXISTS customer (
        id SERIAL PRIMARY KEY,
        nome TEXT(150) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      );
    `);
    console.log('Tabela customer criada.');
  } finally {
    client.release();
  }
}
