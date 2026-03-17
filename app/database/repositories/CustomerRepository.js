import Connection from '../Connection.js';

export default class CustomerRepository {
  static async insert(data) {
    const client = await Connection.connect();
    try {
      const result = await client.query(
        'INSERT INTO customer (nome, email) VALUES ($1, $2) RETURNING *',
        [data.nome, data.email]
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
      const totalResult = await client.query('SELECT count(*)::int AS total FROM customer');
      const recordsTotal = parseInt(totalResult.rows[0].total);

      const filteredResult = await client.query(
        'SELECT count(*)::int AS filtered FROM customer WHERE nome ILIKE $1 OR email ILIKE $1',
        [term]
      );
      const recordsFiltered = parseInt(filteredResult.rows[0].filtered);

      const dataResult = await client.query(
        'SELECT * FROM customer WHERE nome ILIKE $1 OR email ILIKE $1 ORDER BY nome LIMIT $2 OFFSET $3',
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
