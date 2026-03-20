import Connection from '../connection.js';
import { pgTable, serial, varchar, numeric } from 'drizzle-orm/pg-core';

export default async function up() {
  const client = await Connection.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price NUMERIC(18,4) NOT NULL DEFAULT 0.0000
      );
    `);
    console.log('✅ Migration 001_create_products executada.');
  } finally {
    client.release();
  }
}
