const { pool } = require('../config/db');

async function obtenerTareas() {
    const resultado = await pool.query('SELECT * FROM tareas ORDER BY created_at DESC');
    return resultado.rows;
}

module.exports = { obtenerTareas };