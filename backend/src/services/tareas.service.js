const { pool } = require('../config/db');

async function obtenerTareas() {
    const resultado = await pool.query('SELECT * FROM tareas ORDER BY created_at DESC');
    return resultado.rows;
}

async function obtenerTareaPorId(id) {
    const resultado = await pool.query('SELECT * FROM tareas WHERE id = $1', [id]);
    return resultado.rows[0];
}

module.exports = { obtenerTareas, obtenerTareaPorId };