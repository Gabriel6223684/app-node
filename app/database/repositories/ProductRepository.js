import Connection from '../Connection.js';

export default class ProductRepository {
  static async insert(data) {
    const client = await Connection.connect();
    try {
      const result = await client.query(
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
        [data.name, data.price]
      );
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async search({ draw, start = 0, length = 10, term = '' }) {
    const client = await Connection.connect();
    try {
      const searchTerm = `%${term}%`;
      
      const totalResult = await client.query('SELECT count(*)::int AS total FROM products');
      const recordsTotal = parseInt(totalResult.rows[0].total);

      const filteredResult = await client.query(
        'SELECT count(*)::int AS filtered FROM products WHERE name ILIKE $1 OR price::text ILIKE $1 OR id::text ILIKE $1',
        [searchTerm]
      );
      const recordsFiltered = parseInt(filteredResult.rows[0].filtered);

      const dataResult = await client.query(
        'SELECT * FROM products WHERE name ILIKE $1 OR price::text ILIKE $1 OR id::text ILIKE $1 ORDER BY name LIMIT $2 OFFSET $3',
        [searchTerm, length, start]
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
