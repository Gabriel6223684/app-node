import { drizzle } from 'drizzle-orm/node-postgres';
import { Connection } from '../Connection.js';
import { products } from '../schema.js';
import { ilike, or, sql, asc, count } from 'drizzle-orm';

export default class ProductRepository {
  static async insert(data) {
    try {
      const client = await Connection.connect();
      const result = await client.query(
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
        [data.name, parseFloat(data.price)]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async search({ draw, start = 0, length = 10, search = '' }) {
    const client = await Connection.connect();
    try {
      const term = `%${search}%`;
      const totalResult = await client.query('SELECT count(*)::int AS total FROM products');
      const recordsTotal = parseInt(totalResult.rows[0].total);

      const filteredResult = await client.query(
        'SELECT count(*)::int AS filtered FROM products WHERE name ILIKE $1',
        [term]
      );
      const recordsFiltered = parseInt(filteredResult.rows[0].filtered);

      const dataResult = await client.query(
        'SELECT * FROM products WHERE name ILIKE $1 ORDER BY name LIMIT $2 OFFSET $3',
        [term, length, start]
      );

      return {
        draw,
        recordsTotal,
        recordsFiltered,
        data: dataResult.rows,
      };
    } finally {
      client.release();
    }
  }
}
