const { pool } = require('../config/db');

async function obtenerTareas() {
    const resultado = await pool.query('SELECT * FROM tareas ORDER BY created_at DESC');
    return resultado.rows;
}

async function obtenerTareaPorId(id) {
    const resultado = await pool.query('SELECT * FROM tareas WHERE id = $1', [id]);
    return resultado.rows[0];
}

async function crearTarea({user_id, title, description, category, limit_date}) {
    const resultado = await pool.query('INSERT INTO tareas (user_id, title, description, category, limit_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [user_id, title, description, category, limit_date]
    );

    return resultado.rows[0];
}

module.exports = { obtenerTareas, obtenerTareaPorId, crearTarea };