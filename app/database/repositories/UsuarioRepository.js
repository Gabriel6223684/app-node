import Connection from '../Connection.js';

export default class UsuarioRepository {
  static async insert(data) {
    const client = await Connection.connect();
    try {
      const result = await client.query(
        'INSERT INTO usuario (name, cpf, telefone) VALUES ($1, $2, $3) RETURNING *',
        [data.name, data.cpf, data.telefone]
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
      
      const totalResult = await client.query('SELECT count(*)::int AS total FROM usuario');
      const recordsTotal = parseInt(totalResult.rows[0].total);

      const filteredResult = await client.query(
        'SELECT count(*)::int AS filtered FROM usuario WHERE name ILIKE $1 OR cpf ILIKE $1 OR telefone ILIKE $1',
        [searchTerm]
      );
      const recordsFiltered = parseInt(filteredResult.rows[0].filtered);

      const dataResult = await client.query(
        'SELECT * FROM usuario WHERE name ILIKE $1 OR cpf ILIKE $1 OR telefone ILIKE $1 ORDER BY name LIMIT $2 OFFSET $3',
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
