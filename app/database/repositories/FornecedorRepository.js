import Connection from '../Connection.js';

export default class FornecedorRepository {
  static async insert(data) {
    const client = await Connection.connect();
    try {
      const result = await client.query(
        'INSERT INTO fornecedor (nome, cnpj) VALUES ($1, $2) RETURNING *',
        [data.nome, data.cnpj]
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
      const totalResult = await client.query('SELECT count(*)::int AS total FROM fornecedor');
      const recordsTotal = parseInt(totalResult.rows[0].total);

      const filteredResult = await client.query(
        'SELECT count(*)::int AS filtered FROM fornecedor WHERE nome ILIKE $1 OR cnpj ILIKE $1',
        [term]
      );
      const recordsFiltered = parseInt(filteredResult.rows[0].filtered);

      const dataResult = await client.query(
        'SELECT * FROM fornecedor WHERE nome ILIKE $1 OR cnpj ILIKE $1 ORDER BY nome LIMIT $2 OFFSET $3',
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
