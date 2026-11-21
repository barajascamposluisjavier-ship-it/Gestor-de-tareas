const express = require('express');
const app = express();
const { pool } = require('./src/config/db');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola el servidor funciona');
});

app.get('/db-test', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT NOW() as now');
        res.json({
            success: true,
            fecha: resultado.rows[0].now
        });
    } catch (error) {
        console.error('Error al conectar con postgreSQL', error);

        res.status(500).json({
            success: false,
            mensaje: 'No se pudo obtener los datos pedidos'
        });
    }

})

app.post('/tareas', async (req, res) => {
    const { user_id, title, description, category, limit_date } = req.body;

    if (!user_id || !title) {
        return res.status(400).json({
            success: false,
            mensaje: 'Faltan datos obligatorios user_id y title'
        });
    }

    try {
        const resultado = await pool.query('INSERT INTO tareas(user_id,title, description, category, limit_date) VALUES($1, $2, $3, $4, $5) RETURNING *', [user_id, title, description, category, limit_date]);

        res.status(201).json({
            success: true,
            mensaje: 'Se guardo la tarea correctamente',
            tarea: resultado.rows[0]
        });
    } catch (error) {
        console.error('Error al crear la tarea', error);
        res.status(500).json({
            success: false,
            mensaje: 'no se pudo crear la tarea'
        });
    }

});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});